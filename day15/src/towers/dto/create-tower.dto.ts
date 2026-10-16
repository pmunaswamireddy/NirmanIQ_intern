import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateTowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3)
  riskLevel?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  floorCount?: number;
}
