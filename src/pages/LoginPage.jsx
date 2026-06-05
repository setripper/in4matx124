import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { apiRequest, saveSession } from '../lib/api.js';

export default function LoginPage() {
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event, requestedRole) {
    event.preventDefault();
    setBusy(true);
    setStatus('');

    try {
      const session = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (session.user.role !== requestedRole) {
        throw new Error(`This account is registered as ${session.user.role}.`);
      }
      saveSession(session);
      navigate(requestedRole === 'admin' ? '/admin-dashboard' : '/employee-dashboard');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-figma-shell">
      <Header />
      <main className="auth-figma-page">
        <section className="auth-figma-panel" aria-labelledby="login-title">
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to access your account</p>

          <form className="login-figma-card" onSubmit={(event) => handleSubmit(event, 'admin')}>
            <label htmlFor="login-email">Email Address</label>
            <div className="field-with-icon">
              <span aria-hidden="true">@</span>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="user@example.com"
                value={form.email}
                onChange={updateField}
                required
              />
            </div>

            <label htmlFor="login-password">Password</label>
            <div className="field-with-icon">
              <span aria-hidden="true">*</span>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={updateField}
                required
              />
            </div>

            <div className="login-options">
              <label className="check-row" htmlFor="remember">
                <input
                  checked={remember}
                  id="remember"
                  onChange={() => setRemember((current) => !current)}
                  type="checkbox"
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>

            <button
              className="button button-primary form-button"
              type="submit"
              disabled={busy}
            >
              Sign in as Admin
            </button>
            <button
              className="button button-secondary form-button auth-secondary-button"
              type="button"
              disabled={busy}
              onClick={(event) => handleSubmit(event, 'employee')}
            >
              Sign in as Employee
            </button>

            <p className="demo-credentials">
              Demo: admin@example.com or employee@example.com / Password123!
            </p>
            <div className="form-status" role="status" aria-live="polite">{status}</div>

            <p className="auth-footer-line">
              Don't have an account? <Link to="/register">Create one now</Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
