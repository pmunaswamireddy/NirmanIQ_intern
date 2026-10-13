const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

async function runTests() {
  console.log('--- STARTING DAY 12 DTOs, VALIDATION & ERROR HANDLING TESTS ---');

  // Load compiled main bootstrap
  const { bootstrap } = require('./dist/main.js');
  const app = await bootstrap();
  const baseUrl = { hostname: 'localhost', port: 3012 };

  try {
    // Test 1: Valid project creation
    console.log('Running Test 1: Valid project creation...');
    const res1 = await request({
      ...baseUrl,
      path: '/projects',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: '  Apex Tech Park  ',
      description: 'Modern IT corridor development',
      status: 'ACTIVE',
      towerCount: 6
    });
    assert(res1.status === 201, `Expected status 201, got ${res1.status}`);
    assert(res1.body.name === 'Apex Tech Park', `Name should be trimmed to 'Apex Tech Park', got '${res1.body.name}'`);
    assert(res1.body.towerCount === 6, 'Tower count should be 6');
    console.log('✓ Test 1: Valid project created with trimmed name and validated fields');

    // Test 2: Mass assignment protection (forbidNonWhitelisted)
    console.log('Running Test 2: Mass assignment / non-whitelisted field rejection...');
    const res2 = await request({
      ...baseUrl,
      path: '/projects',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Valid Project Name',
      status: 'PLANNING',
      towerCount: 2,
      extraUnauthorizedField: 'malicious'
    });
    assert(res2.status === 400, `Expected status 400 for non-whitelisted field, got ${res2.status}`);
    assert(res2.body.error === 'Bad Request', 'Should contain Bad Request error label');
    assert(Array.isArray(res2.body.message) && res2.body.message.some(m => m.includes('extraUnauthorizedField')), 'Error should mention non-whitelisted property');
    console.log('✓ Test 2: Non-whitelisted field rejected via forbidNonWhitelisted');

    // Test 3: Name length validation (< 3 chars)
    console.log('Running Test 3: Short name validation (<3 chars)...');
    const res3 = await request({
      ...baseUrl,
      path: '/projects',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'AB',
      status: 'PLANNING',
      towerCount: 5
    });
    assert(res3.status === 400, `Expected 400, got ${res3.status}`);
    assert(JSON.stringify(res3.body.message).includes('at least 3 characters'), 'Should enforce 3 character minimum');
    console.log('✓ Test 3: Short name rejected with descriptive message');

    // Test 4: Enum validation for status
    console.log('Running Test 4: Invalid enum status...');
    const res4 = await request({
      ...baseUrl,
      path: '/projects',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Urban Residency',
      status: 'UNKNOWN_STATUS',
      towerCount: 4
    });
    assert(res4.status === 400, `Expected 400, got ${res4.status}`);
    assert(JSON.stringify(res4.body.message).includes('PLANNING, ACTIVE, COMPLETED, ON_HOLD'), 'Should check allowed status enum');
    console.log('✓ Test 4: Invalid status enum rejected with valid enum choices');

    // Test 5: Tower count upper bound (> 50)
    console.log('Running Test 5: Tower count upper bound (> 50)...');
    const res5 = await request({
      ...baseUrl,
      path: '/projects',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Mega Township',
      status: 'ACTIVE',
      towerCount: 88
    });
    assert(res5.status === 400, `Expected 400, got ${res5.status}`);
    assert(JSON.stringify(res5.body.message).includes('cannot exceed 50'), 'Should enforce max 50 towers');
    console.log('✓ Test 5: Tower count upper bound (> 50) rejected');

    // Test 6: Custom exception filter response structure
    console.log('Running Test 6: Exception response structure { statusCode, message, error, timestamp, path }...');
    const res6 = await request({
      ...baseUrl,
      path: '/projects/non-existent-id-999',
      method: 'GET'
    });
    assert(res6.status === 404, `Expected 404, got ${res6.status}`);
    assert(res6.body.statusCode === 404, 'Response must have statusCode: 404');
    assert(typeof res6.body.message === 'string' && res6.body.message.includes('not found'), 'Response must have descriptive message');
    assert(res6.body.error === 'NotFoundException', 'Response must have error name');
    assert(Boolean(res6.body.timestamp), 'Response must have timestamp');
    assert(res6.body.path === '/projects/non-existent-id-999', 'Response must have path');
    console.log('✓ Test 6: Global Exception Filter returned consistent 5-field schema');

    // Test 7: Nested Tower & Floor validation (Valid)
    console.log('Running Test 7: Nested TowerDto & FloorDto validation (valid)...');
    const res7 = await request({
      ...baseUrl,
      path: '/projects/proj-1/towers',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Tower Beta',
      floors: [
        { floorNumber: 1, status: 'COMPLETED' },
        { floorNumber: 2, status: 'IN_PROGRESS' }
      ]
    });
    assert(res7.status === 201, `Expected 201, got ${res7.status}`);
    assert(res7.body.name === 'Tower Beta', 'Tower name matches');
    assert(res7.body.floors.length === 2, 'Tower should have 2 floors');
    console.log('✓ Test 7: Nested TowerDto and FloorDto created successfully');

    // Test 8: Nested Tower validation failure (Invalid floor status inside nested object)
    console.log('Running Test 8: Nested FloorDto invalid enum status...');
    const res8 = await request({
      ...baseUrl,
      path: '/projects/proj-1/towers',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Tower Gamma',
      floors: [
        { floorNumber: 1, status: 'INVALID_FLOOR_STATUS' }
      ]
    });
    assert(res8.status === 400, `Expected 400 for invalid nested floor, got ${res8.status}`);
    assert(JSON.stringify(res8.body.message).includes('floor status must be NOT_STARTED, IN_PROGRESS, or COMPLETED'), 'Should enforce nested floor status enum');
    console.log('✓ Test 8: Nested validation correctly caught error inside child FloorDto array');

    console.log('\nALL DAY 12 TESTS PASSED SUCCESSFULLY! (8/8 tests clean)\n');
  } finally {
    await app.close();
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
