import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TowerEntity } from './entities/tower.entity';
import { FloorEntity } from './entities/floor.entity';
import { CreateTowerDto } from './dto/create-tower.dto';

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

  async findById(id: string): Promise<TowerEntity> {
    const tower = await this.towerRepository.findOne({
      where: { id },
      relations: ['floors'],
    });

    if (!tower) {
      throw new NotFoundException(`Tower ${id} not found`);
    }

    if (tower.floors) {
      tower.floors.sort((a, b) => a.floorNumber - b.floorNumber);
    }

    return tower;
  }

  async create(projectId: string, dto: CreateTowerDto): Promise<TowerEntity> {
    const tower = this.towerRepository.create({
      name: dto.name,
      riskLevel: dto.riskLevel ?? 0,
      projectId,
    });
    const savedTower = await this.towerRepository.save(tower);

    const floorCount = dto.floorCount ?? 4;
    const floors: FloorEntity[] = [];
    for (let i = 1; i <= floorCount; i++) {
      floors.push(
        this.floorRepository.create({
          floorNumber: i,
          completionPercentage: 0.0,
          status: 'NOT_STARTED',
          towerId: savedTower.id,
        }),
      );
    }
    await this.floorRepository.save(floors);

    return await this.findById(savedTower.id);
  }
}
