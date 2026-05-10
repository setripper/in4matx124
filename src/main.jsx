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
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin-dashboard" element={<DashboardPage />} />
        <Route path="/admin-employees" element={<AdminEmployeesPage />} />
        <Route path="/admin-payroll" element={<AdminPayrollPage />} />
        <Route path="/admin-scheduler" element={<AdminSchedulerPage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} />
        <Route path="/employee-portal" element={<EmployeePortalPage />} />
        <Route path="/employee-schedule" element={<EmployeePortalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
