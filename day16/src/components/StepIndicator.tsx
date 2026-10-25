import React from 'react';
import {Check} from 'lucide-react';

interface Step {
  id:number;
  title:string;
  description:string;
}

interface StepIndicatorProps {
  steps:Step[];
  currentStep:number;
  onStepClick?:(step:number)=>void;
}

export const StepIndicator:React.FC<StepIndicatorProps>=({
  steps,
  currentStep,
  onStepClick,
})=>{
  return (
    <nav aria-label="Form Progress" className="w-full mb-8">
      <ol className="flex items-center justify-between w-full relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
        
        {/* Active progress fill line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 transition-all duration-300 z-0"
          style={{width:`${((currentStep-1)/(steps.length-1))*100}%`}}
        />

        {steps.map((step)=>{
          const isCompleted=step.id<currentStep;
          const isCurrent=step.id===currentStep;

          return (
            <li key={step.id} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                disabled={!isCompleted&&!isCurrent}
                onClick={()=>onStepClick&&isCompleted&&onStepClick(step.id)}
                aria-current={isCurrent?'step':undefined}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCompleted
                    ? 'bg-blue-600 text-white hover:bg-blue-500 cursor-pointer shadow-lg shadow-blue-500/20'
                    : isCurrent
                    ? 'bg-blue-500 text-white ring-4 ring-blue-500/20 shadow-md scale-110'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isCompleted?<Check className="w-4 h-4 stroke-[3]" />:step.id}
              </button>
              <div className="mt-2 text-center">
                <p className={`text-xs font-semibold ${isCurrent?'text-blue-400':isCompleted?'text-slate-200':'text-slate-500'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-500 hidden sm:block">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
