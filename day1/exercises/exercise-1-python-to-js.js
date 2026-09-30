// Day 1 - Exercise 1: Rewrite 5 Python functions in JS
// Author: Penumuru Madhu Sudhan Reddy

// ==========================================
// 1. Fibonacci
// ==========================================
// Python version:
// def fibonacci(n):
//   if n<=0: return []
//   if n==1: return [0]
//   res=[0,1]
//   for i in range(2,n):
//     res.append(res[i-1]+res[i-2])
//   return res

function fibonacci(n) {
  if (n<=0) return [];
  if (n===1) return [0];

  const result=[0,1];
  for (let i=2;i<n;i++) {
    result.push(result[i-1]+result[i-2]);
  }
  return result;
}

// ==========================================
// 2. Palindrome Check
// ==========================================
// Python version:
// def is_palindrome(s):
//   clean=""
//   for ch in str(s).lower():
//     if ch.isalnum():
//       clean+=ch
//   return clean==clean[::-1]

function isPalindrome(str) {
  const clean=String(str).toLowerCase().replace(/[^a-z0-9]/g,'');
  const reversed=clean.split('').reverse().join('');
  return clean===reversed;
}

// ==========================================
// 3. Rotate Array
// ==========================================
// Python version:
// def rotate_array(arr,k):
//   if not arr: return []
//   k=k%len(arr)
//   return arr[-k:]+arr[:-k] if k!=0 else arr

function rotateArray(arr,k) {
  if (!arr || arr.length===0) return [];

  const len=arr.length;
  let step=k%len;
  if (step<0) step=step+len;
  if (step===0) return arr;

  return arr.slice(-step).concat(arr.slice(0,len-step));
}

// ==========================================
// 4. Object Grouping (Group By)
// ==========================================
// Python version:
// def group_by(arr,key):
//   res={}
//   for item in arr:
//     val=item.get(key,'unknown')
//     if val not in res:
//       res[val]=[]
//     res[val].append(item)
//   return res

function groupBy(arr,key) {
  return arr.reduce((acc,item)=>{
    const val=item[key];
    if (!acc[val]) acc[val]=[];
    acc[val].push(item);
    return acc;
  },{});
}

// ==========================================
// 5. Flatten Nested Arrays
// ==========================================
// Python version:
// def flatten_array(arr):
//   res=[]
//   for item in arr:
//     if isinstance(item,list):
//       res.extend(flatten_array(item))
//     else:
//       res.append(item)
//   return res

function flattenArray(arr) {
  let result=[];
  for (let i=0;i<arr.length;i++) {
    if (Array.isArray(arr[i])) {
      result=result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// Tests
console.log('Fibonacci (5):',fibonacci(5));
console.log('Palindrome "racecar":',isPalindrome('racecar'));
console.log('Palindrome "hello":',isPalindrome('hello'));

const sample=[1,2,3,4,5];
console.log('Rotate [1,2,3,4,5] by 2:',rotateArray(sample,2));

const tasks=[
  {task:'Excavation',tower:'A'},
  {task:'Piling',tower:'A'},
  {task:'Slab',tower:'B'}
];
console.log('Group by tower:',groupBy(tasks,'tower'));

const nested=[1,[2,3],[[4],5]];
console.log('Flatten [1,[2,3],[[4],5]]:',flattenArray(nested));
