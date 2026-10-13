import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TowersService, TowerRecord } from './towers.service';
import { TowerDto } from './dto/tower.dto';

@Controller('projects/:projectId/towers')
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @Get()
  getTowers(@Param('projectId') projectId: string): TowerRecord[] {
    return this.towersService.findByProject(projectId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTower(@Param('projectId') projectId: string, @Body() towerDto: TowerDto): TowerRecord {
    return this.towersService.create(projectId, towerDto);
  }
}
