import { Injectable } from '@nestjs/common';
import { CreateProjectDto, ProjectStatus } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectNotFoundException } from '../common/exceptions/app.exception';

@Injectable()
export class ProjectsService {
  private projects: ProjectResponseDto[] = [
    {
      id: 'proj-1',
      name: 'Skyline Commercial Park',
      description: 'Phase 1 corporate office space',
      status: ProjectStatus.ACTIVE,
      towerCount: 3,
      createdAt: '2026-10-01T09:00:00.000Z',
      updatedAt: '2026-10-01T09:00:00.000Z'
    },
    {
      id: 'proj-2',
      name: 'Greenfield Residency',
      description: 'High-rise residential community',
      status: ProjectStatus.PLANNING,
      towerCount: 4,
      createdAt: '2026-10-02T10:00:00.000Z',
      updatedAt: '2026-10-02T10:00:00.000Z'
    }
  ];

  findAll(): ProjectResponseDto[] {
    return this.projects;
  }

  findById(id: string): ProjectResponseDto {
    const item=this.projects.find(p=>p.id===id);
    if (!item) {
      throw new ProjectNotFoundException(id);
    }
    return item;
  }

  create(dto: CreateProjectDto): ProjectResponseDto {
    const now=new Date().toISOString();
    const newProject: ProjectResponseDto = {
      id: `proj-${Date.now()}`,
      name: dto.name,
      description: dto.description || '',
      status: dto.status,
      towerCount: dto.towerCount,
      createdAt: now,
      updatedAt: now
    };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: string, dto: UpdateProjectDto): ProjectResponseDto {
    const project=this.findById(id);
    if (dto.name!==undefined) project.name=dto.name;
    if (dto.description!==undefined) project.description=dto.description;
    if (dto.status!==undefined) project.status=dto.status;
    if (dto.towerCount!==undefined) project.towerCount=dto.towerCount;
    project.updatedAt=new Date().toISOString();
    return project;
  }

  delete(id: string): { message: string; deletedId: string } {
    const index=this.projects.findIndex(p=>p.id===id);
    if (index===-1) {
      throw new ProjectNotFoundException(id);
    }
    const removed=this.projects.splice(index, 1)[0];
    return { message: 'Project deleted successfully', deletedId: removed.id };
  }
}
