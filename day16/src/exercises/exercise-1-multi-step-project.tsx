import React,{useState} from 'react';
import {useForm,useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {fullProjectSchema,FullProjectForm} from '../schemas/project-step.schemas';

export const MultiStepProjectWizard:React.FC=()=>{
  const [step,setStep]=useState<number>(1);
  const [submitted,setSubmitted]=useState<FullProjectForm|null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState:{errors,isSubmitting},
  }=useForm<FullProjectForm>({
    resolver:zodResolver(fullProjectSchema),
    defaultValues:{
      name:'',
      code:'PRJ-HYD',
      location:'',
      targetDate:'',
      clientName:'',
      towers:[{name:'Tower A',floorCount:10,estimatedBudget:10000000}],
      projectNotes:'',
    },
  });

  const {fields,append,remove}=useFieldArray({control,name:'towers'});

  const nextStep=async()=>{
    if(step===1){
      const ok=await trigger(['name','code','location','targetDate','clientName']);
      if(ok) setStep(2);
    }else if(step===2){
      const ok=await trigger(['towers']);
      if(ok) setStep(3);
    }
  };

  const prevStep=()=>step>1&&setStep(step-1);

  const onSubmit=(data:FullProjectForm)=>{
    console.log('Project Submission Report:',data);
    console.log(data);
    setSubmitted(data);
  };
  const onError=(errs:any)=>{
    console.warn('Form Validation Errors:',errs);
  };


  const vals=getValues();

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 text-left">
      <div>
        <h2 className="text-xl font-bold text-white">Exercise 1: Multi-Step "Create Project" Form</h2>
        <p className="text-xs text-slate-400">Step {step} of 3 &bull; Zod validation at each step</p>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-2">
        {['1. Basic Info','2. Tower Config','3. Review & Submit'].map((label,i)=>(
          <div key={label} className={`flex-1 text-center py-1.5 rounded text-xs font-bold ${
            step===i+1?'bg-blue-600 text-white':step>i+1?'bg-slate-800 text-blue-400':'bg-slate-900 text-slate-500'
          }`}>
            {label}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit,onError)} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
        {/* STEP 1: Basic Info */}
        {step===1&&(
          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Project Name *</label>
              <input {...register('name')} placeholder="e.g. Skyline Heights" className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200" />
              {errors.name&&<p className="text-rose-400 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Project Code (PRJ-XXX) *</label>
              <input {...register('code')} placeholder="e.g. PRJ-HYD01" className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 uppercase" />
              {errors.code&&<p className="text-rose-400 mt-1">{errors.code.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location *</label>
              <input {...register('location')} placeholder="e.g. Hyderabad" className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200" />
              {errors.location&&<p className="text-rose-400 mt-1">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Client Name *</label>
              <input {...register('clientName')} placeholder="e.g. Apex Infra" className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200" />
              {errors.clientName&&<p className="text-rose-400 mt-1">{errors.clientName.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Completion Date (Future) *</label>
              <input type="date" {...register('targetDate')} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200" />
              {errors.targetDate&&<p className="text-rose-400 mt-1">{errors.targetDate.message}</p>}
            </div>
          </div>
        )}

        {/* STEP 2: Tower Config (Dynamic useFieldArray) */}
        {step===2&&(
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-300">Towers ({fields.length})</span>
              <button
                type="button"
                onClick={()=>append({name:`Tower ${String.fromCharCode(65+fields.length)}`,floorCount:8,estimatedBudget:10000000})}
                className="px-2 py-1 bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded text-xs cursor-pointer"
              >
                + Add Tower
              </button>
            </div>

            {errors.towers?.root&&<p className="text-rose-400">{errors.towers.root.message}</p>}

            {fields.map((field,idx)=>(
              <div key={field.id} className="p-3 bg-slate-950 border border-slate-800 rounded flex gap-2 items-center">
                <div className="flex-1 space-y-1">
                  <input {...register(`towers.${idx}.name` as const)} placeholder="Tower Name" className="w-full p-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs" />
                  {errors.towers?.[idx]?.name&&<p className="text-rose-400 text-[10px]">{errors.towers[idx]?.name?.message}</p>}
                </div>
                <div className="w-24 space-y-1">
                  <input type="number" min={1} max={120} {...register(`towers.${idx}.floorCount` as const)} placeholder="Floors" className="w-full p-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs" />
                  {errors.towers?.[idx]?.floorCount&&<p className="text-rose-400 text-[10px]">{errors.towers[idx]?.floorCount?.message}</p>}
                </div>
                {fields.length>1&&(
                  <button type="button" onClick={()=>remove(idx)} className="text-rose-400 hover:text-rose-300 px-2 py-1">✕</button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: Review & Submit */}
        {step===3&&(
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1">
              <p><strong>Name:</strong> {vals.name}</p>
              <p><strong>Code:</strong> {vals.code}</p>
              <p><strong>Location:</strong> {vals.location}</p>
              <p><strong>Client:</strong> {vals.clientName}</p>
              <p><strong>Date:</strong> {vals.targetDate}</p>
              <p><strong>Towers:</strong> {vals.towers?.map((t)=>`${t.name} (${t.floorCount} floors)`).join(', ')}</p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Remarks</label>
              <textarea {...register('projectNotes')} rows={2} placeholder="Optional notes..." className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200" />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-between pt-2">
          {step>1?<button type="button" onClick={prevStep} className="px-3 py-1.5 bg-slate-800 rounded text-slate-300 cursor-pointer">&larr; Back</button>:<div />}
          {step<3?(
            <button type="button" onClick={nextStep} className="px-4 py-1.5 bg-blue-600 rounded text-white font-bold cursor-pointer">Next &rarr;</button>
          ):(
            <button type="submit" disabled={isSubmitting} className="px-4 py-1.5 bg-emerald-600 rounded text-white font-bold cursor-pointer">Submit Project</button>
          )}
        </div>
      </form>

      {submitted&&(
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs space-y-1">
          <p className="text-emerald-400 font-bold">✓ Project Created</p>
          <pre className="text-[11px] text-slate-300">{JSON.stringify(submitted,null,2)}</pre>
          <button type="button" onClick={()=>{setSubmitted(null);setStep(1);reset();}} className="text-blue-400 underline text-[11px]">Create another</button>
        </div>
      )}
    </div>
  );
};
