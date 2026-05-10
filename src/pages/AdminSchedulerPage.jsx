import { Fragment, useState } from 'react';
import AppShell, { PageHeader, Panel, StatusBadge } from '../components/AppShell.jsx';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const timeSlots = ['8AM-4PM', '12PM-8PM', '4PM-12AM'];
const shifts = {
  '8AM-4PM-MON': ['Sarah J', 'Morning'],
  '12PM-8PM-MON': ['Lisa A', 'Afternoon'],
  '8AM-4PM-TUE': ['Mike C', 'Morning'],
  '4PM-12AM-TUE': ['James W', 'Evening'],
  '8AM-4PM-WED': ['Sarah J', 'Morning'],
  '12PM-8PM-WED': ['Lisa A', 'Afternoon'],
  '8AM-4PM-THU': ['David K', 'Morning'],
  '12PM-8PM-THU': ['Emily R', 'Afternoon'],
  '4PM-12AM-THU': ['James W', 'Evening'],
  '8AM-4PM-FRI': ['Mike C', 'Morning'],
  '4PM-12AM-FRI': ['David K', 'Evening'],
  '12PM-8PM-SAT': ['Lisa A', 'Afternoon'],
};

const board = [
  {
    title: 'TO DO',
    count: 5,
    items: [
      ['Update employee handbook', 'HIGH', 'Emily R.', 'Apr 20'],
      ['Client presentation prep', 'MED', 'Sarah J.', 'Apr 22'],
      ['Database backup', 'LOW', 'Mike C.', 'Apr 25'],
    ],
  },
  {
    title: 'IN PROGRESS',
    count: 3,
    items: [
      ['Quarterly financial report', 'HIGH', 'David K.', 'Apr 18'],
      ['Website redesign', 'MED', 'Mike C.', 'May 1'],
    ],
  },
  {
    title: 'COMPLETED',
    count: 7,
    items: [
      ['Monthly sales report', 'DONE', 'Sarah J.', 'Completed Apr 15'],
      ['Team training session', 'DONE', 'Emily R.', 'Completed Apr 14'],
    ],
  },
];

function priorityTone(priority) {
  if (priority === 'HIGH') return 'rose';
  if (priority === 'MED') return 'amber';
  if (priority === 'DONE') return 'green';
  return 'blue';
}

export default function AdminSchedulerPage() {
  const [dragEnabled, setDragEnabled] = useState(true);

  return (
    <AppShell activeKey="scheduler">
      <PageHeader title="SCHEDULE & TASK MANAGEMENT" />

      <Panel className="week-controls-panel">
        <div className="week-controls">
          <button type="button" aria-label="Previous week">&lt;</button>
          <strong>WEEK OF APRIL 14-20, 2026</strong>
          <button type="button" aria-label="Next week">&gt;</button>
          <button type="button">Today</button>
          <button className="button button-primary compact-button" type="button">+ ASSIGN SHIFT</button>
        </div>
      </Panel>

      <Panel title="Weekly Schedule" className="schedule-panel-figma">
        <div className="schedule-matrix">
          <div className="schedule-head empty-cell" />
          {days.map((day) => <div className="schedule-head" key={day}>{day}</div>)}
          {timeSlots.map((slot) => (
            <Fragment key={slot}>
              <div className="schedule-time" key={`${slot}-time`}>{slot}</div>
              {days.map((day) => {
                const shift = shifts[`${slot}-${day}`];
                return (
                  <div className="schedule-slot" key={`${slot}-${day}`}>
                    {shift ? (
                      <div className="shift-chip">
                        <strong>{shift[0]}</strong>
                        <span>{shift[1]}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
        <label className="drag-check" htmlFor="drag-enabled">
          <input
            checked={dragEnabled}
            id="drag-enabled"
            onChange={() => setDragEnabled((current) => !current)}
            type="checkbox"
          />
          <span>Drag & Drop Enabled</span>
        </label>
      </Panel>

      <Panel
        title="Task Board"
        className="task-board-panel"
        action={<button className="button button-secondary compact-button" type="button">Create Task</button>}
      >
        <div className="task-board">
          {board.map((column) => (
            <section className="task-column" key={column.title} aria-label={column.title}>
              <h3>{column.title} <span>({column.count})</span></h3>
              {column.items.map(([title, priority, owner, date]) => (
                <article className={priority === 'DONE' ? 'task-card is-done' : 'task-card'} key={title}>
                  <div>
                    <h4>{title}</h4>
                    <StatusBadge tone={priorityTone(priority)}>{priority}</StatusBadge>
                  </div>
                  <p>{owner}</p>
                  <span>{date}</span>
                  {column.title === 'IN PROGRESS' ? <div className="mini-progress"><span /></div> : null}
                </article>
              ))}
            </section>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
