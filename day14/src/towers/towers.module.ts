import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TowerEntity } from './entities/tower.entity';
import { FloorEntity } from './entities/floor.entity';
import { TowersService } from './towers.service';
import { TowersController } from './towers.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TowerEntity, FloorEntity]), AuthModule],
  controllers: [TowersController],
  providers: [TowersService],
  exports: [TowersService],
})
export class TowersModule {}
