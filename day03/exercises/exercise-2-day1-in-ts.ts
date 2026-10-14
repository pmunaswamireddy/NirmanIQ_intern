// Day 3 - Exercise 2: Day 1 JS Functions in Strict TypeScript
// Author: Penumuru Madhu Sudhan Reddy

// 1. fibonacci
function fibonacci(n:number):number[] {
  if (n<=0) return [];
  if (n===1) return [0];
  const res:number[]=[0,1];
  for (let i=2;i<n;i++) res.push(res[i-1]+res[i-2]);
  return res;
}

// 2. palindrome
function isPalindrome(str:string):boolean {
  const clean=str.toLowerCase().replace(/[^a-z0-9]/g,'');
  return clean===clean.split('').reverse().join('');
}

// 3. rotate array
function rotateArray<T>(arr:T[],k:number):T[] {
  if (!arr.length) return [];
  const shift=((k%arr.length)+arr.length)%arr.length;
  return [...arr.slice(arr.length-shift),...arr.slice(0,arr.length-shift)];
}

// 4. group by
function groupBy<T>(arr:T[],key:keyof T):Record<string,T[]> {
  const map:Record<string,T[]>={};
  for (const item of arr) {
    const k=String(item[key]);
    if (!map[k]) map[k]=[];
    map[k].push(item);
  }
  return map;
}

// 5. flatten array (banned any, using unknown)
function flattenArray(arr:unknown[]):unknown[] {
  const res:unknown[]=[];
  for (const x of arr) {
    if (Array.isArray(x)) res.push(...flattenArray(x));
    else res.push(x);
  }
  return res;
}

console.log('Fib(5):',fibonacci(5));
console.log('Palindrome:',isPalindrome('radar'));
console.log('Rotate:',rotateArray([1,2,3,4,5],2));
console.log('Group:',groupBy([{ id:1,role:'dev' },{ id:2,role:'dev' }],'role'));
console.log('Flatten:',flattenArray([1,[2,[3,4]]]));
