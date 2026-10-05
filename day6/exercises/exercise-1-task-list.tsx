// Day 6 - Exercise 1: TaskList Component
// Author: Penumuru Madhu Sudhan Reddy

import React,{ useState } from 'react';

export interface Task {
  id:number;
  text:string;
  done:boolean;
}

export function TaskList() {
  const [tasks,setTasks]=useState<Task[]>([
    { id:1,text:'Inspect rebar',done:true },
    { id:2,text:'Pour concrete slab',done:false },
    { id:3,text:'Check safety railing',done:false }
  ]);
  const [text,setText]=useState('');
  const [filter,setFilter]=useState<'all' | 'active' | 'completed'>('all');

  function addTask(e:React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks,{ id:Date.now(),text:text.trim(),done:false }]);
    setText('');
  }

  function toggleTask(id:number) {
    setTasks(tasks.map(t=>t.id===id?{ ...t,done:!t.done }:t));
  }

  function deleteTask(id:number) {
    setTasks(tasks.filter(t=>t.id!==id));
  }

  const visible=tasks.filter(t=>{
    if (filter==='active') return !t.done;
    if (filter==='completed') return t.done;
    return true;
  });

  return (
    <div style={{ background:'#fff',border:'1px solid #ddd',padding:14,borderRadius:6 }}>
      <h3>Task List</h3>
      <form onSubmit={addTask} style={{ display:'flex',gap:8,marginBottom:10 }}>
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="New task..."
          style={{ flex:1,padding:6 }}
        />
        <button type="submit" style={{ padding:'6px 12px' }}>Add</button>
      </form>
      <div style={{ display:'flex',gap:6,marginBottom:10 }}>
        <button onClick={()=>setFilter('all')}>All</button>
        <button onClick={()=>setFilter('active')}>Active</button>
        <button onClick={()=>setFilter('completed')}>Completed</button>
      </div>
      <ul style={{ listStyle:'none',padding:0,margin:0 }}>
        {visible.map(t=>(
          <li key={t.id} style={{ display:'flex',justifyContent:'space-between',padding:'6px 0' }}>
            <label style={{ cursor:'pointer' }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={()=>toggleTask(t.id)}
              />
              <span style={{ marginLeft:8,textDecoration:t.done?'line-through':'none' }}>
                {t.text}
              </span>
            </label>
            <button onClick={()=>deleteTask(t.id)} style={{ color:'red',border:'none',background:'none' }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TaskList;
