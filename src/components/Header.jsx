import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="public-nav">
      <div className="nav-container">
        <NavLink className="brand" to="/" aria-label="Workforce Management System home">
          WORKFORCE MANAGEMENT SYSTEM
        </NavLink>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink className="nav-link" to="/">
            HOME
          </NavLink>
          <NavLink className="nav-link nav-link-dark" to="/login">
            LOGIN
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
