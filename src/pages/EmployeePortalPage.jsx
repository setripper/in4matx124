import { useState } from 'react';
import AppShell, { PageHeader, Panel, StatusBadge } from '../components/AppShell.jsx';

const calendarDays = [
  null,
  null,
  null,
  ...Array.from({ length: 30 }, (_, index) => index + 1),
  null,
  null,
];
const shiftDays = {
  1: '8AM-4PM',
  3: '8AM-4PM',
  4: '12PM-8PM',
  7: '8AM-4PM',
  8: '8AM-4PM',
  10: '12PM-8PM',
  11: '12PM-8PM',
  14: '8AM-4PM',
  15: '12PM-8PM',
  17: '8AM-4PM',
  18: '8AM-4PM',
  21: '8AM-4PM',
  22: '12PM-8PM',
  24: '8AM-4PM',
  25: '12PM-8PM',
};

const tasks = [
  ['Complete Monthly Sales Report', 'Prepare and submit the monthly sales report for the regional team.', 'HIGH PRIORITY', 'Apr 20', 'Manager Smith', 60, 'IN PROGRESS', 'Update Status'],
  ['Update Customer Database', 'Clean up customer records and add missing account details.', 'MEDIUM PRIORITY', 'Apr 25', 'Manager Smith', 30, 'IN PROGRESS', 'Update Status'],
  ['Review Team Performance Metrics', 'Review team performance metrics and identify improvement areas.', 'LOW PRIORITY', 'May 1', 'Director Lee', 10, 'NOT STARTED', 'Start Task'],
];

function priorityTone(priority) {
  if (priority.startsWith('HIGH')) return 'rose';
  if (priority.startsWith('MEDIUM')) return 'amber';
  return 'blue';
}

export default function EmployeePortalPage() {
  const [clockedIn, setClockedIn] = useState(true);

  return (
    <AppShell variant="employee" activeKey="employee-schedule">
      <PageHeader title="MY SCHEDULE & TASKS" />

      <Panel title="TIME TRACKING" className="time-tracking-panel">
        <div className="time-tracking-grid">
          <div>
            <span>CURRENT STATUS</span>
            <strong>{clockedIn ? 'Clocked In' : 'Clocked Out'}</strong>
          </div>
          <div>
            <span>STARTED</span>
            <strong>Today at 8:15 AM</strong>
          </div>
          <div>
            <span>DURATION</span>
            <strong>2 hours 30 minutes</strong>
          </div>
          <div className="time-actions">
            <button
              className={clockedIn ? 'button danger-button' : 'button button-primary'}
              type="button"
              onClick={() => setClockedIn((current) => !current)}
            >
              {clockedIn ? 'CLOCK OUT' : 'CLOCK IN'}
            </button>
            <button className="button button-secondary" type="button">View Timesheet</button>
          </div>
        </div>
      </Panel>

      <Panel title="MY SCHEDULE - APRIL 2026" className="employee-calendar-panel">
        <div className="calendar-toolbar">
          <button type="button">&lt;</button>
          <button type="button">&gt;</button>
          <button type="button">Today</button>
        </div>
        <div className="calendar-grid">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <strong className="calendar-weekday" key={day}>{day}</strong>
          ))}
          {calendarDays.map((day, index) => (
            <article className={day === 17 ? 'calendar-day is-today' : 'calendar-day'} key={`${day || 'blank'}-${index}`}>
              <span>{day}</span>
              {shiftDays[day] ? (
                <div className="calendar-shift">
                  <strong>{shiftDays[day]}</strong>
                  <small>{day === 17 ? 'Morning Shift' : 'Shift'}</small>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="My Assigned Tasks" className="employee-task-detail-panel">
        <div className="task-detail-list">
          {tasks.map(([title, description, priority, due, owner, progress, status, action]) => (
            <article className="task-detail-card" key={title}>
              <div className="task-detail-heading">
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <StatusBadge tone={priorityTone(priority)}>{priority}</StatusBadge>
              </div>
              <div className="task-meta-grid">
                <span>Due {due}</span>
                <span>Assigned by {owner}</span>
                <span>{status}</span>
              </div>
              <div className="progress-row">
                <span>Progress</span>
                <strong>{progress}%</strong>
              </div>
              <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
              <div className="task-card-actions">
                <button className="button button-primary compact-button" type="button">{action}</button>
                <button className="button button-secondary compact-button" type="button">View Details</button>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
