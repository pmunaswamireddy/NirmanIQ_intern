import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { TowerEntity } from './tower.entity';

@Entity('floors')
export class FloorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'floor_number' })
  floorNumber: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'completion_percentage',
    default: 0.0
  })
  completionPercentage: number;

  @Column({ type: 'uuid', name: 'tower_id' })
  towerId: string;

  @ManyToOne(() => TowerEntity, (tower) => tower.floors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tower_id' })
  tower: TowerEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
