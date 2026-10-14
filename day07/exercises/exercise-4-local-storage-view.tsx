// Day 7 - Exercise 4: useLocalStorage and View Switcher
// Author: Penumuru Madhu Sudhan Reddy
import React,{ useState } from 'react';

export function useLocalStorage<T>(key: string,initialValue: T): [T,(val: T)=>void] {
  const [stored,setStored]=useState<T>(()=>{
    try {
      const item=window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }catch{
      return initialValue;
    }
  });

  const setValue=(val: T)=>{
    setStored(val);
    try {
      window.localStorage.setItem(key,JSON.stringify(val));
    }catch{}
  };

  return [stored,setValue];
}

const zones=["Basement Parking","Floor 1-5 Core","Floor 6-10 Shell","Roof Top Garden"];

export function LocalStorageView(){
  const [view,setView]=useLocalStorage<'grid'|'list'>('site_view','grid');

  return (
    <div style={{ maxWidth: '450px' }}>
      <h3>Site Zone View (Saved to LocalStorage)</h3>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={()=>setView('grid')} style={{ marginRight: '8px',fontWeight: view==='grid'?'bold':'normal' }}>
          Grid View
        </button>
        <button onClick={()=>setView('list')} style={{ fontWeight: view==='list'?'bold':'normal' }}>
          List View
        </button>
      </div>

      {view==='grid' ? (
        <div style={{ display: 'grid',gridTemplateColumns: '1fr 1fr',gap: '8px' }}>
          {zones.map((z,i)=>(
            <div key={i} style={{ border: '1px solid #ddd',padding: '12px',borderRadius: '4px',background: '#f9f9f9' }}>
              <strong>{z}</strong>
            </div>
          ))}
        </div>
      ) : (
        <ul style={{ border: '1px solid #ddd',padding: '10px 20px',borderRadius: '4px' }}>
          {zones.map((z,i)=>(
            <li key={i} style={{ padding: '4px 0' }}>{z}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
