import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressUpdateEntity } from './entities/progress-update.entity';
import { ProjectEntity } from '../projects/entities/project.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(ProgressUpdateEntity)
    private readonly updateRepo: Repository<ProgressUpdateEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  async findByProject(projectId: string): Promise<ProgressUpdateEntity[]> {
    return await this.updateRepo.find({
      where: { projectId },
      order: { createdAt: 'DESC' },
      relations: ['engineer'],
    });
  }

  async recordUpdate(
    projectId: string,
    progress: number,
    note?: string,
    engineerId?: string,
  ): Promise<ProgressUpdateEntity> {
    const project = await this.projectRepo.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException(`Project ${projectId} not found`);
    }

    project.progress = progress;
    await this.projectRepo.save(project);

    const update = this.updateRepo.create({
      projectId,
      progress,
      note: note || '',
      engineerId: engineerId || null,
    });

    return await this.updateRepo.save(update);
  }
}
