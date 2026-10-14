// Day 11 - Exercise 2: In-Memory CRUD Operations
// Demonstrating Create, Read, Update, Delete for Construction Projects

let projects = [
  { id: 'proj-1', name: 'Skyline Commercial Park', status: 'ACTIVE', towerCount: 3 },
  { id: 'proj-2', name: 'Greenfield Residency', status: 'PLANNING', towerCount: 4 }
];

// CREATE (POST /projects)
function createProject(dto) {
  const newProject = {
    id: `proj-${Date.now()}`,
    name: dto.name,
    status: dto.status || 'PLANNING',
    towerCount: dto.towerCount || 1,
    createdAt: new Date().toISOString()
  };
  projects.push(newProject);
  return newProject;
}

// READ ALL (GET /projects)
function getAllProjects() {
  return projects;
}

// READ ONE (GET /projects/:id)
function getProjectById(id) {
  const found = projects.find(p => p.id === id);
  if (!found) throw new Error(`Project ${id} not found`);
  return found;
}

// UPDATE (PUT /projects/:id)
function updateProject(id, updateDto) {
  const project = getProjectById(id);
  if (updateDto.name) project.name = updateDto.name;
  if (updateDto.status) project.status = updateDto.status;
  if (updateDto.towerCount) project.towerCount = updateDto.towerCount;
  project.updatedAt = new Date().toISOString();
  return project;
}

// DELETE (DELETE /projects/:id)
function deleteProject(id) {
  const initialLength = projects.length;
  projects = projects.filter(p => p.id !== id);
  if (projects.length === initialLength) throw new Error(`Project ${id} not found`);
  return { success: true, deletedId: id };
}

// Testing the CRUD pipeline
console.log('--- EXERCISE 2: IN-MEMORY CRUD OPERATIONS ---');
console.log('Initial Projects Count:', projects.length);

const created = createProject({ name: 'Apex Tech Hub', status: 'ACTIVE', towerCount: 2 });
console.log('Created Project:', created.id, created.name);

const updated = updateProject(created.id, { name: 'Apex Tech Hub - Phase 1' });
console.log('Updated Project Name:', updated.name);

const deletion = deleteProject('proj-2');
console.log('Deleted Project proj-2:', deletion.success);
console.log('Final Projects Count:', getAllProjects().length);
