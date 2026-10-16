import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDatabaseSchema1728980000000 implements MigrationInterface {
  name = 'InitialDatabaseSchema1728980000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create enum type for status
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "project_status_enum" AS ENUM ('PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 2. Create projects table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(100) NOT NULL,
        "description" text,
        "status" "project_status_enum" NOT NULL DEFAULT 'PLANNING',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects_id" PRIMARY KEY ("id")
      );
    `);

    // 3. Create towers table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "towers" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(50) NOT NULL,
        "risk_level" integer NOT NULL DEFAULT 0,
        "project_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_towers_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_towers_project" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);

    // 4. Create floors table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "floors" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "floor_number" integer NOT NULL,
        "completion_percentage" numeric(5,2) NOT NULL DEFAULT 0.00,
        "tower_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_floors_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_floors_tower" FOREIGN KEY ("tower_id") REFERENCES "towers"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);

    // 5. Create index on foreign keys for fast joins
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_towers_project_id" ON "towers" ("project_id");`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_floors_tower_id" ON "floors" ("tower_id");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "floors";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "towers";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "projects";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "project_status_enum";`);
  }
}
