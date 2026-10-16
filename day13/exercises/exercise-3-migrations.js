// Day 13 - Exercise 3: TypeORM Migration Execution & Rollback Simulation
// Author: Penumuru Madhu Sudhan Reddy

class MigrationRunner {
  constructor() {
    this.appliedMigrations=[];
    this.schema={};
  }

  async runMigration(migration) {
    if (this.appliedMigrations.some(m=>m.name===migration.name)) {
      console.log(`Skipping: ${migration.name} already applied`);
      return;
    }
    console.log(`Executing UP: ${migration.name}`);
    migration.up(this.schema);
    this.appliedMigrations.push(migration);
  }

  async revertMigration() {
    if (this.appliedMigrations.length===0) {
      console.log('No migrations to revert');
      return;
    }
    const last=this.appliedMigrations.pop();
    console.log(`Executing DOWN (revert): ${last.name}`);
    last.down(this.schema);
  }
}

const runner=new MigrationRunner();

// Migration 1: Initial schema
const m1={
  name:'1728980000000-InitialDatabaseSchema',
  up:(s)=>{
    s.projects=['id','name','description','status','created_at','updated_at'];
    s.towers=['id','name','risk_level','project_id'];
    s.floors=['id','floor_number','completion_percentage','tower_id'];
  },
  down:(s)=>{
    delete s.floors;
    delete s.towers;
    delete s.projects;
  }
};

// Migration 2: Add is_archived column
const m2={
  name:'1728980001000-AddIsArchivedToProjects',
  up:(s)=>{
    if (s.projects&&!s.projects.includes('is_archived')) {
      s.projects.push('is_archived');
    }
  },
  down:(s)=>{
    if (s.projects) {
      s.projects=s.projects.filter(col=>col!=='is_archived');
    }
  }
};

(async ()=>{
  await runner.runMigration(m1);
  await runner.runMigration(m2);
  console.log('Schema after M1 + M2:',runner.schema.projects);

  await runner.revertMigration();
  console.log('Schema after Revert M2:',runner.schema.projects);

  await runner.runMigration(m2);
  console.log('Schema after Re-run M2:',runner.schema.projects);
})();
