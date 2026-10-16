import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TowersService } from './towers.service';

@Controller('projects/:projectId/towers')
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @Get()
  findByProjectId(@Param('projectId') projectId: string) {
    return this.towersService.findByProjectId(projectId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('projectId') projectId: string,
    @Body() body: { name: string; riskLevel?: number; floors?: { floorNumber: number; completionPercentage?: number }[] }
  ) {
    return this.towersService.create(projectId, body);
  }
}
