import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function LoginPage() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event, destination) {
    event.preventDefault();
    navigate(destination);
  }

  return (
    <div className="auth-figma-shell">
      <Header />
      <main className="auth-figma-page">
        <section className="auth-figma-panel" aria-labelledby="login-title">
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to access your account</p>

          <form className="login-figma-card">
            <label htmlFor="login-email">Email Address</label>
            <div className="field-with-icon">
              <span aria-hidden="true">@</span>
              <input id="login-email" type="email" placeholder="user@example.com" />
            </div>

            <label htmlFor="login-password">Password</label>
            <div className="field-with-icon">
              <span aria-hidden="true">*</span>
              <input id="login-password" type="password" placeholder="Password" />
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
              onClick={(event) => handleSubmit(event, '/admin-dashboard')}
            >
              Sign in as Admin
            </button>
            <button
              className="button button-secondary form-button auth-secondary-button"
              type="submit"
              onClick={(event) => handleSubmit(event, '/employee-dashboard')}
            >
              Sign in as Employee
            </button>

            <p className="auth-footer-line">
              Don't have an account? <Link to="/register">Create one now</Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
