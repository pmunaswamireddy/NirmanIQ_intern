import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async create(createDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectRepository.create(createDto);
    return await this.projectRepository.save(project);
  }

  // Never SELECT *
  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find({
      select: ['id', 'name', 'status', 'createdAt'],
      where: { isArchived: false },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['towers', 'towers.floors'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateDto: UpdateProjectDto): Promise<ProjectEntity> {
    const project = await this.findOne(id);
    Object.assign(project, updateDto);
    return await this.projectRepository.save(project);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return { message: `Project ${id} removed successfully` };
  }

  async getProjectAnalytics() {
    return await this.projectRepository
      .createQueryBuilder('p')
      .leftJoin('p.towers', 't')
      .leftJoin('t.floors', 'f')
      .select('p.id', 'projectId')
      .addSelect('p.name', 'projectName')
      .addSelect('p.status', 'status')
      .addSelect('COUNT(DISTINCT t.id)', 'towerCount')
      .addSelect('ROUND(COALESCE(AVG(f.completion_percentage), 0), 2)', 'avgCompletion')
      .addSelect('COALESCE(MAX(t.risk_level), 0)', 'maxRiskLevel')
      .where('p.is_archived = :isArchived', { isArchived: false })
      .groupBy('p.id')
      .addGroupBy('p.name')
      .addGroupBy('p.status')
      .getRawMany();
  }
}
