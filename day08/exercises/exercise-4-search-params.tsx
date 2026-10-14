import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  status: string;
}

// Exercise 4: Read ?status=active query param and filter
export function ProjectFilterSection({
  projects,
  currentStatus
}: {
  projects: Project[];
  currentStatus?: string;
}) {
  const filtered = currentStatus && currentStatus !== 'all'
    ? projects.filter((p) => p.status === currentStatus)
    : projects;

  return (
    <div>
      <div className="filter-buttons">
        <Link href="/projects" className={!currentStatus || currentStatus === 'all' ? 'active-filter' : ''}>
          All
        </Link>
        <Link href="/projects?status=active" className={currentStatus === 'active' ? 'active-filter' : ''}>
          Active
        </Link>
        <Link href="/projects?status=completed" className={currentStatus === 'completed' ? 'active-filter' : ''}>
          Completed
        </Link>
      </div>

      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            {p.name} — <strong>{p.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
