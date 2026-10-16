import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { ProjectEntity } from '../projects/entities/project.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { FloorEntity } from '../towers/entities/floor.entity';
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
      const project = this.projectRepo.create({
        name: 'Skyline Heights',
        description: 'Prime mixed-use development with commercial & residential towers',
        status: ProjectStatus.ACTIVE,
      });
      const savedProject = await this.projectRepo.save(project);

      // Tower A: On Track (riskLevel 0)
      const towerA = this.towerRepo.create({
        name: 'Tower A',
        riskLevel: 0,
        projectId: savedProject.id,
      });
      const savedTowerA = await this.towerRepo.save(towerA);

      const floorsA = [
        { floorNumber: 1, completionPercentage: 100.0, status: 'COMPLETED' },
        { floorNumber: 2, completionPercentage: 80.0, status: 'IN_PROGRESS' },
        { floorNumber: 3, completionPercentage: 40.0, status: 'IN_PROGRESS' },
        { floorNumber: 4, completionPercentage: 0.0, status: 'NOT_STARTED' },
      ].map((f) =>
        this.floorRepo.create({
          ...f,
          towerId: savedTowerA.id,
        }),
      );
      await this.floorRepo.save(floorsA);

      // Tower B: At Risk (riskLevel 1)
      const towerB = this.towerRepo.create({
        name: 'Tower B',
        riskLevel: 1,
        projectId: savedProject.id,
      });
      const savedTowerB = await this.towerRepo.save(towerB);

      const floorsB = [
        { floorNumber: 1, completionPercentage: 50.0, status: 'IN_PROGRESS' },
        { floorNumber: 2, completionPercentage: 20.0, status: 'IN_PROGRESS' },
        { floorNumber: 3, completionPercentage: 0.0, status: 'NOT_STARTED' },
      ].map((f) =>
        this.floorRepo.create({
          ...f,
          towerId: savedTowerB.id,
        }),
      );
      await this.floorRepo.save(floorsB);
    }
  }
}
