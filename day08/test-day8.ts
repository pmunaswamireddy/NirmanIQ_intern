import { projects, getProjects, getProject, getTower } from './lib/data.ts';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Test failed: ${message}`);
}

async function runTests() {
  console.log('Running Day 8 Simple Tests...');

  // Exercise 1 & Data
  const all = await getProjects();
  assert(all.length === 3, 'Should have 3 projects');
  console.log('✓ Exercise 1: Projects loaded');

  // Exercise 4: ?status=active filter
  const active = await getProjects('active');
  assert(active.length === 2, 'Should have 2 active projects');
  console.log('✓ Exercise 4: Filter by ?status=active works');

  // Dynamic Route: /projects/[id]
  const p1 = await getProject('1');
  assert(p1?.name === 'Skyline Residency', 'Project 1 should match');
  console.log('✓ Exercise 1: Dynamic route [id] works');

  // Nested Dynamic Route: /projects/[id]/towers/[towerId]
  const { tower } = await getTower('1', 't1');
  assert(tower?.name === 'Tower A', 'Tower t1 should match');
  console.log('✓ Exercise 1: Nested dynamic route [towerId] works');

  console.log('\nAll Day 8 tests passed successfully!');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
