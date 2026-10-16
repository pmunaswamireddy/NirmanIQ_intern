import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TowersService } from './towers.service';
import { CreateTowerDto } from './dto/create-tower.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller()
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('projects/:projectId/towers')
  async findByProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return await this.towersService.findByProjectId(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('towers/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.towersService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROJECT_MANAGER, Role.SUPER_ADMIN)
  @Post('projects/:projectId/towers')
  async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() dto: CreateTowerDto,
  ) {
    return await this.towersService.create(projectId, dto);
  }
}
