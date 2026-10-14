export default function TowerLoading() {
  return (
    <div className="skeleton-container">
      <div style={{ width: '180px', height: '16px', marginBottom: '16px' }} className="skeleton"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton-grid" style={{ marginBottom: '24px' }}>
        <div className="skeleton" style={{ height: '100px' }}></div>
        <div className="skeleton" style={{ height: '100px' }}></div>
        <div className="skeleton" style={{ height: '100px' }}></div>
      </div>
      <div className="skeleton" style={{ height: '240px', borderRadius: '12px' }}></div>
    </div>
  );
}
