import { IsString, IsOptional, IsEnum, MinLength, MaxLength, IsBoolean } from 'class-validator';
import { ProjectStatus } from './project-status.enum';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
