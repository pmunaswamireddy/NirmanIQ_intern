import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectStatus } from '../dto/project-status.enum';
import { TowerEntity } from '../../towers/entities/tower.entity';
import { ProgressUpdateEntity } from '../../progress/entities/progress-update.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150, default: 'Hyderabad' })
  location: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ type: 'varchar', name: 'target_completion', nullable: true })
  targetCompletion: string | null;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus;

  @Column({ type: 'boolean', name: 'is_archived', default: false })
  isArchived: boolean;

  @OneToMany(() => TowerEntity, (tower: any) => tower.project, { cascade: true })
  towers: TowerEntity[];

  @OneToMany(() => ProgressUpdateEntity, (update: any) => update.project, { cascade: true })
  updates: ProgressUpdateEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
