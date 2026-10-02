// Day 3 - Exercise 1: Construction Project Data Models
// Author: Penumuru Madhu Sudhan Reddy

interface ProgressEntry {
  id:string;
  percentage:number;
  date:Date;
  note?:string;
}

interface Room {
  roomNo:string;
  type:'bedroom' | 'hall' | 'kitchen';
}

interface Floor {
  floorNo:number;
  rooms:Room[];
  progress:ProgressEntry[];
}

interface Tower {
  id:string;
  name:string;
  floors:Floor[];
}

interface Project {
  id:string;
  name:string;
  city:string;
  towers:Tower[];
}

// count total rooms in project
function countRooms(project:Project):number {
  let total=0;
  for (const t of project.towers) {
    for (const f of t.floors) {
      total+=f.rooms.length;
    }
  }
  return total;
}

// sample data
const project:Project={
  id:'PRJ-01',
  name:'Nirman Heights',
  city:'Bangalore',
  towers:[
    {
      id:'T1',
      name:'Tower A',
      floors:[
        {
          floorNo:1,
          rooms:[{ roomNo:'101',type:'hall' },{ roomNo:'102',type:'bedroom' }],
          progress:[{ id:'P1',percentage:100,date:new Date() }]
        }
      ]
    }
  ]
};

console.log('Project:',project.name);
console.log('Total rooms:',countRooms(project));
