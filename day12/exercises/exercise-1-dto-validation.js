// Day 12 - Exercise 1: DTO Validation Basics
// Demonstrates validating fields before passing to business logic

const ALLOWED_STATUSES = ['PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD'];

function validateCreateProjectDto(input) {
  const errors = [];

  // 1. Validate name
  if (typeof input.name !== 'string' || input.name.trim().length < 3) {
    errors.push('Project name must be a string with at least 3 characters');
  } else if (input.name.trim().length > 100) {
    errors.push('Project name must not exceed 100 characters');
  }

  // 2. Validate status enum
  if (!ALLOWED_STATUSES.includes(input.status)) {
    errors.push(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`);
  }

  // 3. Validate towerCount bounds
  if (typeof input.towerCount !== 'number' || !Number.isInteger(input.towerCount)) {
    errors.push('Tower count must be an integer');
  } else if (input.towerCount < 1 || input.towerCount > 50) {
    errors.push('Tower count must be between 1 and 50');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      name: input.name.trim(),
      status: input.status,
      towerCount: input.towerCount
    } : null
  };
}

console.log('--- EXERCISE 1: DTO INPUT VALIDATION ---');

// Test 1: Valid input
const validSample = { name: '  Apex Tech Park  ', status: 'ACTIVE', towerCount: 5 };
console.log('Valid Input Test:', validateCreateProjectDto(validSample));

// Test 2: Invalid short name and invalid status
const invalidSample = { name: 'AB', status: 'UNKNOWN', towerCount: 99 };
console.log('\nInvalid Input Test:', validateCreateProjectDto(invalidSample));
