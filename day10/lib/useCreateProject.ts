'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProjectApi, Project } from './api';

// Exercise 2: useMutation with optimistic updates & rollback
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectApi,

    // Step 1: Optimistic update before request completes
    onMutate: async (newProjectData) => {
      // Cancel outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      // Snapshot previous projects value for rollback
      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      // Optimistically insert new project with a temp ID
      if (previousProjects) {
        const optimisticProject: Project = {
          id: `temp-${Date.now()}`,
          ...newProjectData,
        };
        queryClient.setQueryData<Project[]>(['projects'], [optimisticProject, ...previousProjects]);
      }

      // Return context with previous state for rollback on error
      return { previousProjects };
    },

    // Step 2: Rollback on error
    onError: (_err, _newProject, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
    },

    // Step 3: Auto-refetch on success to sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
