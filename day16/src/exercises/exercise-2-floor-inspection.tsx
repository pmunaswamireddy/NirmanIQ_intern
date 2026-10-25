import React,{useState,useRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {floorInspectionSchema,FloorInspectionForm} from '../schemas/floor-inspection.schema';

const TOWERS=[
  {
    id:'t1',
    name:'Tower A',
    floors:[
      {id:'f1',num:1,rooms:['Unit 101','Unit 102','Electrical Room']},
      {id:'f2',num:2,rooms:['Unit 201','Unit 202','Lobby']},
    ],
  },
  {
    id:'t2',
    name:'Tower B',
    floors:[
      {id:'f3',num:1,rooms:['Server Room','Reception']},
      {id:'f4',num:2,rooms:['Office 201','Conference Room']},
    ],
  },
];

export const FloorInspectionFormView:React.FC=()=>{
  const [preview,setPreview]=useState<string|null>(null);
  const [success,setSuccess]=useState<FloorInspectionForm|null>(null);
  const fileRef=useRef<HTMLInputElement|null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState:{errors,isSubmitting},
  }=useForm<FloorInspectionForm>({
    resolver:zodResolver(floorInspectionSchema),
    defaultValues:{status:'PASS',towerId:'',floorId:'',roomId:'',notes:''},
  });

  const selTowerId=watch('towerId');
  const selFloorId=watch('floorId');
  const floors=TOWERS.find((t)=>t.id===selTowerId)?.floors||[];
  const rooms=floors.find((f)=>f.id===selFloorId)?.rooms||[];

  const onTowerChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setValue('towerId',e.target.value);
    setValue('floorId','');
    setValue('roomId','');
  };

  const onFloorChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setValue('floorId',e.target.value);
    setValue('roomId','');
  };

  const onFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];
    if(!file) return;
    if(file.size>10*1024*1024){
      setError('photo',{message:'Max 10 MB allowed'});
      return;
    }
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){
      setError('photo',{message:'Only JPG, PNG, WEBP allowed'});
      return;
    }
    clearErrors('photo');
    setValue('photo',file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit=(data:FloorInspectionForm)=>{
    console.log('Inspection Submission Report:',data);
    console.log(data);
    setSuccess(data);
  };
  const onError=(errs:any)=>{
    console.warn('Inspection Form Validation Errors:',errs);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 text-left">
      <div>
        <h2 className="text-xl font-bold text-white">Exercise 2: Floor Inspection Form</h2>
        <p className="text-xs text-slate-400">Dependent dropdowns &bull; Max 10MB photo upload with preview</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit,onError)} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
        {/* Tower */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Select Tower *</label>
          <select {...register('towerId')} onChange={onTowerChange} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200">
            <option value="">-- Choose Tower --</option>
            {TOWERS.map((t)=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          {errors.towerId&&<p className="text-rose-400 mt-1">{errors.towerId.message}</p>}
        </div>

        {/* Floor */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Select Floor *</label>
          <select {...register('floorId')} onChange={onFloorChange} disabled={!selTowerId} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 disabled:opacity-50">
            <option value="">-- Choose Floor --</option>
            {floors.map((f)=><option key={f.id} value={f.id}>Floor {f.num}</option>)}
          </select>
          {errors.floorId&&<p className="text-rose-400 mt-1">{errors.floorId.message}</p>}
        </div>

        {/* Room */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Select Room / Area *</label>
          <select {...register('roomId')} disabled={!selFloorId} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 disabled:opacity-50">
            <option value="">-- Choose Room --</option>
            {rooms.map((r)=><option key={r} value={r}>{r}</option>)}
          </select>
          {errors.roomId&&<p className="text-rose-400 mt-1">{errors.roomId.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Inspection Status *</label>
          <select {...register('status')} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 font-bold">
            <option value="PASS">PASS</option>
            <option value="FLAGGED">FLAGGED</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        {/* Evidence Photo */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Evidence Photo (Max 10 MB, JPG/PNG)</label>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onFileChange} className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white" />
          {errors.photo&&<p className="text-rose-400 mt-1">{errors.photo.message as string}</p>}
          {preview&&(
            <div className="mt-2 flex items-center gap-2">
              <img src={preview} alt="Evidence Preview" className="w-16 h-16 object-cover rounded border border-slate-700" />
              <button type="button" onClick={()=>{setPreview(null);setValue('photo',undefined as any);if(fileRef.current)fileRef.current.value='';}} className="text-rose-400 text-[11px] underline">Remove</button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Inspection Notes</label>
          <textarea {...register('notes')} rows={2} placeholder="Observations..." className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold cursor-pointer">
          Record Inspection
        </button>
      </form>

      {success&&(
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs space-y-1">
          <p className="text-emerald-400 font-bold">✓ Inspection Recorded Successfully</p>
          <pre className="text-[11px] text-slate-300">{JSON.stringify(success,null,2)}</pre>
          <button type="button" onClick={()=>{setSuccess(null);setPreview(null);reset();}} className="text-blue-400 underline text-[11px]">Log another</button>
        </div>
      )}
    </div>
  );
};
