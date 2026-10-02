// Day 3 - Exercise 3: Type-safe Generic Map
// Author: Penumuru Madhu Sudhan Reddy

class SafeMap {
  private data=new Map<string,unknown>();

  set<T>(key:string,value:T):void {
    this.data.set(key,value);
  }

  get<T>(key:string):T | undefined {
    return this.data.get(key) as T | undefined;
  }

  has(key:string):boolean {
    return this.data.has(key);
  }
}

// test
const cache=new SafeMap();

cache.set<string>('projectName','NirmanIQ Site 1');
cache.set<number>('activeWorkers',24);
cache.set<string[]>('tags',['concrete','phase-1']);

console.log('Project:',cache.get<string>('projectName'));
console.log('Workers:',cache.get<number>('activeWorkers'));
console.log('Tags:',cache.get<string[]>('tags'));
