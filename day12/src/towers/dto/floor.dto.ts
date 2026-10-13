import { IsInt, Min, IsEnum } from 'class-validator';

export enum FloorStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export class FloorDto {
  @IsInt({ message: 'floorNumber must be an integer' })
  @Min(1, { message: 'floorNumber must be at least 1' })
  floorNumber: number;

  @IsEnum(FloorStatus, {
    message: 'floor status must be NOT_STARTED, IN_PROGRESS, or COMPLETED'
  })
  status: FloorStatus;
}
