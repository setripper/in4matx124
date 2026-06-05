import { Navigate } from 'react-router-dom';
import { getSession } from '../lib/api.js';

export default function RequireAuth({ children, role }) {
  const session = getSession();

  if (!session?.token || (role && session.user?.role !== role)) {
    return <Navigate replace to="/login" />;
  }

  return children;
}
