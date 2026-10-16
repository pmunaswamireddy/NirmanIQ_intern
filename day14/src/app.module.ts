import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'nirmaniq_user',
      password: process.env.DB_PASSWORD || 'secretpassword',
      database: process.env.DB_NAME || 'nirmaniq_training',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    TowersModule,
  ],
})
export class AppModule {}
