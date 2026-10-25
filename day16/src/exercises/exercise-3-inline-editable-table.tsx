import React,{useState,useRef,useEffect} from 'react';
import {bulkRowSchema,BulkRow} from '../schemas/bulk-progress.schema';

const INITIAL_ROWS:BulkRow[]=[
  {id:'1',towerName:'Tower A',floorNumber:1,contractor:'Apex Infra',progress:100,status:'COMPLETED',remarks:'Slab done'},
  {id:'2',towerName:'Tower A',floorNumber:2,contractor:'Apex Infra',progress:75,status:'IN_PROGRESS',remarks:'Brickwork'},
  {id:'3',towerName:'Tower B',floorNumber:1,contractor:'Schneider',progress:40,status:'IN_PROGRESS',remarks:'Conduits'},
  {id:'4',towerName:'Tower B',floorNumber:2,contractor:'Supreme',progress:10,status:'IN_PROGRESS',remarks:'Plumbing'},
];

type Field='contractor'|'progress'|'status'|'remarks';
const FIELDS:Field[]=['contractor','progress','status','remarks'];

export const InlineEditableTable:React.FC=()=>{
  const [rows,setRows]=useState<BulkRow[]>(INITIAL_ROWS);
  const [editing,setEditing]=useState<{id:string;field:Field}|null>(null);
  const [val,setVal]=useState<string|number>('');
  const [err,setErr]=useState<string|null>(null);
  const inputRef=useRef<HTMLInputElement|HTMLSelectElement|null>(null);

  useEffect(()=>{
    if(editing&&inputRef.current) inputRef.current.focus();
  },[editing]);

  const startEdit=(row:BulkRow,field:Field)=>{
    setEditing({id:row.id,field});
    setVal(row[field]??'');
    setErr(null);
  };

  const saveEdit=()=>{
    if(!editing) return;
    const target=rows.find((r)=>r.id===editing.id);
    if(!target){setEditing(null);return;}
    const parsed=editing.field==='progress'?Number(val):val;
    const updated={...target,[editing.field]:parsed};
    const res=bulkRowSchema.safeParse(updated);
    if(!res.success){
      setErr(res.error.errors[0]?.message||'Invalid value');
      return;
    }
    setRows(rows.map((r)=>(r.id===editing.id?updated:r)));
    setEditing(null);
    setErr(null);
  };

  const cancelEdit=()=>{
    setEditing(null);
    setErr(null);
  };

  const handleKeyDown=(e:React.KeyboardEvent)=>{
    if(e.key==='Enter'){
      e.preventDefault();
      saveEdit();
    }else if(e.key==='Escape'){
      e.preventDefault();
      cancelEdit();
    }else if(e.key==='Tab'){
      e.preventDefault();
      saveEdit();
      if(!editing) return;
      const rIdx=rows.findIndex((r)=>r.id===editing.id);
      const fIdx=FIELDS.indexOf(editing.field);
      const nextFIdx=fIdx+(e.shiftKey?-1:1);
      let nextR=rIdx,nextF=nextFIdx;
      if(nextFIdx>=FIELDS.length){nextF=0;nextR=(rIdx+1)%rows.length;}
      else if(nextFIdx<0){nextF=FIELDS.length-1;nextR=(rIdx-1+rows.length)%rows.length;}
      const targetR=rows[nextR];
      const targetF=FIELDS[nextF];
      setEditing({id:targetR.id,field:targetF});
      setVal(targetR[targetF]??'');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left">
      <div>
        <h2 className="text-xl font-bold text-white">Exercise 3: Bulk Progress Inline-Editable Table</h2>
        <p className="text-xs text-slate-400">Click a cell to edit &bull; Tab to next &bull; Enter to save &bull; Esc to cancel</p>
      </div>

      {err&&<div className="p-2 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">{err}</div>}

      <div className="border border-slate-800 rounded-lg overflow-x-auto bg-slate-900">
        <table className="w-full text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[11px]">
            <tr>
              <th className="p-3">Tower & Floor</th>
              <th className="p-3">Contractor</th>
              <th className="p-3">Progress (%)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row)=>(
              <tr key={row.id} className="hover:bg-slate-800/50">
                <td className="p-3 text-slate-300 font-semibold">{row.towerName} - Floor {row.floorNumber}</td>

                {/* Contractor */}
                <td className="p-3 cursor-pointer" onClick={()=>startEdit(row,'contractor')}>
                  {editing?.id===row.id&&editing?.field==='contractor'?(
                    <input
                      ref={inputRef as any}
                      value={val}
                      onChange={(e)=>setVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={saveEdit}
                      className="px-2 py-1 bg-slate-950 border border-blue-500 rounded text-white text-xs w-full"
                    />
                  ):<span className="text-slate-200">{row.contractor}</span>}
                </td>

                {/* Progress */}
                <td className="p-3 cursor-pointer" onClick={()=>startEdit(row,'progress')}>
                  {editing?.id===row.id&&editing?.field==='progress'?(
                    <input
                      ref={inputRef as any}
                      type="number"
                      min={0}
                      max={100}
                      value={val}
                      onChange={(e)=>setVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={saveEdit}
                      className="px-2 py-1 bg-slate-950 border border-blue-500 rounded text-white text-xs w-20 font-mono"
                    />
                  ):(
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-200">{row.progress}%</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${row.progress===100?'bg-emerald-500':row.progress>50?'bg-blue-500':'bg-amber-500'}`} style={{width:`${row.progress}%`}} />
                      </div>
                    </div>
                  )}
                </td>

                {/* Status */}
                <td className="p-3 cursor-pointer" onClick={()=>startEdit(row,'status')}>
                  {editing?.id===row.id&&editing?.field==='status'?(
                    <select
                      ref={inputRef as any}
                      value={val}
                      onChange={(e)=>setVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={saveEdit}
                      className="px-2 py-1 bg-slate-950 border border-blue-500 rounded text-white text-xs"
                    >
                      <option value="NOT_STARTED">NOT_STARTED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="ON_HOLD">ON_HOLD</option>
                    </select>
                  ):<span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold">{row.status}</span>}
                </td>

                {/* Remarks */}
                <td className="p-3 cursor-pointer text-slate-400" onClick={()=>startEdit(row,'remarks')}>
                  {editing?.id===row.id&&editing?.field==='remarks'?(
                    <input
                      ref={inputRef as any}
                      value={val}
                      onChange={(e)=>setVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={saveEdit}
                      className="px-2 py-1 bg-slate-950 border border-blue-500 rounded text-white text-xs w-full"
                    />
                  ):<span>{row.remarks||'-'}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
