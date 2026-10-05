// Day 6 - App Demo Component
// Author: Penumuru Madhu Sudhan Reddy

import React,{ useState } from 'react';
import { TaskList } from './exercise-1-task-list';
import { ProgressBar } from './exercise-2-progress-bar';
import { FloorGrid } from './exercise-3-floor-grid';

export function App() {
  const [progress,setProgress]=useState(65);

  return (
    <div style={{ maxWidth:900,margin:'16px auto',padding:'0 14px',fontFamily:'Arial,sans-serif' }}>
      <h2 style={{ textAlign:'center',marginBottom:16 }}>Day 6 - React Core Concepts</h2>
      
      <div style={{ background:'#fff',border:'1px solid #ddd',padding:10,borderRadius:6,marginBottom:14 }}>
        <label style={{ display:'flex',alignItems:'center',gap:10,fontSize:13 }}>
          <span>Adjust Progress:</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e=>setProgress(Number(e.target.value))}
            style={{ flex:1 }}
          />
          <strong>{progress}%</strong>
        </label>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:14 }}>
        <TaskList />
        <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
          <ProgressBar
            percentage={progress}
            riskLevel={progress<25?'critical':progress<50?'high-risk':progress<70?'at-risk':'on-track'}
            label="Tower Milestone"
          />
          <FloorGrid />
        </div>
      </div>
    </div>
  );
}
export default App;
