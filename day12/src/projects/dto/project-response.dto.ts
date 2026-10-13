import { ProjectStatus } from './create-project.dto';

export class ProjectResponseDto {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  towerCount: number;
  createdAt: string;
  updatedAt: string;
}
