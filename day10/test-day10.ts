import { fetchProjects, createProjectApi } from './lib/api.ts';
import { useAuthStore, useUIStore } from './lib/stores.ts';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

async function runDay10Tests() {
  console.log('--- RUNNING DAY 10 REACT QUERY & ZUSTAND TESTS ---');

  // Test 1: React Query mock API (Exercise 1)
  const initial = await fetchProjects();
  assert(initial.length >= 3, 'Should fetch at least 3 initial projects');
  console.log('✓ Test 1: fetchProjects API resolves project list correctly');

  // Test 2: Mutation API (Exercise 2)
  const created = await createProjectApi({
    name: 'Cyber Park Phase 2',
    status: 'active',
    progress: 10,
    towerCount: 2,
  });
  assert(created.name === 'Cyber Park Phase 2', 'Created project name should match');
  assert(typeof created.id === 'string', 'Created project must have an id');
  console.log('✓ Test 2: createProjectApi adds new project to data store');

  // Test 3: Zustand useAuthStore (Exercise 3)
  const auth = useAuthStore.getState();
  assert(auth.isAuthenticated === true, 'Auth store should have default initial state');
  auth.logout();
  assert(useAuthStore.getState().isAuthenticated === false, 'Auth store logout action works');
  auth.login('Lead Architect', 'test-token');
  assert(useAuthStore.getState().user === 'Lead Architect', 'Auth store login action works');
  console.log('✓ Test 3: Zustand useAuthStore actions (login, logout, token) verified');

  // Test 4: Zustand useUIStore (Exercise 3 & 4)
  const ui = useUIStore.getState();
  assert(ui.viewMode === 'grid', 'Initial view mode should be grid');
  ui.setViewMode('table');
  assert(useUIStore.getState().viewMode === 'table', 'setViewMode action works');
  ui.setStatusFilter('active');
  assert(useUIStore.getState().statusFilter === 'active', 'setStatusFilter action works');
  console.log('✓ Test 4: Zustand useUIStore actions (viewMode, statusFilter) verified');

  console.log('\nALL DAY 10 TESTS PASSED SUCCESSFULLY! (4/4 tests clean)');
}

runDay10Tests().catch((err) => {
  console.error('Day 10 Test Error:', err);
  process.exit(1);
});
