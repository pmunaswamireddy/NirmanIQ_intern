import Link from 'next/link';
import { getTower } from '../../../../../lib/data';

interface PageProps {
  params: Promise<{ id: string; towerId: string }> | { id: string; towerId: string };
}

// Exercise 1: Nested Dynamic Route (/projects/[id]/towers/[towerId])
export default async function TowerDetailPage({ params }: PageProps) {
  const { id, towerId } = await params;
  const { project, tower } = await getTower(id, towerId);

  if (!project || !tower) {
    return <div><p>Tower not found.</p><Link href={`/projects/${id}`}>Back to Project</Link></div>;
  }

  return (
    <div>
      <Link href={`/projects/${project.id}`}>&larr; Back to {project.name}</Link>
      <h1>{tower.name}</h1>
      <p>Associated Project: <strong>{project.name}</strong></p>
      <p>Total Floors: <strong>{tower.floors}</strong></p>

      <h3>Floor Grid</h3>
      <div className="floor-grid">
        {Array.from({ length: tower.floors }, (_, i) => (
          <span key={i} className="floor-box">F{i + 1}</span>
        ))}
      </div>
    </div>
  );
}
