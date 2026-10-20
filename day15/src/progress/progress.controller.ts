import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  async findByProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return await this.progressService.findByProject(projectId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SITE_ENGINEER, Role.SE)
  @Post(':projectId')
  async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() body: { progress: number; note?: string },
    @CurrentUser() user: any,
  ) {
    return await this.progressService.recordUpdate(
      projectId,
      body.progress,
      body.note,
      user?.id,
    );
  }
}
