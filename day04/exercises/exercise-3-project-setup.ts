// Day 4 - Exercise 3: Project Tooling
// Author: Penumuru Madhu Sudhan Reddy

interface TowerSummary {
  name:string;
  floorsCount:number;
  isComplete:boolean;
}

function summarizeTowers(towers:TowerSummary[]):Record<string,number> {
  return {
    total:towers.length,
    completed:towers.filter(t=>t.isComplete).length
  };
}

const list:TowerSummary[]=[
  { name:'Tower A',floorsCount:14,isComplete:true },
  { name:'Tower B',floorsCount:18,isComplete:false }
];
console.log('Tower Summary:',summarizeTowers(list));
