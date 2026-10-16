import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CurrentUser, AuthenticatedUser } from '../auth/decorators/current-user.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('analytics')
  getAnalytics(@CurrentUser() user: AuthenticatedUser) {
    return this.projectsService.getProjectAnalytics();
  }

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // Only Planning Managers (PM) or higher can create projects
  @Post()
  @Roles(Role.PM, Role.PD, Role.TA, Role.SA)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateProjectDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.projectsService.create(createDto);
  }

  // PM or higher can update projects
  @Put(':id')
  @Roles(Role.PM, Role.PD, Role.TA, Role.SA)
  update(@Param('id') id: string, @Body() updateDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateDto);
  }

  // Only Super Admins (SA) can delete projects
  @Delete(':id')
  @Roles(Role.SA)
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
