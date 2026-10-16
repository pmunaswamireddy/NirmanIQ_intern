// Day 13 - Exercise 4: QueryBuilder Analytics & N+1 Prevention
// Author: Penumuru Madhu Sudhan Reddy

// Mock relational dataset representing PostgreSQL tables
const db={
  projects:[
    {id:'p-1',name:'Skyline Residency',is_archived:false},
    {id:'p-2',name:'Metro Logistics Park',is_archived:false},
    {id:'p-3',name:'Old Warehouse Site',is_archived:true}
  ],
  towers:[
    {id:'t-1',project_id:'p-1',name:'Tower A',risk_level:1},
    {id:'t-2',project_id:'p-1',name:'Tower B',risk_level:3},
    {id:'t-3',project_id:'p-2',name:'Hub Alpha',risk_level:0}
  ],
  floors:[
    {id:'f-1',tower_id:'t-1',completion_percentage:80.0},
    {id:'f-2',tower_id:'t-1',completion_percentage:60.0},
    {id:'f-3',tower_id:'t-2',completion_percentage:40.0},
    {id:'f-4',tower_id:'t-3',completion_percentage:95.0}
  ]
};

// Simulation of TypeORM QueryBuilder with getRawMany()
function executeProjectAnalyticsQuery() {
  const activeProjects=db.projects.filter(p=>!p.is_archived);

  return activeProjects.map(p=>{
    const projectTowers=db.towers.filter(t=>t.project_id===p.id);
    const towerIds=projectTowers.map(t=>t.id);
    const floors=db.floors.filter(f=>towerIds.includes(f.tower_id));

    const avg=floors.length>0
      ?floors.reduce((sum,f)=>sum+f.completion_percentage,0)/floors.length
      :0;
    const maxRisk=projectTowers.length>0
      ?Math.max(...projectTowers.map(t=>t.risk_level))
      :0;

    return {
      projectId:p.id,
      projectName:p.name,
      towerCount:projectTowers.length,
      avgCompletion:parseFloat(avg.toFixed(2)),
      maxRiskLevel:maxRisk
    };
  });
}

console.log('--- TypeORM QueryBuilder getRawMany() Result ---');
console.log(JSON.stringify(executeProjectAnalyticsQuery(),null,2));
