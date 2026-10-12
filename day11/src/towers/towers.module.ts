import { Module } from '@nestjs/common';
import { TowersController } from './towers.controller';
import { TowersService } from './towers.service';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [TowersController],
  providers: [TowersService]
})
export class TowersModule {}
