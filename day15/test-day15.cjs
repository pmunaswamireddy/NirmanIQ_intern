const assert = require('assert');
const http = require('http');

const API_BASE = 'http://localhost:3015';

function makeRequest(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, body: parsed, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, body: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING DAY 15 CHECKPOINT ASSESSMENT #1 INTEGRATION TESTS ---');

  // Test 1: User Logins & Dual Token Generation
  console.log('Running Test 1: Authentication & Token Issuance for PM and SE...');
  const pmLoginRes = await makeRequest('/auth/login', { method: 'POST' }, {
    email: 'pm@nirmaniq.com',
    password: 'Password123!',
  });
  assert.strictEqual(pmLoginRes.status, 200, 'PM Login must succeed with 200');
  assert.ok(pmLoginRes.body.accessToken, 'PM must receive accessToken');
  assert.strictEqual(pmLoginRes.body.user.role, 'PROJECT_MANAGER', 'PM role must be PROJECT_MANAGER');
  const pmToken = pmLoginRes.body.accessToken;

  const seLoginRes = await makeRequest('/auth/login', { method: 'POST' }, {
    email: 'se@nirmaniq.com',
    password: 'Password123!',
  });
  assert.strictEqual(seLoginRes.status, 200, 'SE Login must succeed with 200');
  assert.ok(seLoginRes.body.accessToken, 'SE must receive accessToken');
  assert.strictEqual(seLoginRes.body.user.role, 'SITE_ENGINEER', 'SE role must be SITE_ENGINEER');
  const seToken = seLoginRes.body.accessToken;
  console.log('✓ Test 1: PM and SE logged in successfully with valid JWT tokens');

  // Test 2: Unauthenticated Access Guarding (401 Unauthorized)
  console.log('Running Test 2: JwtAuthGuard blocking unauthenticated access to /projects...');
  const unauthRes = await makeRequest('/projects', { method: 'GET' });
  assert.strictEqual(unauthRes.status, 401, 'Unauthenticated request must return 401');
  assert.strictEqual(unauthRes.body.error, 'Unauthorized', 'Error title must be Unauthorized');
  console.log('✓ Test 2: JwtAuthGuard correctly returned 401 for unauthenticated request');

  // Test 3: Project Manager Project & Tower Creation
  console.log('Running Test 3: PM creating a new project and adding a tower...');
  const createProjRes = await makeRequest(
    '/projects',
    { method: 'POST', headers: { Authorization: `Bearer ${pmToken}` } },
    {
      name: 'Assessment Tower Complex',
      description: 'Phase 1 checkpoint evaluation project',
    },
  );
  assert.strictEqual(createProjRes.status, 201, 'PM project creation must return 201');
  assert.ok(createProjRes.body.id, 'Created project must have UUID id');
  const projectId = createProjRes.body.id;

  const addTowerRes = await makeRequest(
    `/projects/${projectId}/towers`,
    { method: 'POST', headers: { Authorization: `Bearer ${pmToken}` } },
    {
      name: 'Tower Alpha',
      riskLevel: 0,
      floorCount: 4,
    },
  );
  assert.strictEqual(addTowerRes.status, 201, 'PM tower creation must return 201');
  assert.strictEqual(addTowerRes.body.name, 'Tower Alpha');
  assert.strictEqual(addTowerRes.body.floors.length, 4, 'Tower must have 4 auto-generated floors');
  const towerId = addTowerRes.body.id;
  const targetFloor = addTowerRes.body.floors[0];
  console.log('✓ Test 3: PM created project and tower with 4 floors cleanly');

  // Test 4: RolesGuard RBAC - SE blocked from Project Creation (403 Forbidden)
  console.log('Running Test 4: RolesGuard blocking SE from project creation (403 Forbidden)...');
  const seCreateRes = await makeRequest(
    '/projects',
    { method: 'POST', headers: { Authorization: `Bearer ${seToken}` } },
    {
      name: 'SE Unauthorized Project',
    },
  );
  assert.strictEqual(seCreateRes.status, 403, 'SE project creation must be rejected with 403');
  assert.strictEqual(seCreateRes.body.error, 'Forbidden', 'Error must be Forbidden');
  console.log('✓ Test 4: RolesGuard strictly enforced RBAC and blocked SE with 403 Forbidden');

  // Test 5: Site Engineer updating floor progress (PATCH /floors/:id/progress)
  console.log('Running Test 5: SE updating floor progress (PATCH /floors/:id/progress)...');
  const seUpdateProgressRes = await makeRequest(
    `/floors/${targetFloor.id}/progress`,
    { method: 'PATCH', headers: { Authorization: `Bearer ${seToken}` } },
    {
      completionPercentage: 85.0,
    },
  );
  assert.strictEqual(seUpdateProgressRes.status, 200, 'SE progress update must succeed with 200');
  assert.strictEqual(Number(seUpdateProgressRes.body.completionPercentage), 85.0, 'Completion must be 85%');
  assert.strictEqual(seUpdateProgressRes.body.status, 'IN_PROGRESS', 'Floor status must transition to IN_PROGRESS');

  // Complete floor to 100%
  const seCompleteFloorRes = await makeRequest(
    `/floors/${targetFloor.id}/progress`,
    { method: 'PATCH', headers: { Authorization: `Bearer ${seToken}` } },
    {
      completionPercentage: 100.0,
    },
  );
  assert.strictEqual(Number(seCompleteFloorRes.body.completionPercentage), 100.0);
  assert.strictEqual(seCompleteFloorRes.body.status, 'COMPLETED', 'Floor status must transition to COMPLETED at 100%');

  // Verify project detail reflects updated progress
  const projDetailRes = await makeRequest(`/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${seToken}` },
  });
  assert.strictEqual(projDetailRes.status, 200);
  assert.strictEqual(projDetailRes.body.towers.length, 1);
  assert.strictEqual(projDetailRes.body.towers[0].floors[0].status, 'COMPLETED');
  console.log('✓ Test 5: SE successfully updated floor progress and status in database');

  console.log('\nALL DAY 15 CHECKPOINT ASSESSMENT #1 TESTS PASSED! (5/5 tests clean)\n');
}

runTests().catch((err) => {
  console.error('\n❌ DAY 15 ASSESSMENT TEST FAILURE:', err);
  process.exit(1);
});
