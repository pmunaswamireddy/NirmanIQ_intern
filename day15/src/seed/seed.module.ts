import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ProjectEntity } from '../projects/entities/project.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { FloorEntity } from '../towers/entities/floor.entity';
import { ProgressUpdateEntity } from '../progress/entities/progress-update.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProjectEntity,
      TowerEntity,
      FloorEntity,
      ProgressUpdateEntity,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
