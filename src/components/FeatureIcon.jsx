const icons = {
  employees: (
    <>
      <circle cx="9" cy="8" r="2.3" />
      <path d="M4.8 17.3c.45-2.65 2-4 4.2-4s3.75 1.35 4.2 4" />
      <circle cx="16.5" cy="9.2" r="1.8" />
      <path d="M14.8 13.7c1.9.15 3.15 1.35 3.55 3.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="4.5" y="5.7" width="15" height="13.5" rx="2" />
      <path d="M8 3.9v3.4M16 3.9v3.4M5 10h14" />
    </>
  ),
  payroll: (
    <>
      <path d="M12 4v16M16 7.5h-5.2a2.4 2.4 0 0 0 0 4.8h2.4a2.4 2.4 0 0 1 0 4.8H8" />
    </>
  ),
  attendance: (
    <>
      <circle cx="12" cy="12" r="7.3" />
      <path d="M12 7.8v4.45l3.1 1.8" />
    </>
  ),
  analytics: (
    <>
      <path d="M5 16.8l4.2-4.2 2.9 2.7L18.8 8.5" />
      <path d="M15.4 8.5h3.4v3.4" />
    </>
  ),
  secure: (
    <>
      <path d="M12 4.5l6 2.2v4.7c0 3.9-2.4 6.7-6 8.1-3.6-1.4-6-4.2-6-8.1V6.7l6-2.2Z" />
    </>
  ),
};

export default function FeatureIcon({ type }) {
  return (
    <span className="feature-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        {icons[type]}
      </svg>
    </span>
  );
}
