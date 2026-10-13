import { IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD'
}

export class CreateProjectDto {
  @IsString({ message: 'Project name must be a string' })
  @IsNotEmpty({ message: 'Project name is required' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(3, { message: 'Project name must be at least 3 characters' })
  @MaxLength(100, { message: 'Project name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsEnum(ProjectStatus, {
    message: 'status must be one of: PLANNING, ACTIVE, COMPLETED, ON_HOLD'
  })
  status: ProjectStatus;

  @IsInt({ message: 'Tower count must be an integer' })
  @Min(1, { message: 'Tower count must be at least 1' })
  @Max(50, { message: 'Tower count cannot exceed 50' })
  towerCount: number;
}
