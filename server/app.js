import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import { authenticate, createToken, requireRole } from './auth.js';

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function employeeFromRow(row) {
  return {
    id: row.id,
    employeeCode: row.employee_code,
    name: row.name,
    email: row.email,
    department: row.department,
    position: row.position,
    status: row.status,
    phone: row.phone,
    hireDate: row.hire_date ? new Date(row.hire_date).toISOString().slice(0, 10) : '',
  };
}

function validateEmployee(body) {
  const employee = {
    employeeCode: String(body.employeeCode || '').trim(),
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    department: String(body.department || '').trim(),
    position: String(body.position || '').trim(),
    status: String(body.status || 'ACTIVE').trim().toUpperCase(),
    phone: String(body.phone || '').trim(),
    hireDate: body.hireDate || null,
  };

  if (!employee.employeeCode || !employee.name || !isEmail(employee.email) || !employee.department || !employee.position) {
    return { error: 'Employee code, name, valid email, department, and position are required.' };
  }

  if (!['ACTIVE', 'ON LEAVE'].includes(employee.status)) {
    return { error: 'Employee status must be ACTIVE or ON LEAVE.' };
  }

  return { employee };
}

export function createApp({ pool, jwtSecret = process.env.JWT_SECRET || 'development-secret-change-me' }) {
  const app = express();
  const requireAuthentication = authenticate(jwtSecret);
  const requireAdmin = [requireAuthentication, requireRole('admin')];

  app.use(cors({ origin: true }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.post('/api/auth/register', async (request, response, next) => {
    try {
      const name = String(request.body.name || '').trim();
      const email = String(request.body.email || '').trim().toLowerCase();
      const password = String(request.body.password || '');
      const role = 'employee';

      if (!name || !isEmail(email) || password.length < 8) {
        return response.status(400).json({ error: 'Name, valid email, and a password of at least 8 characters are required.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role`,
        [name, email, passwordHash, role],
      );
      const user = result.rows[0];
      return response.status(201).json({ user, token: createToken(user, jwtSecret) });
    } catch (error) {
      if (error.code === '23505') {
        return response.status(409).json({ error: 'An account with that email already exists.' });
      }
      return next(error);
    }
  });

  app.post('/api/auth/login', async (request, response, next) => {
    try {
      const email = String(request.body.email || '').trim().toLowerCase();
      const password = String(request.body.password || '');
      const result = await pool.query(
        'SELECT id, name, email, role, password_hash FROM users WHERE email = $1',
        [email],
      );
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return response.status(401).json({ error: 'Email or password is incorrect.' });
      }

      const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
      return response.json({ user: safeUser, token: createToken(safeUser, jwtSecret) });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/employees', requireAuthentication, async (_request, response, next) => {
    try {
      const result = await pool.query('SELECT * FROM employees ORDER BY id');
      return response.json({ employees: result.rows.map(employeeFromRow) });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/employees', requireAdmin, async (request, response, next) => {
    try {
      const validation = validateEmployee(request.body);
      if (validation.error) {
        return response.status(400).json({ error: validation.error });
      }
      const employee = validation.employee;
      const result = await pool.query(
        `INSERT INTO employees
          (employee_code, name, email, department, position, status, phone, hire_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [employee.employeeCode, employee.name, employee.email, employee.department, employee.position, employee.status, employee.phone, employee.hireDate],
      );
      return response.status(201).json({ employee: employeeFromRow(result.rows[0]) });
    } catch (error) {
      if (error.code === '23505') {
        return response.status(409).json({ error: 'Employee code and email must be unique.' });
      }
      return next(error);
    }
  });

  app.put('/api/employees/:id', requireAdmin, async (request, response, next) => {
    try {
      const validation = validateEmployee(request.body);
      if (validation.error) {
        return response.status(400).json({ error: validation.error });
      }
      const employee = validation.employee;
      const result = await pool.query(
        `UPDATE employees
         SET employee_code = $1, name = $2, email = $3, department = $4,
             position = $5, status = $6, phone = $7, hire_date = $8
         WHERE id = $9
         RETURNING *`,
        [employee.employeeCode, employee.name, employee.email, employee.department, employee.position, employee.status, employee.phone, employee.hireDate, request.params.id],
      );

      if (!result.rows[0]) {
        return response.status(404).json({ error: 'Employee not found.' });
      }
      return response.json({ employee: employeeFromRow(result.rows[0]) });
    } catch (error) {
      if (error.code === '23505') {
        return response.status(409).json({ error: 'Employee code and email must be unique.' });
      }
      return next(error);
    }
  });

  app.delete('/api/employees/:id', requireAdmin, async (request, response, next) => {
    try {
      const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING id', [request.params.id]);
      if (!result.rows[0]) {
        return response.status(404).json({ error: 'Employee not found.' });
      }
      return response.status(204).end();
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/contact', async (request, response, next) => {
    try {
      const name = String(request.body.name || '').trim();
      const email = String(request.body.email || '').trim().toLowerCase();
      const message = String(request.body.message || '').trim();
      const selectedFeature = String(request.body.selectedFeature || '').trim();

      if (!name || !isEmail(email) || !message || !selectedFeature) {
        return response.status(400).json({ error: 'Name, valid email, message, and selected feature are required.' });
      }

      await pool.query(
        `INSERT INTO contacts (name, email, message, selected_feature)
         VALUES ($1, $2, $3, $4)`,
        [name, email, message, selectedFeature],
      );
      return response.status(201).json({ message: 'Thanks! Your message has been saved.' });
    } catch (error) {
      return next(error);
    }
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: 'An unexpected server error occurred.' });
  });

  return app;
}
