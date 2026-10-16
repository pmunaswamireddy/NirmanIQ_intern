import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './dto/project-status.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAll(status?: ProjectStatus, search?: string) {
    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.towers', 'tower')
      .leftJoinAndSelect('tower.floors', 'floor')
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
      const avgCompletion =
        totalFloors > 0
          ? Math.round(
              (allFloors.reduce((acc, f) => acc + Number(f.completionPercentage), 0) /
                totalFloors) *
                100,
            ) / 100
          : 0;

      return {
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status,
        towerCount: towers.length,
        avgCompletion,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });
  }

  async findById(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['towers', 'towers.floors'],
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

    return project;
  }

  async create(dto: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectRepository.create({
      name: dto.name,
      description: dto.description,
      status: dto.status ?? ProjectStatus.PLANNING,
    });
    return await this.projectRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectEntity> {
    const project = await this.findById(id);

    if (dto.name !== undefined) project.name = dto.name;
    if (dto.description !== undefined) project.description = dto.description;
    if (dto.status !== undefined) project.status = dto.status;
    if (dto.isArchived !== undefined) project.isArchived = dto.isArchived;

    return await this.projectRepository.save(project);
  }

  async delete(id: string): Promise<{ success: boolean }> {
    const project = await this.findById(id);
    await this.projectRepository.remove(project);
    return { success: true };
  }
}
