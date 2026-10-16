// Day 13 - Exercise 5: Raw SQL vs TypeORM QueryBuilder
// Author: Penumuru Madhu Sudhan Reddy

// 1. Raw SQL Query Representation
const rawSqlQuery=`
SELECT 
  p.id AS "projectId",
  p.name AS "projectName",
  COUNT(DISTINCT t.id) AS "towerCount",
  ROUND(COALESCE(AVG(f.completion_percentage), 0), 2) AS "avgCompletion",
  COALESCE(MAX(t.risk_level), 0) AS "maxRiskLevel"
FROM projects p
LEFT JOIN towers t ON t.project_id = p.id
LEFT JOIN floors f ON f.tower_id = t.id
WHERE p.is_archived = false
GROUP BY p.id, p.name
ORDER BY p.name ASC;
`;

// 2. Mock relational database for validation
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

// 3. Execution of TypeORM QueryBuilder equivalent
function executeQueryBuilder(){
  const active=db.projects.filter(p=>!p.is_archived);
  return active.map(p=>{
    const pTowers=db.towers.filter(t=>t.project_id===p.id);
    const tIds=pTowers.map(t=>t.id);
    const pFloors=db.floors.filter(f=>tIds.includes(f.tower_id));
    const avg=pFloors.length>0
      ?pFloors.reduce((sum,f)=>sum+f.completion_percentage,0)/pFloors.length
      :0;
    const maxRisk=pTowers.length>0
      ?Math.max(...pTowers.map(t=>t.risk_level))
      :0;
    return {
      projectId:p.id,
      projectName:p.name,
      towerCount:pTowers.length,
      avgCompletion:parseFloat(avg.toFixed(2)),
      maxRiskLevel:maxRisk
    };
  });
}

console.log('--- EXERCISE 5: Raw SQL vs TypeORM QueryBuilder ---');
console.log('\n[Part A: Pure PostgreSQL Raw SQL Query]');
console.log(rawSqlQuery.trim());

console.log('\n[Part B: TypeORM QueryBuilder Implementation]');
console.log(`
this.projectRepository
  .createQueryBuilder('p')
  .leftJoin('p.towers', 't')
  .leftJoin('t.floors', 'f')
  .select('p.id', 'projectId')
  .addSelect('p.name', 'projectName')
  .addSelect('COUNT(DISTINCT t.id)', 'towerCount')
  .addSelect('ROUND(COALESCE(AVG(f.completion_percentage), 0), 2)', 'avgCompletion')
  .addSelect('COALESCE(MAX(t.risk_level), 0)', 'maxRiskLevel')
  .where('p.is_archived = :isArchived', { isArchived: false })
  .groupBy('p.id')
  .addGroupBy('p.name')
  .getRawMany();
`.trim());

console.log('\n[Part C: Aggregation Result (getRawMany)]');
console.log(JSON.stringify(executeQueryBuilder(),null,2));
