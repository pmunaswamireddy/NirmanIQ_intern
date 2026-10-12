import { Injectable, NotFoundException } from '@nestjs/common';

export interface Project {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  towerCount: number;
  description: string;
}

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: 'proj-1',
      name: 'Skyline Residency',
      status: 'active',
      towerCount: 3,
      description: 'High-rise residential community with 3 towers.'
    },
    {
      id: 'proj-2',
      name: 'Metro Logistics Park',
      status: 'active',
      towerCount: 2,
      description: 'Warehouse automated sorting and fulfillment center.'
    },
    {
      id: 'proj-3',
      name: 'Green Valley Villas',
      status: 'completed',
      towerCount: 1,
      description: 'Gated villa community with solar amenities.'
    }
  ];

  findAll(): Project[] {
    return this.projects;
  }

  findOne(id: string): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found.`);
    }
    return project;
  }

  create(data: Omit<Project, 'id'>): Project {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ...data
    };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: string, data: Partial<Omit<Project, 'id'>>): Project {
    const project = this.findOne(id);
    Object.assign(project, data);
    return project;
  }

  remove(id: string): { message: string } {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Project with ID "${id}" not found.`);
    }
    this.projects.splice(index, 1);
    return { message: `Project ${id} removed successfully.` };
  }
}
