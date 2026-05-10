import AppShell, { PageHeader, Panel, StatusBadge } from '../components/AppShell.jsx';

const shifts = [
  ['Today - Morning Shift', '8 AM - 4 PM', 'ACTIVE'],
  ['Apr 18 - Morning Shift', '8 AM - 4 PM', 'SCHEDULED'],
  ['Apr 19 - Afternoon Shift', '12 PM - 8 PM', 'SCHEDULED'],
  ['Apr 20 - Morning Shift', '8 AM - 4 PM', 'SCHEDULED'],
];

const tasks = [
  ['Complete Monthly Sales Report', 'HIGH', 'Due Apr 20', 60],
  ['Update Customer Database', 'MEDIUM', 'Due Apr 25', 30],
  ['Review Team Performance', 'LOW', 'Due May 1', 10],
];

const announcements = [
  ['Company Holiday - Memorial Day', 'Office will be closed on Monday, May 25th for Memorial Day.'],
  ['New HR Policy Updates', 'Please review the updated employee handbook and policy changes.'],
];

function taskTone(priority) {
  if (priority === 'HIGH') return 'rose';
  if (priority === 'MEDIUM') return 'amber';
  return 'blue';
}

export default function EmployeeDashboardPage() {
  return (
    <AppShell variant="employee" activeKey="employee-dashboard">
      <PageHeader title="Dashboard" />

      <section className="employee-welcome">
        <h2>Welcome back, John Doe!</h2>
        <p>Here is your work summary for today.</p>
      </section>

      <div className="employee-dashboard-grid">
        <Panel title="Upcoming Shifts">
          <div className="shift-list">
            {shifts.map(([title, time, status]) => (
              <article className="shift-row" key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{time}</p>
                </div>
                <StatusBadge tone={status === 'ACTIVE' ? 'green' : 'neutral'}>{status}</StatusBadge>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Quick Actions" className="employee-actions-panel">
          <div className="employee-action-list">
            <button className="button button-primary" type="button">Clock In</button>
            <button className="button button-secondary" type="button">View Schedule</button>
            <button className="button button-secondary" type="button">Request Time-Off</button>
            <button className="button button-secondary" type="button">View Payslips</button>
          </div>
        </Panel>
      </div>

      <Panel title="Earnings Overview" className="earnings-panel">
        <div className="earnings-grid">
          <div><span>This Month</span><strong>$4,250</strong></div>
          <div><span>Last 3 Months</span><strong>$12,750</strong></div>
          <div><span>Last 6 Months</span><strong>$25,500</strong></div>
          <div><span>Last 12 Months</span><strong>$51,000</strong></div>
        </div>
      </Panel>

      <div className="employee-dashboard-grid lower">
        <Panel title="Assigned Tasks">
          <div className="assigned-task-list">
            {tasks.map(([title, priority, due, progress]) => (
              <article className="assigned-task" key={title}>
                <div>
                  <h3>{title}</h3>
                  <StatusBadge tone={taskTone(priority)}>{priority}</StatusBadge>
                </div>
                <p>{due}</p>
                <div className="progress-row">
                  <span>Progress</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Announcements">
          <div className="announcement-list compact-announcements">
            {announcements.map(([title, body]) => (
              <article className="announcement-item" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
