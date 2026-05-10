import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="section-container hero-content">
        <h1 id="hero-title">
          Workforce Management
          <span>Made Simple</span>
        </h1>
        <p>
          Manage employees, tasks, schedules, attendance, payroll, and internal operations in
          one centralized platform
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/register">
            Get Started Free
          </Link>
          <Link className="button button-secondary" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
