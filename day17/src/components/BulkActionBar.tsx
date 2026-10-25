import React from 'react';
import {ActivityStatus} from '../types/activity-log.types';
import {useBatchUpdateStatus} from '../hooks/use-activity-logs';

interface BulkActionBarProps {
  selectedIds:string[];
  onClearSelection:()=>void;
}

export const BulkActionBar:React.FC<BulkActionBarProps>=({selectedIds,onClearSelection})=>{
  const {mutate,isPending}=useBatchUpdateStatus();

  if(selectedIds.length===0) return null;

  const handleApply=(status:ActivityStatus)=>{
    mutate({ids:selectedIds,status},{
      onSuccess:()=>{
        onClearSelection();
      },
    });
  };

  return (
    <div className="bg-blue-950/80 border border-blue-500/40 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-white font-semibold">{selectedIds.length} item{selectedIds.length>1?'s':''} selected</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={()=>handleApply('APPROVED')}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded cursor-pointer disabled:opacity-50"
        >
          ✓ Approve Selected
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={()=>handleApply('REJECTED')}
          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded cursor-pointer disabled:opacity-50"
        >
          ✕ Reject Selected
        </button>
        <button
          type="button"
          onClick={onClearSelection}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
        >
          Deselect All
        </button>
      </div>
    </div>
  );
};
