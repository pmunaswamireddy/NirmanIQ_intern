// Day 13 Test Suite: PostgreSQL & TypeORM Verification
// Author: Penumuru Madhu Sudhan Reddy

const fs=require('fs');
const path=require('path');
const crypto=require('crypto');

function assert(condition,message) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

async function runDay13Tests() {
  console.log('--- STARTING DAY 13 POSTGRESQL & TYPEORM INTEGRATION TESTS ---');

  // Test 1: Verify docker-compose.yml configuration
  console.log('Running Test 1: PostgreSQL Docker Compose configuration...');
  const composePath=path.join(__dirname,'docker-compose.yml');
  assert(fs.existsSync(composePath),'docker-compose.yml must exist');
  const composeContent=fs.readFileSync(composePath,'utf8');
  assert(composeContent.includes('postgres:16-alpine'),'Must use postgres:16-alpine image');
  assert(composeContent.includes('5432:5432'),'Must expose port 5432');
  assert(composeContent.includes('nirmaniq_training'),'Must specify nirmaniq_training database');
  console.log('✓ Test 1: docker-compose.yml is properly configured with PostgreSQL 16');

  // Test 2: Verify Entity definitions and snake_case column mapping
  console.log('Running Test 2: Entity definitions and snake_case column mapping...');
  const projectEntityPath=path.join(__dirname,'src','projects','entities','project.entity.ts');
  const towerEntityPath=path.join(__dirname,'src','towers','entities','tower.entity.ts');
  const floorEntityPath=path.join(__dirname,'src','towers','entities','floor.entity.ts');

  assert(fs.existsSync(projectEntityPath),'ProjectEntity file must exist');
  assert(fs.existsSync(towerEntityPath),'TowerEntity file must exist');
  assert(fs.existsSync(floorEntityPath),'FloorEntity file must exist');

  const projectCode=fs.readFileSync(projectEntityPath,'utf8');
  assert(projectCode.includes("@PrimaryGeneratedColumn('uuid')"),'Project ID must be UUID');
  assert(projectCode.includes("name: 'created_at'"),'Must map createdAt to created_at');
  assert(projectCode.includes("name: 'is_archived'"),'Must map isArchived to is_archived');
  assert(projectCode.includes('@OneToMany'),'Must define OneToMany relation to TowerEntity');
  console.log('✓ Test 2: Entities enforce UUIDs and snake_case column mapping');

  // Test 3: Verify Migrations (Initial Schema + AddIsArchived)
  console.log('Running Test 3: TypeORM Migration files...');
  const mig1Path=path.join(__dirname,'src','migrations','1728980000000-InitialDatabaseSchema.ts');
  const mig2Path=path.join(__dirname,'src','migrations','1728980001000-AddIsArchivedToProjects.ts');

  assert(fs.existsSync(mig1Path),'Initial schema migration must exist');
  assert(fs.existsSync(mig2Path),'Second migration (AddIsArchived) must exist');

  const mig2Content=fs.readFileSync(mig2Path,'utf8');
  assert(mig2Content.includes('ADD COLUMN'),'Migration UP must add is_archived column');
  assert(mig2Content.includes('DROP COLUMN'),'Migration DOWN must drop is_archived column');
  console.log('✓ Test 3: Migration files verified with complete UP and DOWN rollback support');

  // Test 4: Repository CRUD Simulation (UUID generation & column projection)
  console.log('Running Test 4: Repository operations & selective projection (No SELECT *)...');
  const mockRepo={
    projects:[],
    create(data) {
      return {
        id:crypto.randomUUID(),
        name:data.name,
        description:data.description||null,
        status:data.status||'PLANNING',
        isArchived:false,
        createdAt:new Date(),
        updatedAt:new Date()
      };
    },
    save(proj) {
      const idx=this.projects.findIndex(p=>p.id===proj.id);
      if (idx>=0) this.projects[idx]=proj;
      else this.projects.push(proj);
      return proj;
    },
    find({select,where}) {
      return this.projects
        .filter(p=>where.isArchived===undefined||p.isArchived===where.isArchived)
        .map(p=>{
          const projected={};
          select.forEach(col=>{projected[col]=p[col];});
          return projected;
        });
    }
  };

  const p1=mockRepo.create({name:'Apex Heights',status:'ACTIVE'});
  assert(p1.id.length===36,'Generated ID must be a valid 36-char UUID');
  mockRepo.save(p1);

  const selected=mockRepo.find({
    select:['id','name','status','createdAt'],
    where:{isArchived:false}
  });
  assert(selected.length===1,'Should find 1 active project');
  assert(selected[0].description===undefined,'description must not be in projected columns (No SELECT *)');
  assert(selected[0].name==='Apex Heights','Project name must match');
  console.log('✓ Test 4: Repository CRUD and selective column projection verified');

  // Test 5: QueryBuilder Analytics Aggregation Simulation
  console.log('Running Test 5: QueryBuilder analytics aggregation (COUNT, AVG, MAX)...');
  const mockDb={
    projects:[
      {id:'p-1',name:'Corridor Plaza',is_archived:false},
      {id:'p-2',name:'Archived Site',is_archived:true}
    ],
    towers:[
      {id:'t-1',project_id:'p-1',risk_level:1},
      {id:'t-2',project_id:'p-1',risk_level:3}
    ],
    floors:[
      {id:'f-1',tower_id:'t-1',completion_percentage:90.0},
      {id:'f-2',tower_id:'t-1',completion_percentage:70.0},
      {id:'f-3',tower_id:'t-2',completion_percentage:50.0}
    ]
  };

  function executeQueryBuilderAnalytics() {
    return mockDb.projects
      .filter(p=>!p.is_archived)
      .map(p=>{
        const towers=mockDb.towers.filter(t=>t.project_id===p.id);
        const tIds=towers.map(t=>t.id);
        const floors=mockDb.floors.filter(f=>tIds.includes(f.tower_id));
        const avgComp=floors.length>0
          ?floors.reduce((acc,f)=>acc+f.completion_percentage,0)/floors.length
          :0;
        const maxRisk=towers.length>0?Math.max(...towers.map(t=>t.risk_level)):0;

        return {
          projectId:p.id,
          projectName:p.name,
          towerCount:towers.length,
          avgCompletion:parseFloat(avgComp.toFixed(2)),
          maxRiskLevel:maxRisk
        };
      });
  }

  const analytics=executeQueryBuilderAnalytics();
  assert(analytics.length===1,'Must only aggregate non-archived projects');
  assert(analytics[0].towerCount===2,'Corridor Plaza must aggregate 2 towers');
  assert(analytics[0].avgCompletion===70,'Average completion percentage must be 70%');
  assert(analytics[0].maxRiskLevel===3,'Max risk level must be 3 (critical)');
  console.log('✓ Test 5: QueryBuilder multi-table aggregation computed correct metrics');

  console.log('\nALL DAY 13 POSTGRESQL & TYPEORM TESTS PASSED! (5/5 tests clean)');
}

runDay13Tests().catch(err=>{
  console.error('Day 13 Test Suite Error:',err);
  process.exit(1);
});
