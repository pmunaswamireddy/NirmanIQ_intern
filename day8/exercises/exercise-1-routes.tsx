import Link from 'next/link';

// Exercise 1: App Router Pages
// 1. Dashboard Page (/)
export function DashboardView({ totalProjects, activeProjects }: { totalProjects: number; activeProjects: number }) {
  return (
    <div>
      <h1>Site Dashboard</h1>
      <p>Total Projects: {totalProjects} | Active: {activeProjects}</p>
      <Link href="/projects">Go to Projects &rarr;</Link>
    </div>
  );
}

// 2. Projects List Page (/projects)
export function ProjectListView({ projects }: { projects: { id: string; name: string; status: string }[] }) {
  return (
    <div>
      <h1>All Projects</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`}>{p.name} - {p.status}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 3. Project Detail Page (/projects/[id])
export function ProjectDetailView({ id, name, towers }: { id: string; name: string; towers: { id: string; name: string }[] }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Project ID: {id}</p>
      <h3>Towers:</h3>
      <ul>
        {towers.map((t) => (
          <li key={t.id}>
            <Link href={`/projects/${id}/towers/${t.id}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 4. Tower Detail Page (/projects/[id]/towers/[towerId])
export function TowerDetailView({ towerName, floors }: { towerName: string; floors: number }) {
  return (
    <div>
      <h1>{towerName}</h1>
      <p>Floors: {floors}</p>
    </div>
  );
}
