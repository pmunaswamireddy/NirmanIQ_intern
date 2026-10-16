import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { TowersService } from './towers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('projects/:projectId/towers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @Get()
  findByProjectId(@Param('projectId') projectId: string) {
    return this.towersService.findByProjectId(projectId);
  }

  @Post()
  @Roles(Role.PM, Role.PD, Role.TA, Role.SA)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('projectId') projectId: string,
    @Body() body: { name: string; riskLevel?: number; floors?: { floorNumber: number; completionPercentage?: number }[] }
  ) {
    return this.towersService.create(projectId, body);
  }
}
