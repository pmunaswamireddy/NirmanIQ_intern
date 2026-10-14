export default function ProjectDetailLoading() {
  return (
    <div className="skeleton-container">
      <div style={{ width: '120px', height: '16px', marginBottom: '16px' }} className="skeleton"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div style={{ height: '200px', borderRadius: '12px', marginBottom: '24px' }} className="skeleton"></div>
      <div className="skeleton-grid">
        <div className="skeleton skeleton-card"></div>
        <div className="skeleton skeleton-card"></div>
      </div>
    </div>
  );
}
