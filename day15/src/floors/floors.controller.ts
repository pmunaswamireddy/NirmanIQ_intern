import {
  Controller,
  Patch,
  Get,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FloorsService } from './floors.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.floorsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SITE_ENGINEER, Role.SE, Role.PROJECT_MANAGER, Role.PM, Role.SUPER_ADMIN, Role.SA)
  @Patch(':id/progress')
  async updateProgress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgressDto,
    @CurrentUser() user: any,
  ) {
    return await this.floorsService.updateProgress(
      id,
      dto.completionPercentage,
      user?.id,
    );
  }
}
