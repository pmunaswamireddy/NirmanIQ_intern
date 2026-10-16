import { IsString, IsNotEmpty, Length, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { ProjectStatus } from './project-status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Project name is required' })
  @Length(3, 100, { message: 'Project name must be between 3 and 100 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus, { message: 'Status must be a valid ProjectStatus' })
  status?: ProjectStatus;
}
