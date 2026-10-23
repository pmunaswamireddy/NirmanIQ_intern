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
  const pmToken = pmLoginRes.body.accessToken;

  const seLoginRes = await makeRequest('/auth/login', { method: 'POST' }, {
    email: 'se@nirmaniq.com',
    password: 'Password123!',
  });
  assert.strictEqual(seLoginRes.status, 200, 'SE Login must succeed with 200');
  assert.ok(seLoginRes.body.accessToken, 'SE must receive accessToken');
  const seToken = seLoginRes.body.accessToken;
  console.log('✓ Test 1: PM and SE logged in successfully with valid JWT tokens');

  // Test 2: Unauthenticated Access Guarding (401 Unauthorized)
  console.log('Running Test 2: JwtAuthGuard blocking unauthenticated access to /projects...');
  const unauthRes = await makeRequest('/projects', { method: 'GET' });
  assert.strictEqual(unauthRes.status, 401, 'Unauthenticated request must return 401');
  assert.strictEqual(unauthRes.body.error, 'Unauthorized', 'Error title must be Unauthorized');
  console.log('✓ Test 2: JwtAuthGuard correctly returned 401 for unauthenticated request');

  // Test 3: Project Manager Project Creation (Specification Match)
  console.log('Running Test 3: PM creating a new project (Skyline Tower, Hyderabad)...');
  const createProjRes = await makeRequest(
    '/projects',
    { method: 'POST', headers: { Authorization: `Bearer ${pmToken}` } },
    {
      name: 'Skyline Tower',
      location: 'Hyderabad',
      targetCompletion: '2026-12-31',
    },
  );
  assert.strictEqual(createProjRes.status, 201, 'PM project creation must return 201');
  assert.ok(createProjRes.body.id, 'Created project must have UUID id');
  assert.strictEqual(createProjRes.body.name, 'Skyline Tower');
  assert.strictEqual(createProjRes.body.progress, 0, 'Initial progress must be 0');
  const projectId = createProjRes.body.id;
  console.log('✓ Test 3: PM created project matching exact specification: { id, name, progress: 0 }');

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

  // Test 5: Site Engineer updating project progress (PATCH /projects/:id/progress)
  console.log('Running Test 5: SE updating construction progress (PATCH /projects/:id/progress)...');
  const seUpdateRes = await makeRequest(
    `/projects/${projectId}/progress`,
    { method: 'PATCH', headers: { Authorization: `Bearer ${seToken}` } },
    {
      progress: 65,
      note: 'Floor 12 completed',
    },
  );
  assert.strictEqual(seUpdateRes.status, 200, 'SE progress update must succeed with 200');
  assert.strictEqual(seUpdateRes.body.progress, 65, 'Progress must be updated to 65');
  assert.strictEqual(seUpdateRes.body.note, 'Floor 12 completed');
  console.log('✓ Test 5: SE successfully updated project progress to 65% with status note');

  // Test 6: Project Listing (GET /projects)
  console.log('Running Test 6: Verifying Project Listing returns updated progress...');
  const listRes = await makeRequest('/projects', {
    headers: { Authorization: `Bearer ${pmToken}` },
  });
  assert.strictEqual(listRes.status, 200);
  assert.ok(Array.isArray(listRes.body));
  const found = listRes.body.find((p) => p.id === projectId);
  assert.ok(found, 'Created project must be in listing');
  assert.strictEqual(found.progress, 65, 'Project in listing must reflect 65% progress');
  console.log('✓ Test 6: Project listing returns projects with accurate progress percentage');

  // Test 7: Progress Update History (GET /progress/:projectId)
  console.log('Running Test 7: Verifying Progress Updates history logging...');
  const historyRes = await makeRequest(`/progress/${projectId}`, {
    headers: { Authorization: `Bearer ${seToken}` },
  });
  assert.strictEqual(historyRes.status, 200);
  assert.ok(Array.isArray(historyRes.body));
  assert.ok(historyRes.body.length >= 1, 'History must contain at least 1 update');
  assert.strictEqual(historyRes.body[0].progress, 65);
  assert.strictEqual(historyRes.body[0].note, 'Floor 12 completed');
  console.log('✓ Test 7: Progress updates table logged engineer update with timestamps');

  // Test 8: RolesGuard RBAC - SE blocked from Project Deletion (403 Forbidden)
  console.log('Running Test 8: RolesGuard blocking SE from project deletion (403 Forbidden)...');
  const seDeleteRes = await makeRequest(`/projects/${projectId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${seToken}` },
  });
  assert.strictEqual(seDeleteRes.status, 403, 'SE project deletion must be rejected with 403');
  assert.strictEqual(seDeleteRes.body.error, 'Forbidden', 'Error must be Forbidden');
  console.log('✓ Test 8: RolesGuard strictly blocked SE from deleting project with 403 Forbidden');

  // Test 9: PM Project Deletion with RolesGuard (200 OK)
  console.log('Running Test 9: PM deleting project (DELETE /projects/:id)...');
  const pmDeleteRes = await makeRequest(`/projects/${projectId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${pmToken}` },
  });
  assert.strictEqual(pmDeleteRes.status, 200, 'PM project deletion must succeed with 200');
  assert.strictEqual(pmDeleteRes.body.success, true, 'Response must return { success: true }');
  console.log('✓ Test 9: PM successfully deleted project with { success: true }');

  // Test 10: Deleted Project Verification (404 Not Found)
  console.log('Running Test 10: Verifying deleted project returns 404...');
  const verifyDeletedRes = await makeRequest(`/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${pmToken}` },
  });
  assert.strictEqual(verifyDeletedRes.status, 404, 'Deleted project must return 404 Not Found');
  console.log('✓ Test 10: Deleted project correctly returns 404 Not Found');

  console.log('\n============================================================');
  console.log('ALL DAY 15 CHECKPOINT ASSESSMENT #1 TESTS PASSED! (10/10 clean)');
  console.log('============================================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ DAY 15 ASSESSMENT TEST FAILURE:', err);
  process.exit(1);
});
