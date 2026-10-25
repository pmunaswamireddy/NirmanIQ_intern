import React,{useState,useRef,useEffect} from 'react';
import {Edit3,Check,RotateCcw,Save,Sparkles,Info,Keyboard} from 'lucide-react';
import {BulkRow,bulkRowSchema} from '../schemas/bulk-progress.schema';


const INITIAL_ROWS:BulkRow[]=[
  {
    id:'row-1',
    towerName:'Tower Alpha',
    floorNumber:1,
    contractor:'Apex Infra Tech',
    progress:100,
    status:'COMPLETED',
    remarks:'Slab casting & curing done',
  },
  {
    id:'row-2',
    towerName:'Tower Alpha',
    floorNumber:2,
    contractor:'Apex Infra Tech',
    progress:85,
    status:'IN_PROGRESS',
    remarks:'Brickwork 85% completed',
  },
  {
    id:'row-3',
    towerName:'Tower Alpha',
    floorNumber:3,
    contractor:'Tata Steelworks',
    progress:40,
    status:'IN_PROGRESS',
    remarks:'Rebar tying in progress',
  },
  {
    id:'row-4',
    towerName:'Tower Beta',
    floorNumber:1,
    contractor:'Schneider Conduits',
    progress:60,
    status:'IN_PROGRESS',
    remarks:'Conduit boxes installed',
  },
  {
    id:'row-5',
    towerName:'Tower Beta',
    floorNumber:2,
    contractor:'Supreme Plumbing',
    progress:15,
    status:'IN_PROGRESS',
    remarks:'Drainage pipes laid',
  },
  {
    id:'row-6',
    towerName:'Tower Beta',
    floorNumber:3,
    contractor:'Ultratech ReadyMix',
    progress:0,
    status:'NOT_STARTED',
    remarks:'Awaiting structural signoff',
  },
];

type EditableField='contractor'|'progress'|'status'|'remarks';

const EDITABLE_FIELDS:EditableField[]=['contractor','progress','status','remarks'];

export const InlineEditableTable:React.FC=()=>{
  const [rows,setRows]=useState<BulkRow[]>(INITIAL_ROWS);
  const [originalRows]=useState<BulkRow[]>(INITIAL_ROWS);
  const [editingCell,setEditingCell]=useState<{rowId:string;field:EditableField}|null>(null);
  const [draftValue,setDraftValue]=useState<string|number>('');
  const [errorNotice,setErrorNotice]=useState<string|null>(null);
  const [saveSuccess,setSaveSuccess]=useState<boolean>(false);

  const inputRef=useRef<HTMLInputElement|HTMLSelectElement|null>(null);

  // Focus input automatically when entering edit mode
  useEffect(()=>{
    if(editingCell&&inputRef.current){
      inputRef.current.focus();
    }
  },[editingCell]);

  const handleCellClick=(row:BulkRow,field:EditableField)=>{
    setErrorNotice(null);
    setSaveSuccess(false);
    setEditingCell({rowId:row.id,field});
    setDraftValue(row[field]??'');
  };

  const handleCommit=()=>{
    if(!editingCell) return;
    const {rowId,field}=editingCell;

    const targetRow=rows.find((r)=>r.id===rowId);
    if(!targetRow){
      setEditingCell(null);
      return;
    }

    let parsedVal:any=draftValue;
    if(field==='progress'){
      parsedVal=Number(draftValue);
      if(isNaN(parsedVal)||parsedVal<0||parsedVal>100){
        setErrorNotice('Progress must be an integer between 0 and 100%');
        return;
      }
    }

    const updatedRow={...targetRow,[field]:parsedVal};

    // Auto-update status if progress hits 100% or 0%
    if(field==='progress'){
      if(parsedVal===100) updatedRow.status='COMPLETED';
      else if(parsedVal===0) updatedRow.status='NOT_STARTED';
      else if(updatedRow.status==='NOT_STARTED'||updatedRow.status==='COMPLETED'){
        updatedRow.status='IN_PROGRESS';
      }
    }

    const validation=bulkRowSchema.safeParse(updatedRow);
    if(!validation.success){
      setErrorNotice(validation.error.errors[0]?.message||'Invalid cell value');
      return;
    }

    setRows((prev)=>prev.map((r)=>(r.id===rowId?updatedRow:r)));
    setErrorNotice(null);
    setEditingCell(null);
  };

  const handleCancel=()=>{
    setErrorNotice(null);
    setEditingCell(null);
  };

  const handleKeyDown=(e:React.KeyboardEvent)=>{
    if(e.key==='Enter'){
      e.preventDefault();
      handleCommit();
    }else if(e.key==='Escape'){
      e.preventDefault();
      handleCancel();
    }else if(e.key==='Tab'){
      e.preventDefault();
      handleCommit();
      moveToNextCell(e.shiftKey);
    }
  };

  const moveToNextCell=(backwards:boolean=false)=>{
    if(!editingCell) return;
    const {rowId,field}=editingCell;

    const rowIndex=rows.findIndex((r)=>r.id===rowId);
    const fieldIndex=EDITABLE_FIELDS.indexOf(field);

    if(rowIndex===-1||fieldIndex===-1) return;

    let nextRowIndex=rowIndex;
    let nextFieldIndex=fieldIndex+(backwards?-1:1);

    if(nextFieldIndex>=EDITABLE_FIELDS.length){
      nextFieldIndex=0;
      nextRowIndex=(rowIndex+1)%rows.length;
    }else if(nextFieldIndex<0){
      nextFieldIndex=EDITABLE_FIELDS.length-1;
      nextRowIndex=(rowIndex-1+rows.length)%rows.length;
    }

    const nextRow=rows[nextRowIndex];
    const nextField=EDITABLE_FIELDS[nextFieldIndex];

    setEditingCell({rowId:nextRow.id,field:nextField});
    setDraftValue(nextRow[nextField]??'');
  };

  const handleResetToOriginal=()=>{
    setRows(originalRows);
    setEditingCell(null);
    setErrorNotice(null);
    setSaveSuccess(false);
  };

  const handleSaveAll=()=>{
    setEditingCell(null);
    setSaveSuccess(true);
    setTimeout(()=>setSaveSuccess(false),3000);
  };

  const dirtyCount=rows.filter((r,i)=>{
    const orig=originalRows[i];
    return r.contractor!==orig.contractor||r.progress!==orig.progress||r.status!==orig.status||r.remarks!==orig.remarks;
  }).length;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exercise 3: Inline-Editable Table with Keyboard Navigation</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Bulk Progress Update Table</h2>
          <p className="text-sm text-slate-400">Click any cell to edit. Navigate with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">Tab</kbd>, commit with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">Enter</kbd>, or cancel with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">Esc</kbd>.</p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          {dirtyCount>0&&(
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              {dirtyCount} rows changed
            </span>
          )}
          <button
            type="button"
            onClick={handleResetToOriginal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            Save Bulk Progress
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint Bar */}
      <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-blue-400" />
          <span>Keyboard shortcuts enabled:</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span><strong className="text-slate-200">Click:</strong> Edit Cell</span>
          <span><strong className="text-slate-200">Enter:</strong> Commit</span>
          <span><strong className="text-slate-200">Escape:</strong> Discard</span>
          <span><strong className="text-slate-200">Tab:</strong> Next Cell</span>
          <span><strong className="text-slate-200">Shift+Tab:</strong> Previous Cell</span>
        </div>
      </div>

      {errorNotice&&(
        <div role="alert" className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {saveSuccess&&(
        <div role="status" className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>All table updates persisted successfully!</span>
        </div>
      )}

      {/* Table Container */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Floor Progress Bulk Editor">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Contractor</th>
                <th className="py-3.5 px-4 w-44">Progress (%)</th>
                <th className="py-3.5 px-4 w-36">Status</th>
                <th className="py-3.5 px-4">Remarks / Site Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {rows.map((row)=>{
                const isRowModified=JSON.stringify(row)!==JSON.stringify(originalRows.find((r)=>r.id===row.id));

                return (
                  <tr 
                    key={row.id} 
                    className={`transition-colors ${
                      isRowModified?'bg-blue-950/15':'hover:bg-slate-900/40'
                    }`}
                  >
                    {/* Read-Only Location */}
                    <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500/60 shrink-0" />
                        <span>{row.towerName} &bull; Floor {row.floorNumber}</span>
                      </div>
                    </td>

                    {/* Contractor Cell */}
                    <td 
                      onClick={()=>handleCellClick(row,'contractor')}
                      className="py-3 px-4 cursor-pointer relative group"
                    >
                      {editingCell?.rowId===row.id&&editingCell?.field==='contractor'?(
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={draftValue}
                          onChange={(e)=>setDraftValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={handleCommit}
                          className="w-full px-2.5 py-1 rounded bg-slate-950 border border-blue-500 text-xs text-white focus:outline-none"
                        />
                      ):(
                        <div className="flex items-center justify-between text-slate-300 group-hover:text-white">
                          <span>{row.contractor}</span>
                          <Edit3 className="w-3 h-3 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>

                    {/* Progress Percentage Cell */}
                    <td 
                      onClick={()=>handleCellClick(row,'progress')}
                      className="py-3 px-4 cursor-pointer relative group"
                    >
                      {editingCell?.rowId===row.id&&editingCell?.field==='progress'?(
                        <div className="flex items-center gap-1.5">
                          <input
                            ref={inputRef as React.RefObject<HTMLInputElement>}
                            type="number"
                            min="0"
                            max="100"
                            value={draftValue}
                            onChange={(e)=>setDraftValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleCommit}
                            className="w-20 px-2 py-1 rounded bg-slate-950 border border-blue-500 text-xs text-white focus:outline-none text-right font-mono"
                          />
                          <span className="text-slate-400 font-mono text-xs">%</span>
                        </div>
                      ):(
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-200">{row.progress}%</span>
                            <Edit3 className="w-3 h-3 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                row.progress===100?'bg-emerald-500':row.progress>50?'bg-blue-500':'bg-amber-500'
                              }`}
                              style={{width:`${row.progress}%`}}
                            />
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Status Cell */}
                    <td 
                      onClick={()=>handleCellClick(row,'status')}
                      className="py-3 px-4 cursor-pointer relative group"
                    >
                      {editingCell?.rowId===row.id&&editingCell?.field==='status'?(
                        <select
                          ref={inputRef as React.RefObject<HTMLSelectElement>}
                          value={draftValue}
                          onChange={(e)=>setDraftValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={handleCommit}
                          className="w-full px-2 py-1 rounded bg-slate-950 border border-blue-500 text-xs text-white focus:outline-none"
                        >
                          <option value="NOT_STARTED">NOT_STARTED</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="ON_HOLD">ON_HOLD</option>
                        </select>
                      ):(
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            row.status==='COMPLETED'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : row.status==='IN_PROGRESS'
                              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              : row.status==='ON_HOLD'
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {row.status.replace('_',' ')}
                          </span>
                          <Edit3 className="w-3 h-3 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>

                    {/* Remarks Cell */}
                    <td 
                      onClick={()=>handleCellClick(row,'remarks')}
                      className="py-3 px-4 cursor-pointer relative group"
                    >
                      {editingCell?.rowId===row.id&&editingCell?.field==='remarks'?(
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={draftValue}
                          onChange={(e)=>setDraftValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={handleCommit}
                          className="w-full px-2.5 py-1 rounded bg-slate-950 border border-blue-500 text-xs text-white focus:outline-none"
                        />
                      ):(
                        <div className="flex items-center justify-between text-slate-400 group-hover:text-slate-200">
                          <span className="truncate max-w-xs">{row.remarks||'-- Click to add note --'}</span>
                          <Edit3 className="w-3 h-3 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
