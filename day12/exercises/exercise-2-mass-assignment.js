// Day 12 - Exercise 2: Mass Assignment Protection
// Demonstrates whitelist: true and forbidNonWhitelisted: true

const ALLOWED_DTO_KEYS = ['name', 'description', 'status', 'towerCount'];

function processPayload(payload, { whitelist = true, forbidNonWhitelisted = true }) {
  const payloadKeys = Object.keys(payload);
  const forbiddenKeys = payloadKeys.filter(k => !ALLOWED_DTO_KEYS.includes(k));

  if (forbidNonWhitelisted && forbiddenKeys.length > 0) {
    return {
      status: 400,
      error: 'Bad Request',
      message: forbiddenKeys.map(k => `property ${k} should not exist`)
    };
  }

  if (whitelist) {
    const cleanObject = {};
    for (const key of ALLOWED_DTO_KEYS) {
      if (payload[key] !== undefined) {
        cleanObject[key] = payload[key];
      }
    }
    return { status: 200, data: cleanObject };
  }

  return { status: 200, data: payload };
}

console.log('--- EXERCISE 2: MASS ASSIGNMENT PROTECTION ---');

// Case 1: Attack payload trying to inject admin privileges
const maliciousPayload = {
  name: 'Riverfront Residency',
  status: 'PLANNING',
  towerCount: 3,
  role: 'SUPERADMIN',
  isAdmin: true
};

console.log('Testing Malicious Payload with forbidNonWhitelisted: true');
console.log(processPayload(maliciousPayload, { whitelist: true, forbidNonWhitelisted: true }));

// Case 2: Clean valid payload
const safePayload = {
  name: 'Riverfront Residency',
  status: 'PLANNING',
  towerCount: 3
};
console.log('\nTesting Safe Payload:');
console.log(processPayload(safePayload, { whitelist: true, forbidNonWhitelisted: true }));
