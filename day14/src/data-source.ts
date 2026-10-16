import { DataSource } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';
import { ProjectEntity } from './projects/entities/project.entity';
import { TowerEntity } from './towers/entities/tower.entity';
import { FloorEntity } from './towers/entities/floor.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'nirmaniq_user',
  password: process.env.DB_PASSWORD || 'secretpassword',
  database: process.env.DB_NAME || 'nirmaniq_training',
  synchronize: false,
  entities: [UserEntity, ProjectEntity, TowerEntity, FloorEntity],
  migrations: ['src/migrations/*.ts'],
});
