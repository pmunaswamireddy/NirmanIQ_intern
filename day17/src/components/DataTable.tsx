import React from 'react';
import {ActivityLogParams,SortField} from '../types/activity-log.types';
import {useActivityLogs} from '../hooks/use-activity-logs';

interface DataTableProps {
  params:ActivityLogParams;
  onSort:(field:SortField)=>void;
  onPageChange:(page:number)=>void;
  onPageSizeChange:(size:number)=>void;
  selectedIds:string[];
  onToggleSelect:(id:string)=>void;
  onToggleSelectAll:(pageIds:string[])=>void;
}

export const DataTable:React.FC<DataTableProps>=({
  params,
  onSort,
  onPageChange,
  onPageSizeChange,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
})=>{
  const {data,isLoading,isFetching,isError}=useActivityLogs(params);

  const items=data?.data||[];
  const total=data?.total||0;
  const page=data?.page||1;
  const pageSize=data?.pageSize||10;
  const totalPages=data?.totalPages||1;

  const currentPageIds=items.map((i)=>i.id);
  const allCurrentSelected=currentPageIds.length>0&&currentPageIds.every((id)=>selectedIds.includes(id));
  const someCurrentSelected=currentPageIds.some((id)=>selectedIds.includes(id))&&!allCurrentSelected;

  const renderSortArrow=(field:SortField)=>{
    if(params.sort!==field) return <span className="text-slate-600 ml-1">↕</span>;
    return <span className="text-blue-400 ml-1 font-bold">{params.order==='asc'?'↑':'↓'}</span>;
  };

  const getStatusBadge=(status:string)=>{
    switch(status){
      case 'APPROVED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">APPROVED</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">REJECTED</span>;
      case 'IN_REVIEW':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">IN_REVIEW</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">PENDING</span>;
    }
  };

  const startRecord=total===0?0:(page-1)*pageSize+1;
  const endRecord=Math.min(page*pageSize,total);

  return (
    <div className="space-y-3">
      {/* Table Container */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 shadow-xl relative">
        {/* Loading overlay for keepPreviousData refetching */}
        {isFetching&&!isLoading&&(
          <div className="absolute top-2 right-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 rounded text-[10px] text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>Updating...</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800 tracking-wider">
              <tr>
                {/* Select All Checkbox */}
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={allCurrentSelected}
                    ref={(el)=>{if(el) el.indeterminate=someCurrentSelected;}}
                    onChange={()=>onToggleSelectAll(currentPageIds)}
                    className="rounded border-slate-700 text-blue-600 cursor-pointer"
                  />
                </th>

                {/* Sortable Headers */}
                <th onClick={()=>onSort('date')} className="p-3 cursor-pointer hover:text-white select-none">
                  Date {renderSortArrow('date')}
                </th>
                <th onClick={()=>onSort('user')} className="p-3 cursor-pointer hover:text-white select-none">
                  User {renderSortArrow('user')}
                </th>
                <th onClick={()=>onSort('action')} className="p-3 cursor-pointer hover:text-white select-none">
                  Action {renderSortArrow('action')}
                </th>
                <th onClick={()=>onSort('tower')} className="p-3 cursor-pointer hover:text-white select-none">
                  Tower {renderSortArrow('tower')}
                </th>
                <th onClick={()=>onSort('floor')} className="p-3 cursor-pointer hover:text-white select-none">
                  Floor {renderSortArrow('floor')}
                </th>
                <th onClick={()=>onSort('status')} className="p-3 cursor-pointer hover:text-white select-none">
                  Status {renderSortArrow('status')}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {isLoading?(
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading activity logs...</span>
                    </div>
                  </td>
                </tr>
              ):isError?(
                <tr>
                  <td colSpan={7} className="p-8 text-center text-rose-400">
                    Failed to load data. Please refresh.
                  </td>
                </tr>
              ):items.length===0?(
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No activity logs matched your filters.
                  </td>
                </tr>
              ):(
                items.map((row)=>{
                  const isSelected=selectedIds.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors hover:bg-slate-800/60 ${isSelected?'bg-blue-950/30':''}`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={()=>onToggleSelect(row.id)}
                          className="rounded border-slate-700 text-blue-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 font-mono text-slate-300">{row.date}</td>
                      <td className="p-3 font-semibold text-slate-200">{row.user}</td>
                      <td className="p-3 text-slate-300">{row.action}</td>
                      <td className="p-3 text-slate-300">{row.tower}</td>
                      <td className="p-3 font-mono text-slate-300">Floor {row.floor}</td>
                      <td className="p-3">{getStatusBadge(row.status)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-200">{startRecord}</strong> to <strong className="text-slate-200">{endRecord}</strong> of <strong className="text-slate-200">{total}</strong> records</span>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e)=>onPageSizeChange(Number(e.target.value))}
                className="p-1 bg-slate-900 border border-slate-800 rounded text-slate-200"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page<=1}
              onClick={()=>onPageChange(1)}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &laquo;
            </button>
            <button
              type="button"
              disabled={page<=1}
              onClick={()=>onPageChange(page-1)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &larr; Prev
            </button>
            <span className="px-3 py-1 font-semibold text-slate-300">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page>=totalPages}
              onClick={()=>onPageChange(page+1)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next &rarr;
            </button>
            <button
              type="button"
              disabled={page>=totalPages}
              onClick={()=>onPageChange(totalPages)}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
