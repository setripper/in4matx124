import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/admin-dashboard');
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
            <input id="register-name" type="text" placeholder="John Doe" />

            <label htmlFor="register-email">EMAIL ADDRESS</label>
            <input id="register-email" type="email" placeholder="user@example.com" />

            <label htmlFor="register-company">COMPANY / ORGANIZATION</label>
            <input id="register-company" type="text" placeholder="Company Name" />

            <label htmlFor="register-role">ROLE</label>
            <select id="register-role" defaultValue="">
              <option value="" disabled />
              <option>Administrator</option>
              <option>Manager</option>
              <option>Employee</option>
            </select>

            <label htmlFor="register-password">PASSWORD</label>
            <input id="register-password" type="password" placeholder="Password" />

            <label htmlFor="register-confirm">CONFIRM PASSWORD</label>
            <input id="register-confirm" type="password" placeholder="Password" />

            <label className="wire-check-row" htmlFor="register-terms">
              <input
                checked={agreed}
                id="register-terms"
                onChange={() => setAgreed((current) => !current)}
                type="checkbox"
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button className="button button-primary form-button" type="submit">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="auth-footer-line wire-footer-line">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
