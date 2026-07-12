import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

  // Mostrar spinner mientras carga
  if (loading) {
    return <LoadingSpinner />;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles y el usuario no tiene uno de ellos
  if (allowedRoles.length > 0) {
    const hasAccess = allowedRoles.some(role => hasRole(role));
    if (!hasAccess) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Renderizar el contenido
  return <Outlet />;
};

export default ProtectedRoute;