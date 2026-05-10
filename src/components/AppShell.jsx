import { Link, NavLink } from 'react-router-dom';

const adminLinks = [
  { key: 'dashboard', label: 'Dashboard', to: '/admin-dashboard', icon: 'grid' },
  { key: 'employees', label: 'Employee Management', to: '/admin-employees', icon: 'users' },
  { key: 'payroll', label: 'Payroll & Finance', to: '/admin-payroll', icon: 'money' },
  { key: 'scheduler', label: 'Schedule & Tasks', to: '/admin-scheduler', icon: 'calendar' },
  { key: 'settings', label: 'Settings', to: '/profile', icon: 'settings' },
];

const employeeLinks = [
  { key: 'employee-dashboard', label: 'Dashboard', to: '/employee-dashboard', icon: 'grid' },
  { key: 'employee-schedule', label: 'My Schedule & Tasks', to: '/employee-schedule', icon: 'calendar' },
  { key: 'requests', label: 'Requests', to: '/employee-schedule', icon: 'file' },
  { key: 'settings', label: 'Settings', to: '/profile', icon: 'settings' },
];

function Glyph({ name }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.8',
  };

  if (name === 'users') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path {...common} d="M16 19v-1.5a3.5 3.5 0 0 0-7 0V19" />
        <circle {...common} cx="12.5" cy="8" r="3.5" />
        <path {...common} d="M4 18v-1a3 3 0 0 1 4-2.8M20 18v-1a3 3 0 0 0-4-2.8" />
      </svg>
    );
  }

  if (name === 'money') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect {...common} x="3" y="6" width="18" height="12" rx="2" />
        <circle {...common} cx="12" cy="12" r="3" />
        <path {...common} d="M6.5 9v6M17.5 9v6" />
      </svg>
    );
  }

  if (name === 'calendar') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect {...common} x="4" y="5" width="16" height="15" rx="2" />
        <path {...common} d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  }

  if (name === 'settings') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle {...common} cx="12" cy="12" r="3" />
        <path {...common} d="M19 12a7.8 7.8 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a8 8 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7.8 7.8 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 3.1h5l.3-3.1a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" />
      </svg>
    );
  }

  if (name === 'file') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path {...common} d="M7 3h7l4 4v14H7z" />
        <path {...common} d="M14 3v5h5M9.5 13h5M9.5 16h4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect {...common} x="4" y="4" width="6" height="6" rx="1" />
      <rect {...common} x="14" y="4" width="6" height="6" rx="1" />
      <rect {...common} x="4" y="14" width="6" height="6" rx="1" />
      <rect {...common} x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="app-page-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? <div className="app-page-action">{action}</div> : null}
    </div>
  );
}

export function StatusBadge({ children, tone = 'neutral' }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}

export function Panel({ title, children, className = '', action }) {
  return (
    <section className={`app-panel ${className}`} aria-label={title}>
      {(title || action) && (
        <div className="panel-heading">
          {title ? <h2>{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export default function AppShell({ variant = 'admin', activeKey, children }) {
  const links = variant === 'employee' ? employeeLinks : adminLinks;

  return (
    <div className="workspace-shell">
      <header className="app-topbar">
        <Link className="app-brand" to="/">
          WORKFORCE MANAGEMENT SYSTEM
        </Link>
        <div className="topbar-actions" aria-label="Account controls">
          <button className="topbar-icon has-dot" type="button" aria-label="Notifications">
            <Glyph name="file" />
          </button>
          <Link className="topbar-icon" to="/profile" aria-label="Profile">
            <Glyph name="users" />
          </Link>
          <Link className="topbar-icon" to="/login" aria-label="Log out">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M9 6H5v12h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              <path d="M14 8l4 4-4 4M18 12H9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="workspace-body">
        <aside className="app-sidebar">
          <nav aria-label={variant === 'employee' ? 'Employee navigation' : 'Admin navigation'}>
            {links.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `app-sidebar-link ${isActive || activeKey === item.key ? 'is-active' : ''}`
                }
                key={item.key}
                to={item.to}
              >
                <span className="sidebar-icon">
                  <Glyph name={item.icon} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="workspace-main">{children}</main>
      </div>
    </div>
  );
}
