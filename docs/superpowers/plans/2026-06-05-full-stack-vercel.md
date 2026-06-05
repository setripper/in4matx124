# Full-Stack Vercel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tested Node.js backend, PostgreSQL persistence, authentication, employee CRUD, frontend API integration, and Vercel deployment support to the existing React application.

**Architecture:** Keep the Vite React frontend at the repository root and add an Express API under `server/`, exported through `api/index.js` for Vercel. Use PostgreSQL in production through `DATABASE_URL`, with an in-memory PostgreSQL-compatible fallback for local development and automated tests.

**Tech Stack:** React, Vite, Node.js, Express, PostgreSQL, pg, pg-mem, JWT, bcryptjs, Node test runner, Supertest, Vercel.

---

### Task 1: Backend API foundation

**Files:**
- Create: `server/app.js`
- Create: `server/index.js`
- Create: `server/db.js`
- Create: `server/auth.js`
- Create: `server/test/api.test.js`
- Create: `api/index.js`
- Modify: `package.json`

- [ ] Write API tests for health, registration, login, authorization, employee CRUD, and contact submission.
- [ ] Run the tests and confirm they fail because the API does not exist.
- [ ] Implement the Express app, PostgreSQL schema initialization, JWT middleware, and routes.
- [ ] Run the API tests and confirm they pass.

### Task 2: Frontend authentication integration

**Files:**
- Create: `src/lib/api.js`
- Create: `src/components/RequireAuth.jsx`
- Modify: `src/main.jsx`
- Modify: `src/pages/LoginPage.jsx`
- Modify: `src/pages/RegisterPage.jsx`
- Modify: `src/components/AppShell.jsx`

- [ ] Add an API client and session helpers.
- [ ] Connect login and registration forms to the API.
- [ ] Protect admin and employee routes by role.
- [ ] Clear the session when logging out.

### Task 3: Frontend data integration

**Files:**
- Modify: `src/pages/AdminEmployeesPage.jsx`
- Modify: `src/components/ContactForm.jsx`
- Modify: `src/styles.css`

- [ ] Replace static employee data with API-backed list/create/update/delete operations.
- [ ] Submit the homepage contact form to the API.
- [ ] Add loading, error, and form states without changing the existing design direction.

### Task 4: Deployment configuration

**Files:**
- Create: `.env.example`
- Create: `vercel.json`
- Create: `README.md`
- Modify: `vite.config.js`
- Modify: `.gitignore`

- [ ] Configure local API proxying and Vercel rewrites.
- [ ] Document required environment variables, demo accounts, commands, and deployment steps.
- [ ] Verify local development, tests, and the production build.
- [ ] Commit, push, and deploy the application.
