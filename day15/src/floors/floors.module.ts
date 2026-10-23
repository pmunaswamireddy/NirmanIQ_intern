import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorEntity } from '../towers/entities/floor.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { ProjectEntity } from '../projects/entities/project.entity';
import { ProgressUpdateEntity } from '../progress/entities/progress-update.entity';
import { FloorsService } from './floors.service';
import { FloorsController } from './floors.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FloorEntity,
      TowerEntity,
      ProjectEntity,
      ProgressUpdateEntity,
    ]),
    AuthModule,
  ],
  controllers: [FloorsController],
  providers: [FloorsService],
  exports: [FloorsService],
})
export class FloorsModule {}
