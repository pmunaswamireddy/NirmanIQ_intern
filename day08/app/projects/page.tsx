import Link from 'next/link';
import { getProjects } from '../../lib/data';

interface PageProps {
  searchParams: Promise<{ status?: string }> | { status?: string };
}

// Exercise 1 & 4: Projects list reading ?status= query param
export default async function ProjectsPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const statusFilter = resolved?.status;
  const filteredProjects = await getProjects(statusFilter);

  return (
    <div>
      <h1>Projects List</h1>

      {/* Exercise 4: Search Param Filter Links */}
      <div className="filter-buttons">
        <Link href="/projects" className={!statusFilter ? 'active-filter' : ''}>All</Link>
        <Link href="/projects?status=active" className={statusFilter === 'active' ? 'active-filter' : ''}>Active</Link>
        <Link href="/projects?status=completed" className={statusFilter === 'completed' ? 'active-filter' : ''}>Completed</Link>
      </div>

      <div className="project-list">
        {filteredProjects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.name}</h3>
            <p>Status: <span className="status-tag">{p.status}</span></p>
            <p>Towers: {p.towers.length}</p>
            <Link href={`/projects/${p.id}`}>View Project Detail &rarr;</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
