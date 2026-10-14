// Day 6 - Exercise 3: FloorGrid Component
// Author: Penumuru Madhu Sudhan Reddy

import React,{ useState } from 'react';

export type FloorStatus='not-started' | 'in-progress' | 'completed';

export interface Floor {
  floorNumber:number;
  status:FloorStatus;
}

export function FloorGrid() {
  const initialFloors:Floor[]=Array.from({ length:20 },(_,i)=>({
    floorNumber:i+1,
    status:i<8?'completed':i<14?'in-progress':'not-started'
  }));

  const [floors,setFloors]=useState<Floor[]>(initialFloors);

  function toggleFloor(floorNumber:number) {
    setFloors(floors.map(f=>{
      if (f.floorNumber!==floorNumber) return f;
      if (f.status==='not-started') return { ...f,status:'in-progress' };
      if (f.status==='in-progress') return { ...f,status:'completed' };
      return { ...f,status:'not-started' };
    }));
  }

  const done=floors.filter(f=>f.status==='completed').length;
  const active=floors.filter(f=>f.status==='in-progress').length;
  const pending=floors.filter(f=>f.status==='not-started').length;

  function getColor(status:FloorStatus) {
    if (status==='completed') return '#dcfce7';
    if (status==='in-progress') return '#fef3c7';
    return '#f1f5f9';
  }

  return (
    <div style={{ background:'#fff',border:'1px solid #ddd',padding:14,borderRadius:6 }}>
      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:10 }}>
        <strong>Tower Floor Grid (5x4)</strong>
        <span style={{ fontSize:12,color:'#555' }}>Click cell to toggle</span>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(5, 1fr)',gap:6,marginBottom:10 }}>
        {floors.map(f=>(
          <button
            key={f.floorNumber}
            onClick={()=>toggleFloor(f.floorNumber)}
            style={{
              background:getColor(f.status),
              border:'1px solid #ccc',
              padding:'8px 4px',
              borderRadius:4,
              fontSize:11,
              fontWeight:'bold',
              cursor:'pointer'
            }}
          >
            F{f.floorNumber}
          </button>
        ))}
      </div>
      <div style={{ display:'flex',justifyContent:'space-between',fontSize:12,color:'#444' }}>
        <span>Done: {done}</span>
        <span>Active: {active}</span>
        <span>Pending: {pending}</span>
      </div>
    </div>
  );
}
export default FloorGrid;
