import AppShell, { PageHeader, Panel, StatusBadge } from '../components/AppShell.jsx';

const employees = [
  ['SJ', 'Sarah Johnson', 'EMP001', 'Sales', 'Sales Manager', 'ACTIVE'],
  ['MC', 'Mike Chen', 'EMP002', 'Engineering', 'Senior Developer', 'ACTIVE'],
  ['ER', 'Emily Rodriguez', 'EMP003', 'HR', 'HR Specialist', 'ON LEAVE'],
  ['DK', 'David Kim', 'EMP004', 'Finance', 'Financial Analyst', 'ACTIVE'],
  ['LA', 'Lisa Anderson', 'EMP005', 'Sales', 'Sales Representative', 'ACTIVE'],
  ['JW', 'James Wilson', 'EMP006', 'Engineering', 'DevOps Engineer', 'ACTIVE'],
  ['MG', 'Maria Garcia', 'EMP007', 'HR', 'Recruiter', 'ACTIVE'],
];

export default function AdminEmployeesPage() {
  return (
    <AppShell activeKey="employees">
      <PageHeader
        title="Employee Management"
        subtitle="Manage your team and employee information"
        action={<button className="button button-primary compact-button" type="button">+ Add Employee</button>}
      />

      <Panel className="filter-panel">
        <div className="filter-grid">
          <input aria-label="Search employees" placeholder="Search by name, email, or ID..." type="search" />
          <select aria-label="Department" defaultValue="">
            <option value="" disabled>Department</option>
            <option>Sales</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <select aria-label="Status" defaultValue="">
            <option value="" disabled>Status</option>
            <option>Active</option>
            <option>On Leave</option>
          </select>
        </div>
      </Panel>

      <div className="employee-management-grid">
        <Panel title="Employee Directory" className="table-panel">
          <div className="table-scroll">
            <table className="figma-table employee-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(([initials, name, id, department, position, status]) => (
                  <tr key={id}>
                    <td>
                      <div className="employee-cell">
                        <span className="employee-avatar">{initials}</span>
                        <div>
                          <strong>{name}</strong>
                          <span>{id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{department}</td>
                    <td>{position}</td>
                    <td>
                      <StatusBadge tone={status === 'ACTIVE' ? 'green' : 'amber'}>{status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-row">
            <span>Showing 1-7 of 248</span>
            <div>
              <button type="button">Previous</button>
              <button className="is-current" type="button">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">Next</button>
            </div>
          </div>
        </Panel>

        <Panel title="Employee Preview" className="preview-panel">
          <div className="employee-preview-card">
            <span className="preview-avatar">SJ</span>
            <h3>Sarah Johnson</h3>
            <p>EMP001</p>
          </div>

          <dl className="preview-details">
            <div>
              <dt>Email</dt>
              <dd>sarah.j@company.com</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>(555) 123-4567</dd>
            </div>
            <div>
              <dt>Hire Date</dt>
              <dd>Jan 15, 2023</dd>
            </div>
          </dl>

          <div className="preview-actions">
            <button className="button button-primary" type="button">View Full Profile</button>
            <button className="button button-secondary" type="button">Edit Employee</button>
            <button className="button button-secondary" type="button">View Schedule</button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
