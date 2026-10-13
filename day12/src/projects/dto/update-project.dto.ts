import { IsString, MinLength, MaxLength, IsEnum, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProjectStatus } from './create-project.dto';

export class UpdateProjectDto {
  @IsOptional()
  @IsString({ message: 'Project name must be a string' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(3, { message: 'Project name must be at least 3 characters' })
  @MaxLength(100, { message: 'Project name must not exceed 100 characters' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus, {
    message: 'status must be one of: PLANNING, ACTIVE, COMPLETED, ON_HOLD'
  })
  status?: ProjectStatus;

  @IsOptional()
  @IsInt({ message: 'Tower count must be an integer' })
  @Min(1, { message: 'Tower count must be at least 1' })
  @Max(50, { message: 'Tower count cannot exceed 50' })
  towerCount?: number;
}
