import AppShell, { PageHeader, Panel } from '../components/AppShell.jsx';

const stats = [
  { label: 'Total Employees', value: '248', note: '12% from last month', tone: 'green' },
  { label: 'Pending Approvals', value: '17', note: '5 time-off, 12 expenses', tone: 'amber' },
  { label: 'Payroll Status', value: 'Ready', note: 'Next run: Apr 30, 2026', tone: 'blue' },
  { label: 'Open Tasks', value: '34', note: '15 high priority', tone: 'rose' },
];

const actions = ['Add New Employee', 'Create Schedule', 'Assign Task', 'Run Payroll', 'View Reports'];

const announcements = [
  ['Company Holiday - Memorial Day', '2 days ago', 'Office will be closed on Monday, May 25th for Memorial Day.'],
  ['New HR Policy Updates', '5 days ago', 'Please review the updated employee handbook and policy changes.'],
  ['System Maintenance Scheduled', '1 week ago', 'Platform maintenance is planned for Sunday from 2 AM to 4 AM.'],
];

const activity = [
  ['10:30 AM', 'Sarah Johnson', 'Requested time-off', 'Vacation request for May 12-16'],
  ['9:15 AM', 'Mike Chen', 'Completed task', 'Database backup completed'],
  ['8:45 AM', 'Emily Rodriguez', 'Clocked in', 'Started morning shift'],
  ['Yesterday', 'David Kim', 'Clocked out', 'Completed 8-hour shift'],
  ['Yesterday', 'Lisa Anderson', 'Updated profile', 'Changed emergency contact'],
];

export default function DashboardPage() {
  return (
    <AppShell activeKey="dashboard">
      <PageHeader title="Admin Dashboard" subtitle="Welcome back! Here's what's happening today." />

      <section className="metric-grid" aria-label="Admin overview metrics">
        {stats.map((item) => (
          <article className="metric-card" key={item.label}>
            <div className={`metric-icon metric-${item.tone}`} aria-hidden="true" />
            <p>{item.label}</p>
            <strong>{item.value}</strong>
            <span>{item.note}</span>
          </article>
        ))}
      </section>

      <div className="admin-overview-grid">
        <Panel title="Quick Actions">
          <div className="quick-actions">
            {actions.map((action, index) => (
              <button className={index === 0 ? 'quick-action is-primary' : 'quick-action'} type="button" key={action}>
                <span aria-hidden="true">+</span>
                {action}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Announcements">
          <div className="announcement-list">
            {announcements.map(([title, date, body]) => (
              <article className="announcement-item" key={title}>
                <div>
                  <h3>{title}</h3>
                  <span>{date}</span>
                </div>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent Activity" className="table-panel">
        <div className="table-scroll">
          <table className="figma-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Employee</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {activity.map(([time, employee, action, details]) => (
                <tr key={`${time}-${employee}`}>
                  <td>{time}</td>
                  <td>{employee}</td>
                  <td>{action}</td>
                  <td>{details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
