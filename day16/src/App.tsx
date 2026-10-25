import React,{useState} from 'react';
import {Layers,ClipboardCheck,Table2,CheckCircle,Shield} from 'lucide-react';
import {MultiStepProjectWizard} from './exercises/exercise-1-multi-step-project';

import {FloorInspectionFormView} from './exercises/exercise-2-floor-inspection';
import {InlineEditableTable} from './exercises/exercise-3-inline-editable-table';

type ActiveTab='exercise-1'|'exercise-2'|'exercise-3';

export const App:React.FC=()=>{
  const [activeTab,setActiveTab]=useState<ActiveTab>('exercise-1');

  const tabs=[
    {
      id:'exercise-1' as ActiveTab,
      label:'Exercise 1: Multi-Step Project Wizard',
      icon:Layers,
      desc:'React Hook Form + Zod useFieldArray',
    },
    {
      id:'exercise-2' as ActiveTab,
      label:'Exercise 2: Floor Inspection Form',
      icon:ClipboardCheck,
      desc:'Cascading Dropdowns & 10MB Photo Upload',
    },
    {
      id:'exercise-3' as ActiveTab,
      label:'Exercise 3: Inline-Editable Table',
      icon:Table2,
      desc:'Keyboard Navigation (Tab, Enter, Esc)',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shadow-lg shadow-blue-500/10">
              16
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 2: Intermediate Skills</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs text-slate-400">Week 4</span>
              </div>
              <h1 className="text-base font-bold text-white leading-tight">
                Forms, Validation & Complex UI Patterns
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              RHF + Zod Resolvers
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium hidden md:inline-flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              ARIA Accessible
            </span>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          {tabs.map((tab)=>{
            const Icon=tab.icon;
            const isActive=activeTab===tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={()=>setActiveTab(tab.id)}
                className={`p-3.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive?'bg-white/20 text-white':'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate leading-tight">{tab.label.split(':')[0]}</p>
                  <p className={`text-[11px] font-medium truncate mt-0.5 ${isActive?'text-blue-100':'text-slate-300'}`}>
                    {tab.label.split(':')[1]?.trim()}
                  </p>
                  <p className={`text-[10px] truncate mt-0.5 ${isActive?'text-blue-200':'text-slate-500'}`}>
                    {tab.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {activeTab==='exercise-1'&&<MultiStepProjectWizard />}
        {activeTab==='exercise-2'&&<FloorInspectionFormView />}
        {activeTab==='exercise-3'&&<InlineEditableTable />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>NirmanIQ Web Development Internship &bull; Phase 2 Day 16 Checkpoint</p>
          <p className="text-slate-600">Built with React 19, TypeScript, React Hook Form, and Zod</p>
        </div>
      </footer>
    </div>
  );
};
