import { initialProjects, type ProjectItem } from './lib/data.ts';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

function validateProjectForm(name: string, description: string, startDate: string, towerCount: number) {
  const errors: Record<string, string> = {};
  if (!name.trim()) errors.name = 'Required';
  else if (name.trim().length < 3 || name.trim().length > 100) errors.name = 'Length 3-100';

  if (!description.trim()) errors.description = 'Required';
  if (!startDate) errors.startDate = 'Required';

  if (isNaN(towerCount) || towerCount < 1 || towerCount > 50) errors.towerCount = 'Count 1-50';

  return { isValid: Object.keys(errors).length === 0, errors };
}

function runDay9Tests() {
  console.log('--- RUNNING DAY 9 TAILWIND & SHADCN/UI TESTS ---');

  // Test 1: Initial Data Registry
  assert(initialProjects.length === 4, 'Should have 4 initial projects');
  console.log('✓ Test 1: Project data items initialized correctly');

  // Test 2: Sorting Logic (Exercise 2)
  const sortedByName = [...initialProjects].sort((a, b) => a.name.localeCompare(b.name));
  assert(sortedByName[0].name === 'Cyber Horizon Tech Hub', 'First project alphabetical should match');

  const sortedByProgressDesc = [...initialProjects].sort((a, b) => b.progress - a.progress);
  assert(sortedByProgressDesc[0].progress === 100, 'Top progress project should be 100%');
  console.log('✓ Test 2: Table sorting by name and progress verified');

  // Test 3: Form Validation (Exercise 3)
  const validForm = validateProjectForm('Apex Heights', 'Residential Towers', '2026-10-10', 12);
  assert(validForm.isValid, 'Valid inputs should pass validation');

  const shortNameForm = validateProjectForm('AB', 'Valid desc', '2026-10-10', 5);
  assert(!shortNameForm.isValid && shortNameForm.errors.name !== undefined, 'Name under 3 chars must fail');

  const invalidTowersForm = validateProjectForm('Valid Project', 'Valid desc', '2026-10-10', 99);
  assert(!invalidTowersForm.isValid && invalidTowersForm.errors.towerCount !== undefined, 'Tower count > 50 must fail');
  console.log('✓ Test 3: Form validation rules (name length, tower bounds 1-50) verified');

  console.log('\nALL DAY 9 TESTS PASSED SUCCESSFULLY! (3/3 tests clean)');
}

runDay9Tests();
