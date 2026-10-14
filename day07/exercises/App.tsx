// Day 7 - App Component
// Author: Penumuru Madhu Sudhan Reddy
import React,{ useState } from 'react';
import { ProjectDashboard } from './exercise-2-project-dashboard';
import { ActivitySearch } from './exercise-3-activity-search';
import { LocalStorageView } from './exercise-4-local-storage-view';

export function App(){
  const [tab,setTab]=useState<'dashboard'|'search'|'view'>('dashboard');

  return (
    <div style={{ padding: '20px',fontFamily: 'Arial,sans-serif' }}>
      <h2>BuildTrack - Day 7 Hooks Demo</h2>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={()=>setTab('dashboard')} style={{ marginRight: '6px' }}>Dashboard (useFetch)</button>
        <button onClick={()=>setTab('search')} style={{ marginRight: '6px' }}>Search (useDebounce)</button>
        <button onClick={()=>setTab('view')}>View Switcher (useLocalStorage)</button>
      </div>

      {tab==='dashboard' && <ProjectDashboard />}
      {tab==='search' && <ActivitySearch />}
      {tab==='view' && <LocalStorageView />}
    </div>
  );
}
