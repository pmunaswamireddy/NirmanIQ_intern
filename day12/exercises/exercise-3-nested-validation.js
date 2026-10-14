// Day 12 - Exercise 3: Nested Object Validation
// Simulating @ValidateNested() on Tower -> FloorDto[]

const VALID_FLOOR_STATUSES = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];

function validateTowerWithFloors(towerInput) {
  const errors = [];

  if (!towerInput.name || towerInput.name.length < 2) {
    errors.push('Tower name must be at least 2 characters');
  }

  if (!Array.isArray(towerInput.floors) || towerInput.floors.length === 0) {
    errors.push('Tower must contain an array of at least 1 floor');
  } else {
    towerInput.floors.forEach((floor, idx) => {
      if (!Number.isInteger(floor.floorNumber) || floor.floorNumber < 1) {
        errors.push(`Floor at index ${idx}: floorNumber must be an integer >= 1`);
      }
      if (!VALID_FLOOR_STATUSES.includes(floor.status)) {
        errors.push(`Floor at index ${idx}: invalid status '${floor.status}'. Allowed: ${VALID_FLOOR_STATUSES.join(', ')}`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

console.log('--- EXERCISE 3: NESTED VALIDATION (TOWER -> FLOORS) ---');

// Valid nested structure
const validTower = {
  name: 'Tower Alpha',
  floors: [
    { floorNumber: 1, status: 'COMPLETED' },
    { floorNumber: 2, status: 'IN_PROGRESS' }
  ]
};
console.log('Valid Nested Tower:', validateTowerWithFloors(validTower));

// Invalid nested structure (bad floor status)
const invalidTower = {
  name: 'Tower Beta',
  floors: [
    { floorNumber: 1, status: 'INVALID_STATUS' }
  ]
};
console.log('\nInvalid Nested Tower:', validateTowerWithFloors(invalidTower));
