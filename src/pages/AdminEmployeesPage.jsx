import { useEffect, useMemo, useState } from 'react';
import AppShell, { PageHeader, Panel, StatusBadge } from '../components/AppShell.jsx';
import { apiRequest } from '../lib/api.js';

const emptyEmployee = {
  employeeCode: '',
  name: '',
  email: '',
  department: '',
  position: '',
  status: 'ACTIVE',
  phone: '',
  hireDate: '',
};

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editor, setEditor] = useState(null);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('');
  const [status, setStatus] = useState('Loading employees...');
  const [busy, setBusy] = useState(false);

  async function loadEmployees(preferredId) {
    try {
      const response = await apiRequest('/api/employees');
      setEmployees(response.employees);
      setSelectedId(preferredId || response.employees[0]?.id || null);
      setStatus('');
    } catch (error) {
      setStatus(error.message);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          employee.name.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.employeeCode.toLowerCase().includes(query);
        return (
          matchesSearch &&
          (!department || employee.department === department) &&
          (!employeeStatus || employee.status === employeeStatus)
        );
      }),
    [department, employeeStatus, employees, search],
  );

  const selectedEmployee = employees.find((employee) => employee.id === selectedId);

  function updateEditor(event) {
    setEditor((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function saveEmployee(event) {
    event.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      const response = await apiRequest(editor.id ? `/api/employees/${editor.id}` : '/api/employees', {
        method: editor.id ? 'PUT' : 'POST',
        body: JSON.stringify(editor),
      });
      setEditor(null);
      await loadEmployees(response.employee.id);
      setStatus(editor.id ? 'Employee updated.' : 'Employee created.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteEmployee() {
    if (!selectedEmployee || !globalThis.confirm(`Delete ${selectedEmployee.name}?`)) {
      return;
    }
    setBusy(true);
    try {
      await apiRequest(`/api/employees/${selectedEmployee.id}`, { method: 'DELETE' });
      await loadEmployees();
      setStatus('Employee deleted.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell activeKey="employees">
      <PageHeader
        title="Employee Management"
        subtitle="Manage your team and employee information from the PostgreSQL database"
        action={
          <button className="button button-primary compact-button" type="button" onClick={() => setEditor(emptyEmployee)}>
            + Add Employee
          </button>
        }
      />

      <Panel className="filter-panel">
        <div className="filter-grid">
          <input
            aria-label="Search employees"
            placeholder="Search by name, email, or ID..."
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select aria-label="Department" value={department} onChange={(event) => setDepartment(event.target.value)}>
            <option value="">All departments</option>
            <option>Sales</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <select aria-label="Status" value={employeeStatus} onChange={(event) => setEmployeeStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ON LEAVE">On Leave</option>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-cell">
                        <span className="employee-avatar">{initials(employee.name)}</span>
                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.employeeCode}</span>
                        </div>
                      </div>
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>
                      <StatusBadge tone={employee.status === 'ACTIVE' ? 'green' : 'amber'}>{employee.status}</StatusBadge>
                    </td>
                    <td>
                      <button className="row-select-button" type="button" onClick={() => setSelectedId(employee.id)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-row">
            <span>Showing {filteredEmployees.length} of {employees.length}</span>
            <span className="api-status" role="status" aria-live="polite">{status}</span>
          </div>
        </Panel>

        <div className="employee-side-column">
          {editor ? (
            <Panel title={editor.id ? 'Edit Employee' : 'Add Employee'} className="preview-panel">
              <form className="employee-editor-form" onSubmit={saveEmployee}>
                <label htmlFor="employee-code">Employee ID</label>
                <input id="employee-code" name="employeeCode" value={editor.employeeCode} onChange={updateEditor} required />
                <label htmlFor="employee-name">Name</label>
                <input id="employee-name" name="name" value={editor.name} onChange={updateEditor} required />
                <label htmlFor="employee-email">Email</label>
                <input id="employee-email" name="email" type="email" value={editor.email} onChange={updateEditor} required />
                <label htmlFor="employee-department">Department</label>
                <input id="employee-department" name="department" value={editor.department} onChange={updateEditor} required />
                <label htmlFor="employee-position">Position</label>
                <input id="employee-position" name="position" value={editor.position} onChange={updateEditor} required />
                <label htmlFor="employee-status">Status</label>
                <select id="employee-status" name="status" value={editor.status} onChange={updateEditor}>
                  <option value="ACTIVE">Active</option>
                  <option value="ON LEAVE">On Leave</option>
                </select>
                <label htmlFor="employee-phone">Phone</label>
                <input id="employee-phone" name="phone" value={editor.phone} onChange={updateEditor} />
                <label htmlFor="employee-hire-date">Hire Date</label>
                <input id="employee-hire-date" name="hireDate" type="date" value={editor.hireDate || ''} onChange={updateEditor} />
                <div className="employee-editor-actions">
                  <button className="button button-primary compact-button" type="submit" disabled={busy}>Save</button>
                  <button className="button button-secondary compact-button" type="button" onClick={() => setEditor(null)}>Cancel</button>
                </div>
              </form>
            </Panel>
          ) : selectedEmployee ? (
            <Panel title="Employee Preview" className="preview-panel">
              <div className="employee-preview-card">
                <span className="preview-avatar">{initials(selectedEmployee.name)}</span>
                <h3>{selectedEmployee.name}</h3>
                <p>{selectedEmployee.employeeCode}</p>
              </div>

              <dl className="preview-details">
                <div><dt>Email</dt><dd>{selectedEmployee.email}</dd></div>
                <div><dt>Phone</dt><dd>{selectedEmployee.phone || 'Not provided'}</dd></div>
                <div><dt>Hire Date</dt><dd>{selectedEmployee.hireDate || 'Not provided'}</dd></div>
              </dl>

              <div className="preview-actions">
                <button className="button button-primary" type="button" onClick={() => setEditor(selectedEmployee)}>Edit Employee</button>
                <button className="button danger-button" type="button" onClick={deleteEmployee} disabled={busy}>Delete Employee</button>
              </div>
            </Panel>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
