// Day 2 - Exercise 1: Fetch 3 APIs in Parallel
// Author: Penumuru Madhu Sudhan Reddy

const fs=require('fs');
const path=require('path');
const dns=require('dns');

// prefer ipv4 to avoid windows ipv6 connection timeouts
dns.setDefaultResultOrder('ipv4first');

async function fetchThreeApis() {
  const url1='https://jsonplaceholder.typicode.com/users/1';
  const url2='https://jsonplaceholder.typicode.com/todos/1';
  const url3='https://jsonplaceholder.typicode.com/posts/1';

  console.log('Fetching 3 APIs in parallel...');

  try {
    // start all 3 requests at the same time with Promise.all
    const [res1,res2,res3]=await Promise.all([
      fetch(url1),
      fetch(url2),
      fetch(url3)
    ]);

    const user=await res1.json();
    const todo=await res2.json();
    const post=await res3.json();

    // combine into one clean object
    const mergedData={
      user: user.name,
      email: user.email,
      task: todo.title,
      taskCompleted: todo.completed,
      recentPost: post.title
    };

    // save to json file
    const filePath=path.join(__dirname,'merged-api-data.json');
    fs.writeFileSync(filePath,JSON.stringify(mergedData,null,2));

    console.log('Data saved successfully to merged-api-data.json:');
    console.log(mergedData);
  } catch(err) {
    console.log('Error fetching APIs:',err.message);
  }
}

fetchThreeApis();
