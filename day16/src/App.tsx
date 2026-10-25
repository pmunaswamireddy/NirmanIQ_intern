import React,{useState} from 'react';
import {MultiStepProjectWizard} from './exercises/exercise-1-multi-step-project';
import {FloorInspectionFormView} from './exercises/exercise-2-floor-inspection';
import {InlineEditableTable} from './exercises/exercise-3-inline-editable-table';

export const App:React.FC=()=>{
  const [tab,setTab]=useState<'ex1'|'ex2'|'ex3'>('ex1');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Day 16</span>
          <h1 className="text-xl font-bold text-white">Forms, Validation & Complex UI Patterns</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={()=>setTab('ex1')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
              tab==='ex1'?'bg-blue-600 text-white':'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Exercise 1: Multi-Step
          </button>
          <button
            type="button"
            onClick={()=>setTab('ex2')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
              tab==='ex2'?'bg-blue-600 text-white':'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Exercise 2: Inspection
          </button>
          <button
            type="button"
            onClick={()=>setTab('ex3')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
              tab==='ex3'?'bg-blue-600 text-white':'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Exercise 3: Inline Table
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {tab==='ex1'&&<MultiStepProjectWizard />}
        {tab==='ex2'&&<FloorInspectionFormView />}
        {tab==='ex3'&&<InlineEditableTable />}
      </main>
    </div>
  );
};
