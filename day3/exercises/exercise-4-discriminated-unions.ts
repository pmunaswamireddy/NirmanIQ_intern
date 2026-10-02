// Day 3 - Exercise 4: Discriminated Unions for Task States
// Author: Penumuru Madhu Sudhan Reddy

type Task=
  | { status:'pending'; title:string }
  | { status:'in_progress'; title:string; assignee:string }
  | { status:'completed'; title:string; completedAt:Date; reviewer:string };

// check and print task status
function getTaskInfo(task:Task):string {
  switch (task.status) {
    case 'pending':
      return `Pending: ${task.title}`;
    case 'in_progress':
      return `In progress by ${task.assignee}: ${task.title}`;
    case 'completed':
      return `Completed by ${task.reviewer} on ${task.completedAt.toLocaleDateString()}: ${task.title}`;
    default: {
      const _check:never=task;
      return _check;
    }
  }
}

// test cases
const t1:Task={ status:'pending',title:'Fix foundation crack' };
const t2:Task={ status:'in_progress',title:'Install wiring',assignee:'Ravi' };
const t3:Task={ status:'completed',title:'Inspect slab',completedAt:new Date(),reviewer:'Sharma' };

console.log(getTaskInfo(t1));
console.log(getTaskInfo(t2));
console.log(getTaskInfo(t3));
