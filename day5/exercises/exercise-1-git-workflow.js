// Day 5 - Exercise 1: Git Workflow
// Author: Penumuru Madhu Sudhan Reddy

const { execSync }=require('child_process');
const fs=require('fs');
const path=require('path');

const testDir=path.join(__dirname,'test-repo');
function git(cmd) {
  return execSync(cmd,{ cwd:testDir,encoding:'utf-8',stdio:['pipe','pipe','ignore'] }).trim();
}
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir,{ recursive:true,force:true });
}
fs.mkdirSync(testDir);

// 1. initialize repo
git('git init -b main');
git('git config user.name "pmunaswamireddy"');
git('git config user.email "pmrpmunaswamireddy@gmail.com"');
const file=path.join(testDir,'status.txt');
fs.writeFileSync(file,"Tower A: Foundation\nTower B: Excavation\n");
git('git add .');
git('git commit -m "feat: initial tower status"');
console.log("1. Created main branch with initial commit");

// 2. create feature branch
git('git checkout -b feat/tower-updates');
fs.writeFileSync(file,"Tower A: Superstructure\nTower B: Excavation\n");
git('git commit -am "feat: update Tower A"');
console.log("2. Created feature branch feat/tower-updates");

// 3. create change on main (causes conflict)
git('git checkout main');
fs.writeFileSync(file,"Tower A: Structural Audit\nTower B: Excavation\n");
git('git commit -am "fix: audit on Tower A"');
console.log("3. Created concurrent change on main");

// 4. merge and resolve conflict
try {
  git('git merge feat/tower-updates');
} catch(e) {
  console.log("4. Merge conflict detected as expected!");
}
fs.writeFileSync(file,"Tower A: Structural Audit & Superstructure\nTower B: Excavation\n");
git('git add status.txt');
git('git commit -m "merge: resolve tower status conflict"');
console.log("5. Resolved conflict and committed merge");

// 5. squash demonstration
git('git checkout -b chore/notes');
fs.appendFileSync(file,"Note 1\n");
git('git commit -am "docs: note 1"');
fs.appendFileSync(file,"Note 2\n");
git('git commit -am "docs: note 2"');
git('git reset --soft HEAD~2');
git('git commit -m "docs: add verification notes"');
console.log("6. Squashed micro-commits into one commit");

console.log("Git Log:");
console.log(git('git log --oneline -n 4'));
fs.rmSync(testDir,{ recursive:true,force:true });
