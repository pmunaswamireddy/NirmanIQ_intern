require('reflect-metadata');
const { ProjectsService } = require('./dist/projects/projects.service');
const { TowersService } = require('./dist/towers/towers.service');

function assert(condition, message) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

async function runDay11Tests() {
  console.log('--- RUNNING DAY 11 NESTJS ARCHITECTURE & CRUD TESTS ---');

  const projectsService = new ProjectsService();
  const towersService = new TowersService(projectsService);

  // Test 1: GET /projects
  const initial = projectsService.findAll();
  assert(initial.length === 3, 'Initial projects count should be 3');
  console.log('✓ Test 1: GET /projects returned all initial projects');

  // Test 2: GET /projects/:id
  const p1 = projectsService.findOne('proj-1');
  assert(p1.name === 'Skyline Residency', 'Project name should match');
  console.log('✓ Test 2: GET /projects/:id retrieved single project');

  // Test 3: POST /projects
  const created = projectsService.create({
    name: 'Cyber Horizon IT Park',
    status: 'planning',
    towerCount: 4,
    description: 'Tech campus development'
  });
  assert(created.id.startsWith('proj-'), 'Created project must have generated ID');
  assert(projectsService.findAll().length === 4, 'Projects list must now have 4 projects');
  console.log('✓ Test 3: POST /projects successfully created project');

  // Test 4: PUT /projects/:id
  const updated = projectsService.update('proj-1', { status: 'completed' });
  assert(updated.status === 'completed', 'Project status should be updated');
  console.log('✓ Test 4: PUT /projects/:id successfully updated project');

  // Test 5: DELETE /projects/:id
  projectsService.remove('proj-3');
  assert(projectsService.findAll().length === 3, 'Project should be removed');
  let notFoundCaught = false;
  try {
    projectsService.findOne('proj-3');
  } catch (err) {
    notFoundCaught = true;
  }
  assert(notFoundCaught, 'Querying deleted project must throw NotFoundException');
  console.log('✓ Test 5: DELETE /projects/:id removed project and throws 404');

  // Test 6: GET /projects/:id/towers
  const towers = towersService.findByProject('proj-1');
  assert(towers.length === 2, 'proj-1 should have 2 registered towers');
  console.log('✓ Test 6: GET /projects/:id/towers returned nested towers');

  // Test 7: POST /projects/:id/towers
  const newTower = towersService.createForProject('proj-1', { name: 'Tower Gamma', floors: 28 });
  assert(newTower.name === 'Tower Gamma', 'Tower name should match');
  assert(towersService.findByProject('proj-1').length === 3, 'proj-1 must now have 3 towers');
  console.log('✓ Test 7: POST /projects/:id/towers added nested tower resource');

  console.log('\nALL DAY 11 TESTS PASSED SUCCESSFULLY! (7/7 tests clean)');
}

runDay11Tests().catch((err) => {
  console.error('Day 11 Test Error:', err);
  process.exit(1);
});
