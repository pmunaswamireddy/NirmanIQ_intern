import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TowerEntity } from './entities/tower.entity';
import { FloorEntity } from './entities/floor.entity';

@Injectable()
export class TowersService {
  constructor(
    @InjectRepository(TowerEntity)
    private readonly towerRepository: Repository<TowerEntity>,
    @InjectRepository(FloorEntity)
    private readonly floorRepository: Repository<FloorEntity>,
  ) {}

  async findByProjectId(projectId: string): Promise<TowerEntity[]> {
    return await this.towerRepository.find({
      where: { projectId },
      relations: ['floors'],
      order: { createdAt: 'ASC' },
    });
  }

  async create(projectId: string, data: { name: string; riskLevel?: number; floors?: { floorNumber: number; completionPercentage?: number }[] }): Promise<TowerEntity> {
    const tower = this.towerRepository.create({
      name: data.name,
      riskLevel: data.riskLevel ?? 0,
      projectId,
    });
    const savedTower = await this.towerRepository.save(tower);

    if (data.floors && data.floors.length > 0) {
      const floorEntities = data.floors.map((f) =>
        this.floorRepository.create({
          floorNumber: f.floorNumber,
          completionPercentage: f.completionPercentage ?? 0,
          towerId: savedTower.id,
        })
      );
      await this.floorRepository.save(floorEntities);
    }

    const result = await this.towerRepository.findOne({
      where: { id: savedTower.id },
      relations: ['floors'],
    });

    if (!result) {
      throw new NotFoundException(`Tower ${savedTower.id} not found`);
    }

    return result;
  }
}
