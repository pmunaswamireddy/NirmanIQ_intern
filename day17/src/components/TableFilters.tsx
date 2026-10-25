import React,{useState,useEffect} from 'react';
import {ActivityLogParams} from '../types/activity-log.types';
import {getMockUsers,getMockStatuses} from '../services/activity-log.service';
import {useDebounce} from '../hooks/use-debounce';

interface TableFiltersProps {
  params:ActivityLogParams;
  onUpdate:<K extends keyof ActivityLogParams>(key:K,val:ActivityLogParams[K])=>void;
  onReset:()=>void;
}

export const TableFilters:React.FC<TableFiltersProps>=({params,onUpdate,onReset})=>{
  const [searchInput,setSearchInput]=useState<string>(params.search||'');
  const debouncedSearch=useDebounce(searchInput,300);

  useEffect(()=>{
    if(debouncedSearch!==params.search){
      onUpdate('search',debouncedSearch);
    }
  },[debouncedSearch,params.search,onUpdate]);

  // Keep local input in sync if URL changes (e.g. browser back button)
  useEffect(()=>{
    setSearchInput(params.search||'');
  },[params.search]);

  const users=getMockUsers();
  const statuses=getMockStatuses();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Filters & Search</span>
        <button
          type="button"
          onClick={()=>{setSearchInput('');onReset();}}
          className="text-xs text-blue-400 hover:text-blue-300 underline cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Search */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">Search Keyword</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            placeholder="Search action, tower, user..."
            className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">Status</label>
          <select
            value={params.status||'ALL'}
            onChange={(e)=>onUpdate('status',e.target.value)}
            className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            {statuses.map((s)=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* User Filter */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">Assigned User</label>
          <select
            value={params.user||'ALL'}
            onChange={(e)=>onUpdate('user',e.target.value)}
            className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Users</option>
            {users.map((u)=><option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* Date Range Start */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">From Date</label>
          <input
            type="date"
            value={params.startDate||''}
            onChange={(e)=>onUpdate('startDate',e.target.value||undefined)}
            className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
