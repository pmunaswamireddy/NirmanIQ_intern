export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  towerCount: number;
}

let mockProjects: Project[] = [
  { id: '1', name: 'Skyline Residency', status: 'active', progress: 70, towerCount: 3 },
  { id: '2', name: 'Metro Logistics Hub', status: 'active', progress: 45, towerCount: 2 },
  { id: '3', name: 'Green Valley Homes', status: 'completed', progress: 100, towerCount: 1 }
];

// Simulated API: GET /projects
export async function fetchProjects(): Promise<Project[]> {
  await new Promise((res) => setTimeout(res, 250));
  return [...mockProjects];
}

// Simulated API: POST /projects
export async function createProjectApi(data: Omit<Project, 'id'>): Promise<Project> {
  await new Promise((res) => setTimeout(res, 300));
  const newProj: Project = {
    id: String(Date.now()),
    ...data
  };
  mockProjects = [newProj, ...mockProjects];
  return newProj;
}
