const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK = true; // Cambiar a false cuando el backend esté listo

// Importar mocks
import { mockLogin, mockLogout, mockGetUser } from './mockAuth';

// Función para obtener el token del localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Función para guardar el token en localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Función para eliminar el token
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Función para login (con mock o real)
export const login = async (email, password) => {
  try {
    // Si estamos en modo mock
    if (USE_MOCK) {
      const data = await mockLogin(email, password);
      return data;
    }

    // Modo real (cuando el backend esté listo)
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    return {
      token: data.token || data.access_token,
      user: data.user || data.data?.user,
    };
  } catch (error) {
    throw new Error(error.message || 'Error de conexión al servidor');
  }
};

// Función para obtener el usuario (con mock o real)
export const getUser = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    // Modo mock
    if (USE_MOCK) {
      const user = await mockGetUser();
      return user;
    }

    // Modo real
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener usuario');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexión al servidor');
  }
};

// Función para cerrar sesión (con mock o real)
export const logout = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    // Modo mock
    if (USE_MOCK) {
      await mockLogout();
      return { success: true };
    }

    // Modo real
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al cerrar sesión');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexión al servidor');
  }
};