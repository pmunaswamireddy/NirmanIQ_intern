import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './dto/project-status.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('status') status?: ProjectStatus,
    @Query('search') search?: string,
  ) {
    return await this.projectsService.findAll(status, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROJECT_MANAGER, Role.PM, Role.SUPER_ADMIN)
  @Post()
  async create(@Body() dto: CreateProjectDto, @CurrentUser() user: any) {
    return await this.projectsService.create(dto, user?.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SITE_ENGINEER, Role.SE)
  @Patch(':id/progress')
  async updateProgress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { progress: number; note?: string },
    @CurrentUser() user: any,
  ) {
    return await this.projectsService.updateProgress(
      id,
      body.progress,
      body.note,
      user?.id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROJECT_MANAGER, Role.PM, Role.SUPER_ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectsService.delete(id);
  }
}
