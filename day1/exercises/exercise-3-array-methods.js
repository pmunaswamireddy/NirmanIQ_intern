// Day 1 - Exercise 3: Array Methods on 50 Construction Tasks
// Author: Penumuru Madhu Sudhan Reddy
// Rule: No for-loops or while-loops allowed!

const trades=['Structural','MEP','Finishing','Safety','Masonry'];
const statuses=['completed','in-progress','pending','delayed'];

// Generate 50 tasks using map instead of a loop
const tasks=Array.from({length:50},(_,i)=>{
  return {
    id:i+1,
    title:'Construction Task '+(i+1),
    floor:(i%10)+1,
    trade:trades[i%trades.length],
    status:statuses[i%statuses.length],
    progress:(i*2)%101,
    cost:10000+(i*2000)
  };
});

console.log(`Created ${tasks.length} tasks without using any loops.\n`);

// 1. .map() - transform tasks into a simple summary string
const summaryList=tasks.slice(0,3).map(t=>{
  return `Task #${t.id}: ${t.title} [Floor ${t.floor}] - ${t.status}`;
});
console.log('--- 1. map() (sample of 3) ---');
console.log(summaryList);

// 2. .filter() - get only delayed tasks
const delayedTasks=tasks.filter(t=>t.status==='delayed');
console.log('\n--- 2. filter() ---');
console.log(`Found ${delayedTasks.length} delayed tasks`);
console.log('First delayed task:',delayedTasks[0]);

// 3. .reduce() - calculate total project cost
const totalCost=tasks.reduce((sum,t)=>sum+t.cost,0);
console.log('\n--- 3. reduce() ---');
console.log('Total cost of all 50 tasks:',totalCost);

// Count tasks by status using reduce
const statusSummary=tasks.reduce((acc,t)=>{
  acc[t.status]=(acc[t.status]||0)+1;
  return acc;
},{});
console.log('Task count by status:',statusSummary);

// 4. .find() - find the first safety task
const firstSafetyTask=tasks.find(t=>t.trade==='Safety');
console.log('\n--- 4. find() ---');
console.log('First safety task:',firstSafetyTask);

// 5. .some() - check if there are any delayed safety tasks
const hasDelayedSafety=tasks.some(t=>t.trade==='Safety'&&t.status==='delayed');
console.log('\n--- 5. some() ---');
console.log('Are there any delayed safety tasks?:',hasDelayedSafety);

// 6. .every() - check if all tasks have a valid floor number (1 to 10)
const allValidFloors=tasks.every(t=>t.floor>=1&&t.floor<=10);
console.log('\n--- 6. every() ---');
console.log('Are all floors between 1 and 10?:',allValidFloors);
