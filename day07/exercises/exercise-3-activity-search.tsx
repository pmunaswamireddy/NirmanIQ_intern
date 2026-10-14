// Day 7 - Exercise 3: useDebounce and Search
// Author: Penumuru Madhu Sudhan Reddy
import React,{ useState,useEffect } from 'react';

export function useDebounce<T>(value: T,delay: number): T {
  const [debounced,setDebounced]=useState<T>(value);

  useEffect(()=>{
    const timer=setTimeout(()=>setDebounced(value),delay);
    return ()=>clearTimeout(timer);
  },[value,delay]);

  return debounced;
}

export const activities: string[]=Array.from({ length: 100 },(_,i)=>{
  const types=['Civil','Electrical','Plumbing','Safety','Inspection'];
  return `${types[i%5]} Task #${i+1} - Floor ${(i%20)+1}`;
});

export function ActivitySearch(){
  const [search,setSearch]=useState("");
  const debouncedSearch=useDebounce(search,300);

  const filtered=activities.filter(a => 
    a.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '450px' }}>
      <h3>Search 100 Site Activities</h3>
      <input
        type="text"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder="Type to search tasks..."
        style={{ width: '100%',padding: '8px',boxSizing: 'border-box',marginBottom: '8px' }}
      />
      <p style={{ fontSize: '12px',color: '#666' }}>Showing {filtered.length} of {activities.length} tasks</p>
      <ul style={{ maxHeight: '200px',overflowY: 'auto',border: '1px solid #ddd',padding: '10px 20px' }}>
        {filtered.map((item,i)=>(
          <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
