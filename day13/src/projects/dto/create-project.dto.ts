import { IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProjectStatus } from './project-status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(3, { message: 'Project name must be at least 3 characters' })
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus, {
    message: 'status must be PLANNING, ACTIVE, COMPLETED, or ON_HOLD'
  })
  status?: ProjectStatus;
}
