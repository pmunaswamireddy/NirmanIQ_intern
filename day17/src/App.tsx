import React,{useState} from 'react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {useUrlTableParams} from './hooks/use-url-table-params';
import {TableFilters} from './components/TableFilters';
import {DataTable} from './components/DataTable';
import {BulkActionBar} from './components/BulkActionBar';

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      retry:1,
    },
  },
});

const ActivityLogDashboard:React.FC=()=>{
  const {params,updateParam,toggleSort,resetFilters}=useUrlTableParams();
  const [selectedIds,setSelectedIds]=useState<string[]>([]);

  const handleToggleSelect=(id:string)=>{
    setSelectedIds((prev)=>prev.includes(id)?prev.filter((i)=>i!==id):[...prev,id]);
  };

  const handleToggleSelectAll=(pageIds:string[])=>{
    setSelectedIds((prev)=>{
      const allSelected=pageIds.every((id)=>prev.includes(id));
      if(allSelected){
        return prev.filter((id)=>!pageIds.includes(id));
      }
      return Array.from(new Set([...prev,...pageIds]));
    });
  };

  const currentQueryString=typeof window!=='undefined'?window.location.search:'';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Day 17 &bull; Practical Exercises 1-4</span>
          <h1 className="text-xl font-bold text-white">Data Tables, Pagination & Search</h1>
          <p className="text-xs text-slate-400">Activity Log &bull; Server-Side Pagination &bull; URL-Synced Query Params &bull; Bulk Actions</p>
        </div>

        {/* URL Sync Visual Badge (Exercise 3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs max-w-md">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-slate-300">Live URL Query String:</span>
          </div>
          <code className="text-blue-400 font-mono text-[11px] break-all">
            {currentQueryString||'(Default params: ?page=1&pageSize=10&sort=date)'}
          </code>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-4">
        {/* Exercise 2 & 3: Filters & Search */}
        <TableFilters
          params={params}
          onUpdate={updateParam}
          onReset={resetFilters}
        />

        {/* Exercise 4: Row Selection & Bulk Actions */}
        <BulkActionBar
          selectedIds={selectedIds}
          onClearSelection={()=>setSelectedIds([])}
        />

        {/* Exercise 1 & 4: Data Table with Server-side Pagination & Sortable Headers */}
        <DataTable
          params={params}
          onSort={toggleSort}
          onPageChange={(page)=>updateParam('page',page)}
          onPageSizeChange={(size)=>updateParam('pageSize',size)}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
        />
      </main>
    </div>
  );
};

export const App:React.FC=()=>{
  return (
    <QueryClientProvider client={queryClient}>
      <ActivityLogDashboard />
    </QueryClientProvider>
  );
};
