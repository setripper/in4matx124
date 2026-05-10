import AppShell, { PageHeader, Panel, StatusBadge } from '../components/AppShell.jsx';

const metrics = [
  ['TOTAL PAYROLL', '$248,500', 'Current period'],
  ['EMPLOYEES PAID', '248', '100% processed'],
  ['PENDING EXPENSES', '$12,450', '12 requests'],
  ['NEXT PAYROLL', 'Apr 30', '13 days remaining'],
];

const payrollRows = [
  ['Sarah Johnson', 'EMP001', 'Sales', '80', '$35.00', '$2,800', '$560', '$2,240', 'PAID'],
  ['Mike Chen', 'EMP002', 'Engineering', '80', '$45.00', '$3,600', '$720', '$2,880', 'PAID'],
  ['Emily Rodriguez', 'EMP003', 'HR', '72', '$30.00', '$2,160', '$432', '$1,728', 'PENDING'],
  ['David Kim', 'EMP004', 'Finance', '80', '$38.00', '$3,040', '$608', '$2,432', 'PAID'],
  ['Lisa Anderson', 'EMP005', 'Sales', '80', '$28.00', '$2,240', '$448', '$1,792', 'PAID'],
];

const expenses = [
  ['Apr 15, 2026', 'Sarah Johnson', 'Travel', 'Client meeting - Round trip', '$450.00'],
  ['Apr 14, 2026', 'Mike Chen', 'Supplies', 'Office equipment', '$125.00'],
  ['Apr 13, 2026', 'David Kim', 'Training', 'Professional certification', '$850.00'],
];

export default function AdminPayrollPage() {
  return (
    <AppShell activeKey="payroll">
      <PageHeader title="PAYROLL & FINANCE" />

      <section className="wire-metric-grid" aria-label="Payroll metrics">
        {metrics.map(([label, value, note]) => (
          <article className="wire-metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </section>

      <Panel className="payroll-controls">
        <div className="payroll-control-row">
          <label htmlFor="pay-period">PAY PERIOD</label>
          <select id="pay-period" defaultValue="">
            <option value="" disabled />
            <option>Apr 1 - Apr 15, 2026</option>
            <option>Apr 16 - Apr 30, 2026</option>
          </select>
          <button className="button button-secondary compact-button" type="button">Custom Range</button>
          <button className="button button-primary compact-button" type="button">RUN PAYROLL</button>
        </div>
      </Panel>

      <Panel title="Employee Payroll" className="table-panel">
        <div className="table-scroll">
          <table className="figma-table dense-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>ID</th>
                <th>Department</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Gross Pay</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollRows.map((row) => (
                <tr key={row[1]}>
                  {row.slice(0, 8).map((cell) => <td key={cell}>{cell}</td>)}
                  <td><StatusBadge tone={row[8] === 'PAID' ? 'green' : 'amber'}>{row[8]}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Pending Expense Approvals" className="table-panel">
        <div className="table-scroll">
          <table className="figma-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(([date, employee, category, description, amount]) => (
                <tr key={`${date}-${employee}`}>
                  <td>{date}</td>
                  <td>{employee}</td>
                  <td>{category}</td>
                  <td>{description}</td>
                  <td>{amount}</td>
                  <td>
                    <div className="inline-actions">
                      <button type="button">APPROVE</button>
                      <button type="button">DENY</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
