import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';

export interface Tower {
  id: string;
  projectId: string;
  name: string;
  floors: number;
}

@Injectable()
export class TowersService {
  constructor(private readonly projectsService: ProjectsService) {}

  private towers: Tower[] = [
    { id: 'tower-1', projectId: 'proj-1', name: 'Tower Alpha', floors: 24 },
    { id: 'tower-2', projectId: 'proj-1', name: 'Tower Beta', floors: 20 },
    { id: 'tower-3', projectId: 'proj-2', name: 'Hub Bay 1', floors: 4 }
  ];

  findByProject(projectId: string): Tower[] {
    // Validate project existence first
    this.projectsService.findOne(projectId);
    return this.towers.filter((t) => t.projectId === projectId);
  }

  createForProject(projectId: string, data: { name: string; floors: number }): Tower {
    this.projectsService.findOne(projectId);
    const newTower: Tower = {
      id: `tower-${Date.now()}`,
      projectId,
      ...data
    };
    this.towers.push(newTower);
    return newTower;
  }
}
