// Day 11 - Exercise 3: Nested Resources (Projects and Towers)
// Author: Penumuru Madhu Sudhan Reddy

const towers=[
  {id:'tower-1',projectId:'proj-1',name:'Tower Alpha',floors:14},
  {id:'tower-2',projectId:'proj-1',name:'Tower Bravo',floors:18},
  {id:'tower-3',projectId:'proj-2',name:'Tower Echo',floors:12}
];

function getTowersForProject(projectId) {
  return towers.filter(t=>t.projectId===projectId);
}

function addTowerToProject(projectId,data) {
  if (!data.name||data.name.trim().length<2) {
    throw new Error('Tower name must be at least 2 characters');
  }
  const newTower={
    id:`tower-${Date.now()}`,
    projectId,
    name:data.name.trim(),
    floors:data.floors||10
  };
  towers.push(newTower);
  return newTower;
}

console.log('Towers for proj-1:',getTowersForProject('proj-1').map(t=>t.name));
const newTower=addTowerToProject('proj-1',{name:'Tower Charlie',floors:20});
console.log('Added tower:',newTower.id,newTower.name);
console.log('Towers for proj-1 after insert:',getTowersForProject('proj-1').map(t=>t.name));
