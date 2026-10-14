import Link from 'next/link';
import { getProject } from '../../../lib/data';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

// Exercise 1: Dynamic Route (/projects/[id])
export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return <div><p>Project not found.</p><Link href="/projects">Back to Projects</Link></div>;
  }

  return (
    <div>
      <Link href="/projects">&larr; Back to Projects</Link>
      <h1>{project.name}</h1>
      <p>Status: {project.status}</p>

      <h2>Towers</h2>
      <ul>
        {project.towers.map((tower) => (
          <li key={tower.id}>
            <Link href={`/projects/${project.id}/towers/${tower.id}`}>
              {tower.name} ({tower.floors} floors) &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
