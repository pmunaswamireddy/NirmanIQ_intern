import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TowerEntity } from './entities/tower.entity';
import { FloorEntity } from './entities/floor.entity';
import { TowersController } from './towers.controller';
import { TowersService } from './towers.service';

@Module({
  imports: [TypeOrmModule.forFeature([TowerEntity, FloorEntity])],
  controllers: [TowersController],
  providers: [TowersService],
  exports: [TowersService]
})
export class TowersModule {}
