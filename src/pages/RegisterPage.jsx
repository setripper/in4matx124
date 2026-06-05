import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { apiRequest, saveSession } from '../lib/api.js';

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!agreed) {
      setStatus('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setStatus('Passwords do not match.');
      return;
    }

    setBusy(true);
    setStatus('');
    try {
      const session = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      saveSession(session);
      navigate(session.user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-figma-shell">
      <Header />
      <main className="auth-figma-page register-page">
        <section className="auth-figma-panel" aria-labelledby="register-title">
          <h1 className="wire-title" id="register-title">CREATE ACCOUNT</h1>
          <p>Sign up to get started with our platform</p>

          <form className="register-wire-card" onSubmit={handleSubmit}>
            <label htmlFor="register-name">FULL NAME</label>
            <input id="register-name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={updateField} required />

            <label htmlFor="register-email">EMAIL ADDRESS</label>
            <input id="register-email" name="email" type="email" placeholder="user@example.com" value={form.email} onChange={updateField} required />

            <label htmlFor="register-company">COMPANY / ORGANIZATION</label>
            <input id="register-company" name="company" type="text" placeholder="Company Name" value={form.company} onChange={updateField} required />

            <label htmlFor="register-password">PASSWORD</label>
            <input id="register-password" name="password" type="password" placeholder="Password" value={form.password} onChange={updateField} minLength="8" required />

            <label htmlFor="register-confirm">CONFIRM PASSWORD</label>
            <input id="register-confirm" name="confirmPassword" type="password" placeholder="Password" value={form.confirmPassword} onChange={updateField} minLength="8" required />

            <label className="wire-check-row" htmlFor="register-terms">
              <input
                checked={agreed}
                id="register-terms"
                onChange={() => setAgreed((current) => !current)}
                type="checkbox"
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button className="button button-primary form-button" type="submit" disabled={busy}>
              CREATE ACCOUNT
            </button>
            <div className="form-status" role="status" aria-live="polite">{status}</div>
          </form>

          <p className="auth-footer-line wire-footer-line">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
