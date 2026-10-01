// Day 2 - Exercise 3: Async Task Queue with Concurrency Limit 3
// Author: Penumuru Madhu Sudhan Reddy
// Simulates NirmanIQ site video processing

function sleep(ms) {
  return new Promise(resolve=>setTimeout(resolve,ms));
}

// simulated video task
async function processVideo(videoName) {
  console.log(`[START] processing ${videoName}`);
  await sleep(600); // simulate 600ms work
  console.log(`[DONE]  finished ${videoName}`);
  return `${videoName} processed`;
}

// simple worker pool: 3 workers processing tasks in parallel
async function processQueue(tasks,limit=3) {
  const results=[];
  let index=0;

  async function worker() {
    while (index<tasks.length) {
      const current=index++;
      results[current]=await processVideo(tasks[current]);
    }
  }

  // start up to limit workers
  const workers=[];
  for (let i=0;i<limit;i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}

async function run() {
  const siteVideos=[
    'towerA_floor1.mp4',
    'towerA_floor2.mp4',
    'towerA_floor3.mp4',
    'towerA_floor4.mp4',
    'towerA_floor5.mp4',
    'towerB_floor1.mp4',
    'towerB_floor2.mp4',
    'towerB_floor3.mp4',
    'towerB_floor4.mp4'
  ];

  console.log(`Total videos: ${siteVideos.length} | Concurrency limit: 3\n`);
  const t0=Date.now();

  const finished=await processQueue(siteVideos,3);

  console.log(`\nAll done in ${Date.now()-t0}ms!`);
  console.log('Results summary:');
  console.log(finished);
}

run();
