export interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  towerCount: number;
}

export const initialProjects: ProjectItem[] = [
  {
    id: '1',
    name: 'Skyline Residency',
    status: 'active',
    progress: 72,
    riskLevel: 'low',
    lastUpdated: '2026-10-07',
    towerCount: 4
  },
  {
    id: '2',
    name: 'Metro Logistics Park',
    status: 'active',
    progress: 45,
    riskLevel: 'medium',
    lastUpdated: '2026-10-05',
    towerCount: 2
  },
  {
    id: '3',
    name: 'Cyber Horizon Tech Hub',
    status: 'on-hold',
    progress: 30,
    riskLevel: 'high',
    lastUpdated: '2026-10-02',
    towerCount: 3
  },
  {
    id: '4',
    name: 'Green Valley Villas',
    status: 'completed',
    progress: 100,
    riskLevel: 'low',
    lastUpdated: '2026-09-28',
    towerCount: 1
  }
];
