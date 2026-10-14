// Day 2 - Exercise 2: Fetch with Retry and Exponential Backoff
// Author: Penumuru Madhu Sudhan Reddy

const dns=require('dns');
dns.setDefaultResultOrder('ipv4first'); // prefer ipv4 to avoid windows ipv6 timeouts

// helper to pause execution
function sleep(ms) {
  return new Promise(resolve=>setTimeout(resolve,ms));
}

// retry fetch function with exponential backoff
async function fetchWithRetry(url,maxRetries=3) {
  let delay=500; // start with 500ms

  for (let attempt=1;attempt<=maxRetries;attempt++) {
    try {
      console.log(`Attempt ${attempt}: fetching ${url}`);
      const res=await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data=await res.json();
      console.log(`Success on attempt ${attempt}`);
      return data;
    } catch(err) {
      console.log(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt===maxRetries) {
        throw new Error(`All ${maxRetries} retries failed for ${url}`);
      }
      console.log(`Waiting ${delay}ms before next retry...`);
      await sleep(delay);
      delay=delay*2; // exponential backoff: double the delay each time
    }
  }
}

// test both success and fail
async function test() {
  console.log('--- Test 1: Successful URL ---');
  try {
    const data=await fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1',3);
    console.log('Result title:',data.title);
  } catch(err) {
    console.log('Error:',err.message);
  }

  console.log('\n--- Test 2: Failing URL (retries and stops) ---');
  try {
    await fetchWithRetry('https://jsonplaceholder.typicode.com/posts/999999',3);
  } catch(err) {
    console.log('Final catch:',err.message);
  }
}

test();
