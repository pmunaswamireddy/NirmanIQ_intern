'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProjects, Project } from './api';

// Exercise 1: Custom hook wrapping useQuery
export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
}
