// Day 1 - Exercise 2: Destructuring Practice
// Author: Penumuru Madhu Sudhan Reddy

const fs=require('fs');
const path=require('path');

// load json file
const project=JSON.parse(fs.readFileSync(path.join(__dirname,'sample-project-data.json'),'utf8'));

// 1. Basic object destructuring and default values
const {name,city,budget,client='Sobha'}=project;
console.log('Project:',name);
console.log('City:',city);
console.log('Budget:',budget);
console.log('Client (default):',client);

// 2. Renaming variables while destructuring
const {name:projectName,city:location}=project;
console.log('\nRenamed vars:',projectName,'located in',location);

// 3. Array destructuring (first tower and second tower)
const [towerA,towerB]=project.towers;
console.log('\nFirst tower:',towerA.name,'with',towerA.floors,'floors');
console.log('Second tower:',towerB.name,'engineer:',towerB.engineer);

// 4. Nested destructuring to get rooms of first unit in Tower A
const [firstUnit]=towerA.units;
const {unitNo,rooms}=firstUnit;
console.log(`\nRooms in unit ${unitNo}:`);
rooms.forEach(({name,status})=>{
  console.log(`- ${name}: ${status}`);
});

// 5. Destructuring in function parameters
function printTowerInfo({name,floors,engineer}) {
  console.log(`Tower: ${name}, Total floors: ${floors}, Lead: ${engineer}`);
}
console.log('\nCalling function with destructured params:');
printTowerInfo(towerA);
printTowerInfo(towerB);

// 6. Swapping variables
let eng1='Vikram';
let eng2='Kiran';
console.log('\nBefore swap:',eng1,eng2);
[eng1,eng2]=[eng2,eng1];
console.log('After swap:',eng1,eng2);
