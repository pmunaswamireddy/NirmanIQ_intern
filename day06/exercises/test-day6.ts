// Day 6 - Tests
// Author: Penumuru Madhu Sudhan Reddy

import assert from 'node:assert';
import type { Task } from './exercise-1-task-list';
import type { Floor,FloorStatus } from './exercise-3-floor-grid';

console.log('Running Day 6 tests...');

// 1. TaskList logic
let tasks:Task[]=[
  { id:1,text:'Task 1',done:false },
  { id:2,text:'Task 2',done:true }
];
// add
tasks=[...tasks,{ id:3,text:'Task 3',done:false }];
assert.strictEqual(tasks.length,3);
// toggle
tasks=tasks.map(t=>t.id===1?{ ...t,done:!t.done }:t);
assert.strictEqual(tasks.find(t=>t.id===1)?.done,true);
// delete
tasks=tasks.filter(t=>t.id!==2);
assert.strictEqual(tasks.length,2);
console.log('✓ TaskList tests passed');

// 2. ProgressBar clamping
function clamp(val:number):number {
  return Math.min(100,Math.max(0,val));
}
assert.strictEqual(clamp(-5),0);
assert.strictEqual(clamp(120),100);
assert.strictEqual(clamp(50),50);
console.log('✓ ProgressBar tests passed');

// 3. FloorGrid logic
const floors:Floor[]=Array.from({ length:20 },(_,i)=>({
  floorNumber:i+1,
  status:i<5?'completed':'not-started'
}));
const done=floors.filter(f=>f.status==='completed').length;
assert.strictEqual(done,5);
console.log('✓ FloorGrid tests passed');

console.log('All tests passed!');
