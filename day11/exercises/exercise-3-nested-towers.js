// Day 11 - Exercise 3: Nested Resources (Towers inside Projects)
// Demonstrating GET /projects/:id/towers and POST /projects/:id/towers

const towers = [
  { id: 'tower-1', projectId: 'proj-1', name: 'Tower Alpha', floors: 14 },
  { id: 'tower-2', projectId: 'proj-1', name: 'Tower Bravo', floors: 18 },
  { id: 'tower-3', projectId: 'proj-2', name: 'Tower Echo', floors: 12 }
];

function getTowersForProject(projectId) {
  return towers.filter(t => t.projectId === projectId);
}

function addTowerToProject(projectId, towerData) {
  const newTower = {
    id: `tower-${Date.now()}`,
    projectId,
    name: towerData.name,
    floors: towerData.floors || 10
  };
  towers.push(newTower);
  return newTower;
}

console.log('--- EXERCISE 3: NESTED RESOURCES (TOWERS PER PROJECT) ---');
console.log('Towers for proj-1:', getTowersForProject('proj-1').map(t => t.name));

const added = addTowerToProject('proj-1', { name: 'Tower Charlie', floors: 22 });
console.log('Added new tower:', added.name, 'to project:', added.projectId);
console.log('Updated Towers for proj-1:', getTowersForProject('proj-1').map(t => t.name));
