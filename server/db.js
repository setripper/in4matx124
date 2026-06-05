import bcrypt from 'bcryptjs';
import { newDb } from 'pg-mem';
import pg from 'pg';

const { Pool } = pg;

const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    employee_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    position TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    phone TEXT NOT NULL DEFAULT '',
    hire_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    selected_feature TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const demoEmployees = [
  ['EMP001', 'Sarah Johnson', 'sarah.j@company.com', 'Sales', 'Sales Manager', 'ACTIVE', '(555) 123-4567', '2023-01-15'],
  ['EMP002', 'Mike Chen', 'mike.c@company.com', 'Engineering', 'Senior Developer', 'ACTIVE', '(555) 123-4568', '2023-03-20'],
  ['EMP003', 'Emily Rodriguez', 'emily.r@company.com', 'HR', 'HR Specialist', 'ON LEAVE', '(555) 123-4569', '2024-02-12'],
  ['EMP004', 'David Kim', 'david.k@company.com', 'Finance', 'Financial Analyst', 'ACTIVE', '(555) 123-4570', '2024-06-10'],
  ['EMP005', 'Lisa Anderson', 'lisa.a@company.com', 'Sales', 'Sales Representative', 'ACTIVE', '(555) 123-4571', '2025-01-08'],
];

async function seedDatabase(pool) {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4), ($5, $6, $3, $7)
     ON CONFLICT (email) DO NOTHING`,
    ['Admin Demo', 'admin@example.com', passwordHash, 'admin', 'Employee Demo', 'employee@example.com', 'employee'],
  );

  for (const employee of demoEmployees) {
    await pool.query(
      `INSERT INTO employees
        (employee_code, name, email, department, position, status, phone, hire_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (employee_code) DO NOTHING`,
      employee,
    );
  }
}

export async function initializeDatabase(pool, { seedDemoData = true } = {}) {
  await pool.query(schema);
  if (seedDemoData) {
    await seedDatabase(pool);
  }
  return pool;
}

export async function createDatabase({
  memory = !process.env.DATABASE_URL,
  seedDemoData = process.env.SEED_DEMO_DATA !== 'false',
} = {}) {
  let pool;

  if (memory) {
    const memoryDatabase = newDb();
    const adapter = memoryDatabase.adapters.createPg();
    pool = new adapter.Pool();
  } else {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }

  return initializeDatabase(pool, { seedDemoData });
}
