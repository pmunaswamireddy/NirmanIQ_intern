// Day 12 - Exercise 1: DTO Validation Basics
// Author: Penumuru Madhu Sudhan Reddy

const VALID_STATUSES=['PLANNING','ACTIVE','COMPLETED','ON_HOLD'];

function validateCreateProjectDto(dto) {
  const errors=[];

  if (!dto.name||typeof dto.name!=='string'||dto.name.trim().length<3) {
    errors.push('name must be at least 3 characters');
  } else if (dto.name.trim().length>100) {
    errors.push('name must not exceed 100 characters');
  }

  if (!VALID_STATUSES.includes(dto.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (typeof dto.towerCount!=='number'||!Number.isInteger(dto.towerCount)) {
    errors.push('towerCount must be an integer');
  } else if (dto.towerCount<1||dto.towerCount>50) {
    errors.push('towerCount must be between 1 and 50');
  }

  return {
    valid:errors.length===0,
    errors,
    data:errors.length===0?{name:dto.name.trim(),status:dto.status,towerCount:dto.towerCount}:null
  };
}

// test valid and invalid cases
const goodInput={name:'  Apex Tech Park  ',status:'ACTIVE',towerCount:4};
console.log('Valid test:',validateCreateProjectDto(goodInput));

const badInput={name:'AB',status:'UNKNOWN',towerCount:99};
console.log('Invalid test:',validateCreateProjectDto(badInput));
