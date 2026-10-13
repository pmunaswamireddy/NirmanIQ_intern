import { Injectable } from '@nestjs/common';
import { TowerDto } from './dto/tower.dto';
import { ProjectsService } from '../projects/projects.service';

export interface TowerRecord {
  id: string;
  projectId: string;
  name: string;
  floors: { floorNumber: number; status: string }[];
  createdAt: string;
}

@Injectable()
export class TowersService {
  constructor(private readonly projectsService: ProjectsService) {}

  private towers: TowerRecord[] = [
    {
      id: 'tower-101',
      projectId: 'proj-1',
      name: 'Tower Alpha',
      floors: [
        { floorNumber: 1, status: 'COMPLETED' },
        { floorNumber: 2, status: 'IN_PROGRESS' },
        { floorNumber: 3, status: 'NOT_STARTED' }
      ],
      createdAt: '2026-10-01T10:00:00.000Z'
    }
  ];

  findByProject(projectId: string): TowerRecord[] {
    this.projectsService.findById(projectId);
    return this.towers.filter(t=>t.projectId===projectId);
  }

  create(projectId: string, dto: TowerDto): TowerRecord {
    this.projectsService.findById(projectId);
    const newTower: TowerRecord = {
      id: `tower-${Date.now()}`,
      projectId,
      name: dto.name,
      floors: dto.floors,
      createdAt: new Date().toISOString()
    };
    this.towers.push(newTower);
    return newTower;
  }
}
