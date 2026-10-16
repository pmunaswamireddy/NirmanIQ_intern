import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';

@Module({
  imports: [ProjectsModule, TowersModule],
  controllers: [AppController],
})
export class AppModule {}
