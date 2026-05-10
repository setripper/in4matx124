import FeatureIcon from './FeatureIcon.jsx';

const features = [
  {
    title: 'Employee Management',
    type: 'employees',
    description:
      'Track and manage employee information, roles, and performance with comprehensive profiles and analytics',
  },
  {
    title: 'Schedule & Tasks',
    type: 'calendar',
    description:
      'Create schedules, assign tasks, and track progress in real-time with drag-and-drop functionality',
  },
  {
    title: 'Payroll & Finance',
    type: 'payroll',
    description:
      'Automate payroll processing and manage financial records with built-in compliance tools',
  },
  {
    title: 'Attendance Tracking',
    type: 'attendance',
    description:
      'Monitor employee attendance with clock-in/out functionality and automated timesheet generation',
  },
  {
    title: 'Analytics & Reports',
    type: 'analytics',
    description:
      'Generate insights and reports on workforce performance with customizable dashboards',
  },
  {
    title: 'Secure & Compliant',
    type: 'secure',
    description:
      'Enterprise-grade security with role-based access control and data encryption',
  },
];

export default function Features({ selectedFeature, onSelectFeature }) {
  return (
    <section className="features-section" aria-labelledby="features-title">
      <div className="section-container">
        <div className="section-heading">
          <h2 id="features-title">Everything you need</h2>
          <p>Powerful features to streamline your workforce operations</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <button
              className={`feature-card ${selectedFeature === feature.title ? 'is-selected' : ''}`}
              type="button"
              key={feature.title}
              onClick={() => onSelectFeature(feature.title)}
              aria-pressed={selectedFeature === feature.title}
            >
              <FeatureIcon type={feature.type} />
              <span className="feature-title">{feature.title}</span>
              <span className="feature-description">{feature.description}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
