import React,{useState,useRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Upload,X,CheckCircle2,AlertTriangle,XCircle,FileImage,ShieldCheck,Sparkles} from 'lucide-react';
import {floorInspectionSchema,FloorInspectionForm} from '../schemas/floor-inspection.schema';

import {FormField} from '../components/FormField';

interface TowerOption {
  id:string;
  name:string;
  floors:{
    id:string;
    number:number;
    rooms:{id:string;name:string}[];
  }[];
}

const MOCK_TOWERS:TowerOption[]=[
  {
    id:'tower-a',
    name:'Tower Alpha (Residential)',
    floors:[
      {
        id:'floor-a1',
        number:1,
        rooms:[
          {id:'room-101',name:'Unit 101 - Master Bedroom'},
          {id:'room-102',name:'Unit 102 - Living Area'},
          {id:'room-103',name:'Unit 103 - Electrical Duct'},
        ],
      },
      {
        id:'floor-a2',
        number:2,
        rooms:[
          {id:'room-201',name:'Unit 201 - Kitchen Plumbing'},
          {id:'room-202',name:'Unit 202 - Balcony Slab'},
        ],
      },
      {
        id:'floor-a3',
        number:3,
        rooms:[
          {id:'room-301',name:'Unit 301 - HVAC Ducting'},
          {id:'room-302',name:'Unit 302 - Fire Exit Stairwell'},
        ],
      },
    ],
  },
  {
    id:'tower-b',
    name:'Tower Beta (Commercial Wing)',
    floors:[
      {
        id:'floor-b1',
        number:1,
        rooms:[
          {id:'room-b101',name:'Ground Lobby & Reception'},
          {id:'room-b102',name:'Server Room & UPS Bay'},
        ],
      },
      {
        id:'floor-b2',
        number:2,
        rooms:[
          {id:'room-b201',name:'Open Workstation Floor'},
          {id:'room-b202',name:'Conference Hall B'},
        ],
      },
    ],
  },
];

export const FloorInspectionFormView:React.FC=()=>{
  const [photoPreview,setPhotoPreview]=useState<string|null>(null);
  const [submittedInspection,setSubmittedInspection]=useState<FloorInspectionForm|null>(null);
  const fileInputRef=useRef<HTMLInputElement|null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState:{errors,isSubmitting},
  }=useForm<FloorInspectionForm>({
    resolver:zodResolver(floorInspectionSchema),
    defaultValues:{
      towerId:'',
      floorId:'',
      roomId:'',
      status:'PASS',
      notes:'',
    },
  });

  const selectedTowerId=watch('towerId');
  const selectedFloorId=watch('floorId');
  const currentStatus=watch('status');

  const selectedTower=MOCK_TOWERS.find((t)=>t.id===selectedTowerId);
  const availableFloors=selectedTower?.floors||[];
  const selectedFloor=availableFloors.find((f)=>f.id===selectedFloorId);
  const availableRooms=selectedFloor?.rooms||[];

  const handleTowerChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setValue('towerId',e.target.value);
    setValue('floorId','');
    setValue('roomId','');
  };

  const handleFloorChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setValue('floorId',e.target.value);
    setValue('roomId','');
  };

  const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];
    if(!file) return;

    if(file.size>10*1024*1024){
      setError('photo',{message:'Photo size exceeds 10 MB limit'});
      return;
    }

    if(!['image/jpeg','image/png','image/webp','image/jpg'].includes(file.type)){
      setError('photo',{message:'Only .jpg, .png, and .webp images allowed'});
      return;
    }

    clearErrors('photo');
    setValue('photo',file,{shouldValidate:true});
    const previewUrl=URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const handleRemovePhoto=()=>{
    setValue('photo',undefined as any,{shouldValidate:true});
    if(photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    if(fileInputRef.current) fileInputRef.current.value='';
  };

  const onSubmit=(data:FloorInspectionForm)=>{
    setSubmittedInspection(data);
  };

  const handleReset=()=>{
    reset();
    handleRemovePhoto();
    setSubmittedInspection(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exercise 2: Cascading Dependent Dropdowns & 10MB Photo Uploader</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Site Quality Inspection Form</h2>
        <p className="text-sm text-slate-400">Perform QA audits with cascading hierarchy (Tower &rarr; Floor &rarr; Room) and photographic evidence.</p>
      </div>

      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          {/* Cascading Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Tower Select */}
            <FormField label="1. Select Tower" htmlFor="towerId" required error={errors.towerId?.message}>
              <select
                id="towerId"
                {...register('towerId')}
                onChange={handleTowerChange}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-blue-500 transition-colors"
              >
                <option value="">-- Choose Tower --</option>
                {MOCK_TOWERS.map((t)=>(
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </FormField>

            {/* 2. Floor Select (Cascading) */}
            <FormField 
              label="2. Select Floor" 
              htmlFor="floorId" 
              required 
              hint={!selectedTowerId?'Select tower first':undefined}
              error={errors.floorId?.message}
            >
              <select
                id="floorId"
                {...register('floorId')}
                onChange={handleFloorChange}
                disabled={!selectedTowerId}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 transition-colors ${
                  !selectedTowerId?'opacity-40 cursor-not-allowed border-slate-800':'border-slate-800 focus:border-blue-500'
                }`}
              >
                <option value="">{selectedTowerId?'-- Choose Floor --':'-- Locked --'}</option>
                {availableFloors.map((f)=>(
                  <option key={f.id} value={f.id}>Floor {f.number}</option>
                ))}
              </select>
            </FormField>

            {/* 3. Room Select (Cascading) */}
            <FormField 
              label="3. Select Room / Area" 
              htmlFor="roomId" 
              required 
              hint={!selectedFloorId?'Select floor first':undefined}
              error={errors.roomId?.message}
            >
              <select
                id="roomId"
                {...register('roomId')}
                disabled={!selectedFloorId}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 transition-colors ${
                  !selectedFloorId?'opacity-40 cursor-not-allowed border-slate-800':'border-slate-800 focus:border-blue-500'
                }`}
              >
                <option value="">{selectedFloorId?'-- Choose Area --':'-- Locked --'}</option>
                {availableRooms.map((r)=>(
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Inspection Status Radios */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Inspection Quality Status <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {value:'PASS',label:'Passed Inspection',icon:CheckCircle2,color:'emerald',desc:'Complies with building code'},
                {value:'FLAGGED',label:'Flagged / Minor Defect',icon:AlertTriangle,color:'amber',desc:'Action needed within 48h'},
                {value:'FAILED',label:'Critical Rejection',icon:XCircle,color:'rose',desc:'Immediate work stoppage'},
              ].map((item)=>{
                const Icon=item.icon;
                const isChecked=currentStatus===item.value;
                return (
                  <label
                    key={item.value}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? item.value==='PASS'
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/20'
                          : item.value==='FLAGGED'
                          ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-2 ring-amber-500/20'
                          : 'bg-rose-950/40 border-rose-500 text-rose-300 ring-2 ring-rose-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      value={item.value}
                      {...register('status')}
                      className="sr-only"
                    />
                    <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold leading-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Evidence Photo Upload with Drag & Drop */}
          <div className="space-y-2">
            <FormField 
              label="Photographic Evidence" 
              htmlFor="photo" 
              hint="Max 10 MB (JPG, PNG, WEBP)"
              error={errors.photo?.message as string}
            >
              {!photoPreview?(
                <div 
                  onClick={()=>fileInputRef.current?.click()}
                  className="p-6 rounded-xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-900/40 hover:bg-slate-900/80 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center group"
                >
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-300 group-hover:text-white">
                      Click to upload site photo or drag and drop
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">JPG, PNG, or WEBP up to 10 MB</p>
                  </div>
                </div>
              ):(
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 p-3 flex items-center gap-4">
                  <img 
                    src={photoPreview} 
                    alt="Inspection preview" 
                    className="w-20 h-20 object-cover rounded-lg border border-slate-800 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <FileImage className="w-4 h-4 text-blue-400" />
                      <span className="truncate">Photo Attached Ready for Audit</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 mt-0.5">Verified &le; 10 MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    aria-label="Remove uploaded photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </FormField>
          </div>

          {/* Remarks */}
          <FormField label="Inspector Observations & Notes" htmlFor="notes" error={errors.notes?.message}>
            <textarea
              id="notes"
              rows={3}
              placeholder="e.g. Concrete curing inspection passed; minor hairline crack on lintel beam flagged for re-sealing."
              {...register('notes')}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 transition-colors"
            />
          </FormField>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              {isSubmitting?'Submitting Audit...':'Record QA Inspection'}
            </button>
          </div>
        </form>

        {/* Audit Log Success */}
        {submittedInspection&&(
          <div className="mt-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Inspection Record Logged
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                Log Next Inspection
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Tower</span>
                <span className="font-semibold text-slate-200">{selectedTower?.name.split(' ')[0]} {selectedTower?.name.split(' ')[1]}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Floor</span>
                <span className="font-semibold text-slate-200">Floor {selectedFloor?.number}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Status</span>
                <span className={`font-bold ${
                  submittedInspection.status==='PASS'?'text-emerald-400':submittedInspection.status==='FLAGGED'?'text-amber-400':'text-rose-400'
                }`}>{submittedInspection.status}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Evidence</span>
                <span className="font-semibold text-slate-200">{submittedInspection.photo?'1 Photo Attached':'None'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
