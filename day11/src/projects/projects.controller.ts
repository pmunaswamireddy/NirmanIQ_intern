import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService, Project } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAll(): Project[] {
    return this.projectsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Project {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() data: Omit<Project, 'id'>): Project {
    return this.projectsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<Project, 'id'>>
  ): Project {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    return this.projectsService.remove(id);
  }
}
