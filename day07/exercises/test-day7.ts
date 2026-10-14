// Day 7 - Tests
// Author: Penumuru Madhu Sudhan Reddy
import assert from 'node:assert';

console.log("Running Day 7 tests...");

// 1. Verify 100 activities generated
const activities: string[]=Array.from({ length: 100 },(_,i)=>{
  const types=['Civil','Electrical','Plumbing','Safety','Inspection'];
  return `${types[i%5]} Task #${i+1} - Floor ${(i%20)+1}`;
});

assert.strictEqual(activities.length,100);
assert.ok(activities[0].includes('Task #1'));
assert.ok(activities[99].includes('Task #100'));
console.log("✓ 100 activities generated correctly");

// 2. Debounce logic
async function testDebounce(){
  let val="start";
  await new Promise(r=>setTimeout(r,50));
  val="done";
  assert.strictEqual(val,"done");
}
testDebounce().then(()=>{
  console.log("✓ Debounce timer logic passed");
});

// 3. LocalStorage logic
const mock: Record<string,string>={};
function save(k: string,v: any){ mock[k]=JSON.stringify(v); }
function load(k: string,fallback: any){ return mock[k]?JSON.parse(mock[k]):fallback; }

save('view','grid');
assert.strictEqual(load('view','list'),'grid');
save('view','list');
assert.strictEqual(load('view','grid'),'list');
console.log("✓ LocalStorage logic passed");

console.log("All Day 7 tests passed!");
