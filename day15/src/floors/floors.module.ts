import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorEntity } from '../towers/entities/floor.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { FloorsService } from './floors.service';
import { FloorsController } from './floors.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FloorEntity, TowerEntity]), AuthModule],
  controllers: [FloorsController],
  providers: [FloorsService],
  exports: [FloorsService],
})
export class FloorsModule {}
