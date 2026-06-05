import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { createApp } from '../app.js';
import { createDatabase } from '../db.js';

const jwtSecret = 'test-secret';

let app;
let pool;

async function register(user) {
  return request(app).post('/api/auth/register').send(user);
}

beforeEach(async () => {
  pool = await createDatabase({ memory: true, seedDemoData: false });
  app = createApp({ pool, jwtSecret });
});

describe('workforce API', () => {
  test('reports service health', async () => {
    const response = await request(app).get('/api/health');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
  });

  test('registers public users as employees and logs them in', async () => {
    const user = {
      name: 'Ada Admin',
      email: 'ada@example.com',
      password: 'Password123!',
      role: 'admin',
    };

    const registration = await register(user);
    assert.equal(registration.status, 201);
    assert.equal(registration.body.user.email, user.email);
    assert.equal(registration.body.user.role, 'employee');
    assert.ok(registration.body.token);

    const login = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    });
    assert.equal(login.status, 200);
    assert.equal(login.body.user.email, user.email);
    assert.ok(login.body.token);
  });

  test('rejects invalid registration and login credentials', async () => {
    const invalidRegistration = await register({
      name: '',
      email: 'not-an-email',
      password: 'short',
      role: 'admin',
    });
    assert.equal(invalidRegistration.status, 400);

    const invalidLogin = await request(app).post('/api/auth/login').send({
      email: 'missing@example.com',
      password: 'Password123!',
    });
    assert.equal(invalidLogin.status, 401);
  });

  test('allows admins to perform employee CRUD', async () => {
    const passwordHash = await bcrypt.hash('Password123!', 10);
    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)`,
      ['Ada Admin', 'admin@example.com', passwordHash, 'admin'],
    );
    const admin = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'Password123!',
    });
    const authorization = `Bearer ${admin.body.token}`;

    const created = await request(app)
      .post('/api/employees')
      .set('Authorization', authorization)
      .send({
        employeeCode: 'EMP900',
        name: 'Grace Hopper',
        email: 'grace@example.com',
        department: 'Engineering',
        position: 'Staff Engineer',
        status: 'ACTIVE',
        phone: '(555) 555-0199',
        hireDate: '2026-06-05',
      });

    assert.equal(created.status, 201);
    assert.equal(created.body.employee.employeeCode, 'EMP900');

    const listed = await request(app).get('/api/employees').set('Authorization', authorization);
    assert.equal(listed.status, 200);
    assert.equal(listed.body.employees.length, 1);

    const updated = await request(app)
      .put(`/api/employees/${created.body.employee.id}`)
      .set('Authorization', authorization)
      .send({
        ...created.body.employee,
        position: 'Engineering Manager',
        status: 'ON LEAVE',
      });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.employee.position, 'Engineering Manager');
    assert.equal(updated.body.employee.status, 'ON LEAVE');

    const removed = await request(app)
      .delete(`/api/employees/${created.body.employee.id}`)
      .set('Authorization', authorization);
    assert.equal(removed.status, 204);

    const emptyList = await request(app).get('/api/employees').set('Authorization', authorization);
    assert.equal(emptyList.body.employees.length, 0);
  });

  test('prevents employees from changing employee records', async () => {
    const employee = await register({
      name: 'Employee User',
      email: 'employee@example.com',
      password: 'Password123!',
      role: 'employee',
    });

    const response = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${employee.body.token}`)
      .send({
        employeeCode: 'EMP901',
        name: 'Unauthorized User',
        email: 'unauthorized@example.com',
        department: 'Sales',
        position: 'Representative',
        status: 'ACTIVE',
      });

    assert.equal(response.status, 403);
  });

  test('stores public contact submissions', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'Taylor Student',
      email: 'taylor@example.com',
      message: 'I would like to learn more.',
      selectedFeature: 'Employee Management',
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.message, 'Thanks! Your message has been saved.');
  });
});
