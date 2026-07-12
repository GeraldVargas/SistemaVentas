import { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getUser as apiGetUser, getToken, setToken, removeToken } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await apiGetUser();
          setUser(userData);
        } catch (error) {
          console.error('Error al cargar usuario:', error);
          removeToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(email, password);
      // Guardar token en localStorage
      setToken(data.token);
      // Obtener datos del usuario
      const userData = await apiGetUser();
      setUser(userData);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      removeToken();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Aunque falle la API, limpiamos localmente
      removeToken();
      setUser(null);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar permisos
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // Función para verificar rol
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  // Función para actualizar datos del usuario (cuando se edita el perfil)
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasPermission,
    hasRole,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;