import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';
import { ProjectEntity } from './projects/entities/project.entity';
import { TowerEntity } from './towers/entities/tower.entity';
import { FloorEntity } from './towers/entities/floor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'nirmaniq_user',
      password: process.env.DB_PASSWORD || 'secretpassword',
      database: process.env.DB_NAME || 'nirmaniq_training',
      entities: [ProjectEntity, TowerEntity, FloorEntity],
      autoLoadEntities: true,
      synchronize: false
    }),
    ProjectsModule,
    TowersModule
  ]
})
export class AppModule {}
