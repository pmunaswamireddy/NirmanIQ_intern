import React from 'react';
import {AlertCircle} from 'lucide-react';

interface FormFieldProps {
  label:string;
  htmlFor:string;
  error?:string;
  hint?:string;
  required?:boolean;
  children:React.ReactNode;
}

export const FormField:React.FC<FormFieldProps>=({
  label,
  htmlFor,
  error,
  hint,
  required=false,
  children,
})=>{
  const errorId=`${htmlFor}-error`;
  const hintId=`${htmlFor}-hint`;

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required&&<span className="text-rose-400">*</span>}
        </label>
        {hint&&!error&&<span id={hintId} className="text-xs text-slate-500">{hint}</span>}
      </div>

      <div className="relative">
        {children}
      </div>

      {error&&(
        <div id={errorId} role="alert" aria-live="polite" className="flex items-center gap-1.5 text-xs text-rose-400 font-medium mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
