import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TowersService, Tower } from './towers.service';

@Controller('projects/:id/towers')
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @Get()
  getTowers(@Param('id') projectId: string): Tower[] {
    return this.towersService.findByProject(projectId);
  }

  @Post()
  createTower(
    @Param('id') projectId: string,
    @Body() data: { name: string; floors: number }
  ): Tower {
    return this.towersService.createForProject(projectId, data);
  }
}
