// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';

const ProtectedRoute = ({ role }) => {
  const { user, isLoading, error } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  const isLoggedIn = !!user;
  const hasRequiredRole = role ? user?.role === role : true;

  if (!isLoggedIn || error) return <Navigate to="/login" replace />;
  if (!hasRequiredRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
