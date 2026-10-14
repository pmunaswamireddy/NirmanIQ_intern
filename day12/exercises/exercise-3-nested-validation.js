// Day 12 - Exercise 3: Nested Validation (Tower and Floors)
// Author: Penumuru Madhu Sudhan Reddy

const ALLOWED_FLOOR_STATUS=['NOT_STARTED','IN_PROGRESS','COMPLETED'];

function validateTowerPayload(payload) {
  const errors=[];

  if (!payload.name||payload.name.trim().length<2) {
    errors.push('name must be at least 2 characters');
  }

  if (!Array.isArray(payload.floors)||payload.floors.length===0) {
    errors.push('floors must be a non-empty array');
  } else {
    payload.floors.forEach((f,i)=>{
      if (typeof f.floorNumber!=='number'||f.floorNumber<1) {
        errors.push(`floor[${i}].floorNumber must be >= 1`);
      }
      if (!ALLOWED_FLOOR_STATUS.includes(f.status)) {
        errors.push(`floor[${i}].status must be one of: ${ALLOWED_FLOOR_STATUS.join(', ')}`);
      }
    });
  }

  return {valid:errors.length===0,errors};
}

const validSample={
  name:'Tower Alpha',
  floors:[{floorNumber:1,status:'COMPLETED'},{floorNumber:2,status:'IN_PROGRESS'}]
};
console.log('Valid sample test:',validateTowerPayload(validSample));

const invalidSample={
  name:'Tower Beta',
  floors:[{floorNumber:0,status:'PENDING'}]
};
console.log('Invalid sample test:',validateTowerPayload(invalidSample));
