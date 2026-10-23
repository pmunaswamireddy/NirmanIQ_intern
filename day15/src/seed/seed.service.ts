import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { ProjectEntity } from '../projects/entities/project.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { FloorEntity } from '../towers/entities/floor.entity';
import { ProgressUpdateEntity } from '../progress/entities/progress-update.entity';
import { Role } from '../auth/roles.enum';
import { ProjectStatus } from '../projects/dto/project-status.enum';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(TowerEntity)
    private readonly towerRepo: Repository<TowerEntity>,
    @InjectRepository(FloorEntity)
    private readonly floorRepo: Repository<FloorEntity>,
    @InjectRepository(ProgressUpdateEntity)
    private readonly updateRepo: Repository<ProgressUpdateEntity>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
    await this.seedProjects();
  }

  private async seedUsers() {
    const defaultPassword = 'Password123!';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(defaultPassword, salt);

    const usersToSeed = [
      { email: 'pm@company.com', role: Role.PM },
      { email: 'se@company.com', role: Role.SE },
      { email: 'pm@nirmaniq.com', role: Role.PROJECT_MANAGER },
      { email: 'se@nirmaniq.com', role: Role.SITE_ENGINEER },
      { email: 'admin@nirmaniq.com', role: Role.SUPER_ADMIN },
    ];

    for (const u of usersToSeed) {
      const existing = await this.userRepo.findOne({ where: { email: u.email } });
      if (!existing) {
        const user = this.userRepo.create({
          email: u.email,
          passwordHash,
          role: u.role,
        });
        await this.userRepo.save(user);
      }
    }
  }

  private async seedProjects() {
    const count = await this.projectRepo.count();
    if (count === 0) {
      // 1. Skyline Tower (65% progress)
      const skyline = this.projectRepo.create({
        name: 'Skyline Tower',
        location: 'Hyderabad',
        targetCompletion: '2026-12-31',
        description: 'Iconic commercial high-rise in Hitec City',
        status: ProjectStatus.ACTIVE,
        progress: 65,
      });
      const savedSkyline = await this.projectRepo.save(skyline);

      const update1 = this.updateRepo.create({
        projectId: savedSkyline.id,
        progress: 65,
        note: 'Floor 12 structural concreting completed',
      });
      await this.updateRepo.save(update1);

      // Tower A for Skyline
      const towerA = this.towerRepo.create({
        name: 'Tower A',
        riskLevel: 1,
        projectId: savedSkyline.id,
      });
      const savedTowerA = await this.towerRepo.save(towerA);

      const floorsA = [
        { floorNumber: 1, completionPercentage: 100, status: 'COMPLETED' },
        { floorNumber: 2, completionPercentage: 100, status: 'COMPLETED' },
        { floorNumber: 3, completionPercentage: 60, status: 'IN_PROGRESS' },
        { floorNumber: 4, completionPercentage: 0, status: 'NOT_STARTED' },
      ].map((f) =>
        this.floorRepo.create({
          ...f,
          towerId: savedTowerA.id,
        }),
      );
      await this.floorRepo.save(floorsA);

      // 2. Metro Tower (40% progress)
      const metro = this.projectRepo.create({
        name: 'Metro Tower',
        location: 'Bangalore',
        targetCompletion: '2027-03-31',
        description: 'Transit-oriented residential tower near Metro terminal',
        status: ProjectStatus.ACTIVE,
        progress: 40,
      });
      const savedMetro = await this.projectRepo.save(metro);

      const update2 = this.updateRepo.create({
        projectId: savedMetro.id,
        progress: 40,
        note: 'Podium MEP ducting in progress',
      });
      await this.updateRepo.save(update2);

      // 3. Horizon Heights (100% completed)
      const horizon = this.projectRepo.create({
        name: 'Horizon Heights',
        location: 'Hyderabad',
        targetCompletion: '2026-08-30',
        description: 'Completed luxury residential tower',
        status: ProjectStatus.COMPLETED,
        progress: 100,
      });
      await this.projectRepo.save(horizon);
    }
  }
}
