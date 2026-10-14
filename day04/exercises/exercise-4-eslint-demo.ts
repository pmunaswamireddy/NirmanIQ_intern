// Day 4 - Exercise 4: Code Quality Standards
// Author: Penumuru Madhu Sudhan Reddy

interface QualityAudit {
  checkId:string;
  passed:boolean;
  notes?:string;
}

function runAudit(checkId:string,score:number):QualityAudit {
  const passed=score>=80;
  return {
    checkId,
    passed,
    notes:passed?'Audit approved':'Requires rework'
  };
}

try {
  const audit1=runAudit('AUDIT-101',92);
  const audit2=runAudit('AUDIT-102',65);
  console.log('Audit 1:',audit1.checkId,'-',audit1.notes);
  console.log('Audit 2:',audit2.checkId,'-',audit2.notes);
} catch(err) {
  console.error('Audit failed:',err);
}
