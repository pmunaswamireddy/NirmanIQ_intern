import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';
import { FloorsModule } from './floors/floors.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    TowersModule,
    FloorsModule,
    SeedModule,
  ],
})
export class AppModule {}
