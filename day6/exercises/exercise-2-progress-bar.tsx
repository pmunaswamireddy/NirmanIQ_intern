// Day 6 - Exercise 2: ProgressBar Component
// Author: Penumuru Madhu Sudhan Reddy

import React from 'react';

export type RiskLevel='on-track' | 'at-risk' | 'high-risk' | 'critical';

export interface ProgressBarProps {
  percentage:number;
  riskLevel:RiskLevel;
  label?:string;
}

const colors:Record<RiskLevel,string>={
  'on-track':'#10b981',
  'at-risk':'#f59e0b',
  'high-risk':'#ef4444',
  'critical':'#dc2626'
};

export function ProgressBar({ percentage,riskLevel,label='Progress' }:ProgressBarProps) {
  const pct=Math.min(100,Math.max(0,percentage));
  const barColor=colors[riskLevel];

  return (
    <div style={{ background:'#fff',border:'1px solid #ddd',padding:14,borderRadius:6 }}>
      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
        <strong>{label}</strong>
        <span style={{ color:barColor,fontWeight:'bold',textTransform:'capitalize' }}>
          {riskLevel}
        </span>
      </div>
      <div style={{ background:'#e0e0e0',borderRadius:4,height:10,overflow:'hidden' }}>
        <div style={{ width:`${pct}%`,height:'100%',background:barColor }} />
      </div>
      <div style={{ textAlign:'right',fontSize:12,marginTop:4,color:'#555' }}>
        {pct}%
      </div>
    </div>
  );
}
export default ProgressBar;
