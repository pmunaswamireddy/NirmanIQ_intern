import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsArchivedToProjects1728980001000 implements MigrationInterface {
  name = 'AddIsArchivedToProjects1728980001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "projects" 
      ADD COLUMN IF NOT EXISTS "is_archived" boolean NOT NULL DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "projects" 
      DROP COLUMN IF EXISTS "is_archived";
    `);
  }
}
