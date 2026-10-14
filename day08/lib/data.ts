export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'delayed';
  towers: { id: string; name: string; floors: number }[];
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Skyline Residency',
    status: 'active',
    towers: [
      { id: 't1', name: 'Tower A', floors: 20 },
      { id: 't2', name: 'Tower B', floors: 15 }
    ]
  },
  {
    id: '2',
    name: 'Metro Logistics Park',
    status: 'active',
    towers: [
      { id: 't1', name: 'Warehouse 1', floors: 3 }
    ]
  },
  {
    id: '3',
    name: 'Green Valley Villas',
    status: 'completed',
    towers: [
      { id: 't1', name: 'Clubhouse', floors: 2 }
    ]
  }
];

export async function getProjects(status?: string) {
  if (!status || status === 'all') return projects;
  return projects.filter(p => p.status === status);
}

export async function getProject(id: string) {
  return projects.find(p => p.id === id);
}

export async function getTower(projectId: string, towerId: string) {
  const p = await getProject(projectId);
  const tower = p?.towers.find(t => t.id === towerId);
  return { project: p, tower };
}
