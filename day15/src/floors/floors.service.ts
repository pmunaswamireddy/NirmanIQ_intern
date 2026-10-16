import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FloorEntity } from '../towers/entities/floor.entity';
import { TowerEntity } from '../towers/entities/tower.entity';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(FloorEntity)
    private readonly floorRepository: Repository<FloorEntity>,
    @InjectRepository(TowerEntity)
    private readonly towerRepository: Repository<TowerEntity>,
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

  async updateProgress(id: string, completionPercentage: number): Promise<FloorEntity> {
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

    // Recalibrate tower risk level based on average floor completion
    const towerFloors = await this.floorRepository.find({
      where: { towerId: floor.towerId },
    });

    if (towerFloors.length > 0) {
      const avgCompletion =
        towerFloors.reduce((acc, f) => acc + Number(f.completionPercentage), 0) /
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

    return savedFloor;
  }
}
