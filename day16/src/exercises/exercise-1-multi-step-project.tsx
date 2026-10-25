import React,{useState} from 'react';
import {useForm,useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Plus,Trash2,ArrowRight,ArrowLeft,CheckCircle2,Sparkles} from 'lucide-react';
import {fullProjectSchema,FullProjectForm} from '../schemas/project-step.schemas';

import {FormField} from '../components/FormField';
import {StepIndicator} from '../components/StepIndicator';

const STEPS=[
  {id:1,title:'Basic Info',description:'Project identity & site'},
  {id:2,title:'Towers Config',description:'Dynamic floor planning'},
  {id:3,title:'Review & Submit',description:'Audit & final commit'},
];

export const MultiStepProjectWizard:React.FC=()=>{
  const [currentStep,setCurrentStep]=useState<number>(1);
  const [submittedData,setSubmittedData]=useState<FullProjectForm|null>(null);

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
    mode:'onTouched',
    defaultValues:{
      name:'',
      code:'PRJ-HYD',
      location:'',
      targetDate:'',
      clientName:'',
      towers:[
        {name:'Tower Alpha',floorCount:14,estimatedBudget:25000000},
      ],
      projectNotes:'',
    },
  });

  const {fields,append,remove}=useFieldArray({
    control,
    name:'towers',
  });

  const handleNext=async()=>{
    if(currentStep===1){
      const valid=await trigger(['name','code','location','targetDate','clientName']);
      if(valid) setCurrentStep(2);
    }else if(currentStep===2){
      const valid=await trigger(['towers']);
      if(valid) setCurrentStep(3);
    }
  };

  const handlePrev=()=>{
    if(currentStep>1) setCurrentStep((prev)=>prev-1);
  };

  const onSubmit=(data:FullProjectForm)=>{
    setSubmittedData(data);
  };

  const handleReset=()=>{
    reset();
    setSubmittedData(null);
    setCurrentStep(1);
  };

  const values=getValues();
  const totalFloors=(values.towers||[]).reduce((sum,t)=>sum+Number(t.floorCount||0),0);
  const totalBudget=(values.towers||[]).reduce((sum,t)=>sum+Number(t.estimatedBudget||0),0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exercise 1: React Hook Form + Zod Multi-Step Wizard</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Create Construction Project</h2>
        <p className="text-sm text-slate-400">Configure site master data and dynamic towers with atomic step validation.</p>
      </div>

      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
        <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={(s)=>setCurrentStep(s)} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* STEP 1: Basic Information */}
          {currentStep===1&&(
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-3 text-left">
                <h3 className="text-lg font-semibold text-slate-100">Step 1: General Project Identity</h3>
                <p className="text-xs text-slate-400">Enter project naming, code registration, and target completion timeline.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Project Name" htmlFor="name" required error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Skyline Heights Phase 2"
                    {...register('name')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder:text-slate-600 transition-colors ${
                      errors.name?'border-rose-500 focus:border-rose-500':'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                </FormField>

                <FormField label="Project Code" htmlFor="code" required hint="Format: PRJ-XXX" error={errors.code?.message}>
                  <input
                    id="code"
                    type="text"
                    placeholder="e.g. PRJ-HYD01"
                    {...register('code')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder:text-slate-600 uppercase transition-colors ${
                      errors.code?'border-rose-500 focus:border-rose-500':'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                </FormField>

                <FormField label="Location / City" htmlFor="location" required error={errors.location?.message}>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g. Financial District, Hyderabad"
                    {...register('location')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder:text-slate-600 transition-colors ${
                      errors.location?'border-rose-500 focus:border-rose-500':'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                </FormField>

                <FormField label="Client / Developer" htmlFor="clientName" required error={errors.clientName?.message}>
                  <input
                    id="clientName"
                    type="text"
                    placeholder="e.g. Apex Infrastructures Ltd"
                    {...register('clientName')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder:text-slate-600 transition-colors ${
                      errors.clientName?'border-rose-500 focus:border-rose-500':'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <FormField label="Target Completion Date" htmlFor="targetDate" required hint="Must be in future" error={errors.targetDate?.message}>
                    <input
                      id="targetDate"
                      type="date"
                      {...register('targetDate')}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 transition-colors ${
                        errors.targetDate?'border-rose-500 focus:border-rose-500':'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Towers Dynamic Configuration */}
          {currentStep===2&&(
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-slate-100">Step 2: Tower Planning & Floor Allocations</h3>
                  <p className="text-xs text-slate-400">Configure tower units dynamically using React Hook Form's useFieldArray.</p>
                </div>
                <button
                  type="button"
                  onClick={()=>append({name:`Tower ${String.fromCharCode(65+fields.length)}`,floorCount:10,estimatedBudget:15000000})}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Tower
                </button>
              </div>

              {errors.towers?.root&&(
                <div role="alert" className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  {errors.towers.root.message}
                </div>
              )}

              <div className="space-y-3">
                {fields.map((field,index)=>(
                  <div key={field.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-bold text-xs">
                      #{index+1}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full text-left">
                      <FormField label="Tower Name" htmlFor={`tower-${index}-name`} error={errors.towers?.[index]?.name?.message}>
                        <input
                          id={`tower-${index}-name`}
                          type="text"
                          placeholder="e.g. Tower A"
                          {...register(`towers.${index}.name` as const)}
                          className="w-full px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:border-blue-500"
                        />
                      </FormField>

                      <FormField label="Floor Count" htmlFor={`tower-${index}-floors`} error={errors.towers?.[index]?.floorCount?.message}>
                        <input
                          id={`tower-${index}-floors`}
                          type="number"
                          min="1"
                          max="120"
                          placeholder="1-120"
                          {...register(`towers.${index}.floorCount` as const)}
                          className="w-full px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-blue-500"
                        />
                      </FormField>

                      <FormField label="Budget (INR)" htmlFor={`tower-${index}-budget`} error={errors.towers?.[index]?.estimatedBudget?.message}>
                        <input
                          id={`tower-${index}-budget`}
                          type="number"
                          placeholder="Cost estimate"
                          {...register(`towers.${index}.estimatedBudget` as const)}
                          className="w-full px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-blue-500"
                        />
                      </FormField>
                    </div>

                    {fields.length>1&&(
                      <button
                        type="button"
                        onClick={()=>remove(index)}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        aria-label={`Remove tower ${index+1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {currentStep===3&&(
            <div className="space-y-5 animate-in fade-in duration-300 text-left">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-semibold text-slate-100">Step 3: Review Project Specification</h3>
                <p className="text-xs text-slate-400">Verify all attributes prior to database persistence.</p>
              </div>

              {/* Summary KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Project Code</p>
                  <p className="text-sm font-bold text-blue-400 mt-0.5">{values.code||'N/A'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Configured Towers</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{values.towers?.length||0} Blocks</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Total Floors</p>
                  <p className="text-sm font-bold text-amber-400 mt-0.5">{totalFloors} Floors</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Total Estimated Budget</p>
                  <p className="text-sm font-bold text-indigo-400 mt-0.5">₹{(totalBudget/10000000).toFixed(2)} Cr</p>
                </div>
              </div>

              {/* Review details */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Project Name:</span>
                  <span className="font-semibold text-slate-200">{values.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-200">{values.location}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Target Date:</span>
                  <span className="font-semibold text-slate-200">{values.targetDate}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Client / Developer:</span>
                  <span className="font-semibold text-slate-200">{values.clientName}</span>
                </div>
              </div>

              {/* Additional Project Remarks */}
              <FormField label="Additional Project Remarks (Optional)" htmlFor="projectNotes" error={errors.projectNotes?.message}>
                <textarea
                  id="projectNotes"
                  rows={2}
                  placeholder="Environmental clearance notes, soil test references..."
                  {...register('projectNotes')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500"
                />
              </FormField>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {currentStep>1?(
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Step
              </button>
            ):<div />}

            {currentStep<3?(
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                Continue to Step {currentStep+1}
                <ArrowRight className="w-4 h-4" />
              </button>
            ):(
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isSubmitting?'Submitting...':'Commit & Submit Project'}
              </button>
            )}
          </div>
        </form>

        {/* Submission Success Dialog */}
        {submittedData&&(
          <div className="mt-6 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                Project Registered Successfully!
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                Create Another Project
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-emerald-300/90 overflow-x-auto">
              {JSON.stringify(submittedData,null,2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
