import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FloorEntity } from '../towers/entities/floor.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { ProjectEntity } from '../projects/entities/project.entity';
import { ProgressUpdateEntity } from '../progress/entities/progress-update.entity';
import { ProjectStatus } from '../projects/dto/project-status.enum';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(FloorEntity)
    private readonly floorRepository: Repository<FloorEntity>,
    @InjectRepository(TowerEntity)
    private readonly towerRepository: Repository<TowerEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProgressUpdateEntity)
    private readonly updateRepository: Repository<ProgressUpdateEntity>,
  ) {}

  async findById(id: string): Promise<FloorEntity> {
    const floor = await this.floorRepository.findOne({
      where: { id },
      relations: ['tower'],
    });
    if (!floor) {
      throw new NotFoundException(`Floor ${id} not found`);
    }
    return floor;
  }

  async updateProgress(id: string, completionPercentage: number, engineerId?: string, note?: string): Promise<FloorEntity> {
    const floor = await this.findById(id);

    const clampedPercentage = Math.round(Math.min(100, Math.max(0, completionPercentage)) * 100) / 100;
    floor.completionPercentage = clampedPercentage;

    if (clampedPercentage >= 100) {
      floor.status = 'COMPLETED';
    } else if (clampedPercentage > 0) {
      floor.status = 'IN_PROGRESS';
    } else {
      floor.status = 'NOT_STARTED';
    }

    floor.updatedAt = new Date();
    const savedFloor = await this.floorRepository.save(floor);

    // 1. Recalibrate tower risk level based on average floor completion in this tower
    const towerFloors = await this.floorRepository.find({
      where: { towerId: floor.towerId },
    });

    if (towerFloors.length > 0) {
      const avgCompletion =
        towerFloors.reduce((acc, f) => acc + Number(f.completionPercentage || 0), 0) /
        towerFloors.length;

      let newRisk = 0; // on track
      if (avgCompletion < 25) {
        newRisk = 2; // high-risk
      } else if (avgCompletion < 60) {
        newRisk = 1; // at-risk
      }

      await this.towerRepository.update(floor.towerId, {
        riskLevel: newRisk,
        updatedAt: new Date(),
      });
    }

    // 2. Recalibrate parent Project progress across all its towers & floors
    const tower = await this.towerRepository.findOne({ where: { id: floor.towerId } });
    if (tower && tower.projectId) {
      const allProjectTowers = await this.towerRepository.find({
        where: { projectId: tower.projectId },
        relations: ['floors'],
      });

      const allFloors = allProjectTowers.flatMap((t) => t.floors || []);
      if (allFloors.length > 0) {
        const totalProgressSum = allFloors.reduce((acc, f) => {
          const val = f.id === floor.id ? clampedPercentage : Number(f.completionPercentage || 0);
          return acc + val;
        }, 0);
        const overallProjectProgress = Math.round(totalProgressSum / allFloors.length);

        const project = await this.projectRepository.findOne({ where: { id: tower.projectId } });
        if (project) {
          project.progress = overallProjectProgress;
          if (overallProjectProgress === 100) {
            project.status = ProjectStatus.COMPLETED;
          } else if (overallProjectProgress > 0) {
            project.status = ProjectStatus.ACTIVE;
          } else {
            project.status = ProjectStatus.PLANNING;
          }
          await this.projectRepository.save(project);

          const logRecord = this.updateRepository.create({
            projectId: project.id,
            engineerId: engineerId || null,
            progress: overallProjectProgress,
            note: note || `Floor ${floor.floorNumber} progress updated to ${clampedPercentage}%`,
          });
          await this.updateRepository.save(logRecord);
        }
      }
    }

    return savedFloor;
  }
}
