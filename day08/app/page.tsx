import Link from 'next/link';
import { getProjects } from '../lib/data';

// Exercise 1: Dashboard page (/)
export default async function DashboardPage() {
  const allProjects = await getProjects();
  const activeCount = allProjects.filter(p => p.status === 'active').length;

  return (
    <div>
      <h1>Site Dashboard</h1>
      <p>Overview of ongoing construction sites.</p>

      <div className="card-row">
        <div className="card">
          <h3>Total Projects</h3>
          <p className="metric">{allProjects.length}</p>
        </div>
        <div className="card">
          <h3>Active Projects</h3>
          <p className="metric">{activeCount}</p>
        </div>
      </div>

      <h2>Quick Access</h2>
      <ul>
        {allProjects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`}>{p.name} ({p.status})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
