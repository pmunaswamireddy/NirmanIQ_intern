// Day 11 - Exercise 2: In-Memory CRUD Operations
// Author: Penumuru Madhu Sudhan Reddy

let projects=[
  {id:'proj-1',name:'Skyline Commercial Park',status:'ACTIVE',towerCount:3},
  {id:'proj-2',name:'Greenfield Residency',status:'PLANNING',towerCount:4}
];

function getAllProjects() {
  return projects;
}

function getProjectById(id) {
  const item=projects.find(p=>p.id===id);
  if (!item) throw new Error(`Project ${id} not found`);
  return item;
}

function createProject(payload) {
  const now=new Date().toISOString();
  const newItem={
    id:`proj-${Date.now()}`,
    name:payload.name,
    status:payload.status||'PLANNING',
    towerCount:payload.towerCount||1,
    createdAt:now,
    updatedAt:now
  };
  projects.push(newItem);
  return newItem;
}

function updateProject(id,updates) {
  const item=getProjectById(id);
  if (updates.name!==undefined) item.name=updates.name;
  if (updates.status!==undefined) item.status=updates.status;
  if (updates.towerCount!==undefined) item.towerCount=updates.towerCount;
  item.updatedAt=new Date().toISOString();
  return item;
}

function deleteProject(id) {
  const prevLen=projects.length;
  projects=projects.filter(p=>p.id!==id);
  if (projects.length===prevLen) throw new Error(`Project ${id} not found`);
  return {deleted:true,id};
}

// verify crud cycle
console.log('Initial count:',projects.length);
const created=createProject({name:'Apex Heights',status:'ACTIVE',towerCount:2});
console.log('Created project:',created.id,created.name);
const updated=updateProject(created.id,{status:'COMPLETED'});
console.log('Updated status:',updated.status);
const deleted=deleteProject('proj-2');
console.log('Deleted status:',deleted);
console.log('Final count:',getAllProjects().length);
