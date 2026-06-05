import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import AdminEmployeesPage from './pages/AdminEmployeesPage.jsx';
import AdminPayrollPage from './pages/AdminPayrollPage.jsx';
import AdminSchedulerPage from './pages/AdminSchedulerPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage.jsx';
import EmployeePortalPage from './pages/EmployeePortalPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<RequireAuth role="admin"><DashboardPage /></RequireAuth>} />
        <Route path="/admin-dashboard" element={<RequireAuth role="admin"><DashboardPage /></RequireAuth>} />
        <Route path="/admin-employees" element={<RequireAuth role="admin"><AdminEmployeesPage /></RequireAuth>} />
        <Route path="/admin-payroll" element={<RequireAuth role="admin"><AdminPayrollPage /></RequireAuth>} />
        <Route path="/admin-scheduler" element={<RequireAuth role="admin"><AdminSchedulerPage /></RequireAuth>} />
        <Route path="/employee-dashboard" element={<RequireAuth role="employee"><EmployeeDashboardPage /></RequireAuth>} />
        <Route path="/employee-portal" element={<RequireAuth role="employee"><EmployeePortalPage /></RequireAuth>} />
        <Route path="/employee-schedule" element={<RequireAuth role="employee"><EmployeePortalPage /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
