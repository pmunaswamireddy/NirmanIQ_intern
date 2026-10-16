import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
    default: 0.0,
  })
  completionPercentage: number;

  @Column({ type: 'varchar', length: 20, default: 'NOT_STARTED' })
  status: string;

  @Column({ type: 'uuid', name: 'tower_id' })
  towerId: string;

  @ManyToOne(() => TowerEntity, (tower: any) => tower.floors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tower_id' })
  tower: TowerEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
