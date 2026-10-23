import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { ProgressUpdateEntity } from '../progress/entities/progress-update.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './dto/project-status.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProgressUpdateEntity)
    private readonly updateRepository: Repository<ProgressUpdateEntity>,
  ) {}

  async findAll(status?: ProjectStatus, search?: string) {
    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.towers', 'tower')
      .leftJoinAndSelect('tower.floors', 'floor')
      .leftJoinAndSelect('project.updates', 'update')
      .where('project.isArchived = :isArchived', { isArchived: false })
      .orderBy('project.createdAt', 'DESC');

    if (status) {
      query.andWhere('project.status = :status', { status });
    }

    if (search) {
      query.andWhere('LOWER(project.name) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }

    const projects = await query.getMany();

    return projects.map((p) => {
      const towers = p.towers || [];
      const allFloors = towers.flatMap((t) => t.floors || []);
      const totalFloors = allFloors.length;
      const floorAvg =
        totalFloors > 0
          ? Math.round(
              allFloors.reduce((acc, f) => acc + Number(f.completionPercentage || 0), 0) /
                totalFloors,
            )
          : 0;

      const progress = totalFloors > 0 ? floorAvg : (p.progress ?? 0);
      let status = p.status;
      if (totalFloors > 0) {
        if (progress === 100) status = ProjectStatus.COMPLETED;
        else if (progress > 0) status = ProjectStatus.ACTIVE;
        else status = ProjectStatus.PLANNING;
      }

      return {
        id: p.id,
        name: p.name,
        location: p.location || 'Hyderabad',
        targetCompletion: p.targetCompletion,
        progress,
        avgCompletion: progress,
        description: p.description,
        status,
        towerCount: towers.length,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });
  }

  async findById(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['towers', 'towers.floors', 'updates'],
    });

    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    if (project.towers) {
      project.towers.forEach((t) => {
        if (t.floors) {
          t.floors.sort((a, b) => a.floorNumber - b.floorNumber);
        }
      });
    }

    const allFloors = (project.towers || []).flatMap((t) => t.floors || []);
    if (allFloors.length > 0) {
      const avg = Math.round(
        allFloors.reduce((acc, f) => acc + Number(f.completionPercentage || 0), 0) /
          allFloors.length,
      );
      project.progress = avg;
      if (avg === 100) project.status = ProjectStatus.COMPLETED;
      else if (avg > 0) project.status = ProjectStatus.ACTIVE;
      else project.status = ProjectStatus.PLANNING;
    }

    if (project.updates) {
      project.updates.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return project;
  }

  async create(dto: CreateProjectDto, userId?: string): Promise<{ id: string; name: string; progress: number; location: string }> {
    const project = this.projectRepository.create({
      name: dto.name,
      location: dto.location || 'Hyderabad',
      targetCompletion: dto.targetCompletion || null,
      description: dto.description,
      status: dto.status ?? ProjectStatus.PLANNING,
      progress: 0,
      createdBy: userId || null,
    });
    const saved = await this.projectRepository.save(project);
    return {
      id: saved.id,
      name: saved.name,
      location: saved.location,
      progress: saved.progress,
    };
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectEntity> {
    const project = await this.findById(id);

    if (dto.name !== undefined) project.name = dto.name;
    if (dto.description !== undefined) project.description = dto.description;
    if (dto.status !== undefined) project.status = dto.status;
    if (dto.isArchived !== undefined) project.isArchived = dto.isArchived;

    return await this.projectRepository.save(project);
  }

  async updateProgress(id: string, progress: number, note?: string, engineerId?: string) {
    const project = await this.findById(id);
    project.progress = Math.min(100, Math.max(0, Math.round(progress)));

    if (project.progress === 100) {
      project.status = ProjectStatus.COMPLETED;
    } else if (project.progress > 0 && project.status === ProjectStatus.PLANNING) {
      project.status = ProjectStatus.ACTIVE;
    }

    await this.projectRepository.save(project);

    const record = this.updateRepository.create({
      projectId: project.id,
      engineerId: engineerId || null,
      progress: project.progress,
      note: note || '',
    });
    await this.updateRepository.save(record);

    return {
      id: project.id,
      name: project.name,
      progress: project.progress,
      note: record.note,
      updatedAt: record.createdAt,
    };
  }

  async delete(id: string): Promise<{ success: boolean }> {
    const project = await this.findById(id);
    await this.projectRepository.remove(project);
    return { success: true };
  }
}
