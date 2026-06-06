# Workforce Management System

Full-stack workforce management prototype built with React, Vite, Node.js, Express, JWT authentication, and PostgreSQL.

Live deployment: [in4matx124-workforce.vercel.app](https://in4matx124-workforce.vercel.app)

## Features

- Real registration and login with hashed passwords and JWT sessions
- Admin and employee role authorization
- Public registration creates employee accounts; admin access uses the seeded admin account
- PostgreSQL-backed employee create, read, update, and delete operations
- Database-backed contact form submissions
- Responsive React frontend
- API and client tests
- Vercel-ready frontend and Express deployment

## Run locally

```bash
npm install
npm run dev
```

The frontend runs on `http://127.0.0.1:5173` and the API runs on `http://127.0.0.1:3001`.
Without `DATABASE_URL`, local development uses a temporary in-memory PostgreSQL-compatible database.

Demo accounts:

- Admin: `admin@example.com` / `Password123!`
- Employee: `employee@example.com` / `Password123!`

## Commands

```bash
npm test
npm run build
npm run dev
npm start
```

## API endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/employees` - admin only
- `PUT /api/employees/:id` - admin only
- `DELETE /api/employees/:id` - admin only
- `POST /api/contact`

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Create a PostgreSQL database through the Vercel Marketplace, such as Neon.
3. Add `DATABASE_URL`, `JWT_SECRET`, and `SEED_DEMO_DATA=true` to the Vercel project environment variables.
4. Deploy the project. Vercel automatically provides HTTPS and runtime logs.
