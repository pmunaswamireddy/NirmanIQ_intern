import { IsString, MinLength, MaxLength, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { FloorDto } from './floor.dto';

export class TowerDto {
  @IsString({ message: 'Tower name must be a string' })
  @MinLength(2, { message: 'Tower name must be at least 2 characters' })
  @MaxLength(50, { message: 'Tower name must not exceed 50 characters' })
  name: string;

  @IsArray({ message: 'Floors must be an array' })
  @ArrayMinSize(1, { message: 'Tower must have at least one floor' })
  @ValidateNested({ each: true })
  @Type(() => FloorDto)
  floors: FloorDto[];
}
