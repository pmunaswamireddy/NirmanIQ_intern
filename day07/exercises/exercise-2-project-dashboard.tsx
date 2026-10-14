// Day 7 - Exercise 2: ProjectDashboard Component
// Author: Penumuru Madhu Sudhan Reddy
import React from 'react';
import { useFetch } from './exercise-1-use-fetch';

export interface Project {
  name: string;
  progress: number;
  budget: string;
  status: string;
}

const defaultProject: Project={
  name: "Apex Tower A",
  progress: 75,
  budget: "$5.0M",
  status: "In Progress"
};

export function ProjectDashboard({ url }: { url?: string }){
  const { data,loading,error }=useFetch<Project>(url||'');
  const project=data||defaultProject;

  if(loading)return <p>Loading project data...</p>;
  if(error)return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ border: '1px solid #ccc',padding: '16px',borderRadius: '8px',maxWidth: '400px' }}>
      <h3>{project.name}</h3>
      <p>Status: <strong>{project.status}</strong></p>
      <p>Progress: {project.progress}%</p>
      <div style={{ background: '#eee',height: '10px',borderRadius: '5px' }}>
        <div style={{ width: `${project.progress}%`,height: '100%',background: '#10b981',borderRadius: '5px' }} />
      </div>
      <p>Budget: {project.budget}</p>
    </div>
  );
}
