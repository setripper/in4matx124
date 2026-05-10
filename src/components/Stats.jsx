const stats = [
  ['10K+', 'Active Users'],
  ['99.9%', 'Uptime'],
  ['24/7', 'Support'],
  ['500+', 'Companies'],
];

export default function Stats() {
  return (
    <section className="stats-section" aria-label="Company statistics">
      <div className="section-container stats-grid">
        {stats.map(([value, label]) => (
          <div className="stat-item" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
