// Datos de usuarios de prueba
const MOCK_USERS = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@admin.com',
    password: 'admin',
    rol: 'admin',
    roles: ['admin'],
    permissions: ['ver-dashboard', 'ver-productos', 'crear-productos', 'editar-productos', 'eliminar-productos', 'ver-ventas', 'crear-ventas', 'anular-ventas', 'ver-clientes', 'crear-clientes', 'editar-clientes', 'eliminar-clientes', 'ver-stock', 'ajustar-stock', 'ver-compras', 'crear-compras', 'editar-compras', 'eliminar-compras', 'ver-proveedores', 'crear-proveedores', 'editar-proveedores', 'eliminar-proveedores', 'ver-reportes', 'exportar-reportes', 'ver-usuarios', 'crear-usuarios', 'editar-usuarios', 'eliminar-usuarios', 'ver-roles', 'asignar-roles', 'ver-configuracion', 'editar-configuracion'],
    activo: true,
  },
  {
    id: 2,
    name: 'Vendedor',
    email: 'vendedor@vendedor.com',
    password: 'vendedor',
    rol: 'vendedor',
    roles: ['vendedor'],
    permissions: ['ver-dashboard', 'ver-productos', 'ver-categorias', 'ver-ventas', 'crear-ventas', 'ver-clientes', 'crear-clientes', 'ver-stock', 'ver-reportes'],
    activo: true,
  },
  {
    id: 3,
    name: 'Financiero',
    email: 'financiero@financiero.com',
    password: 'financiero',
    rol: 'financiero',
    roles: ['financiero'],
    permissions: ['ver-dashboard', 'ver-productos', 'ver-categorias', 'ver-ventas', 'ver-clientes', 'ver-stock', 'ver-reportes', 'exportar-reportes'],
    activo: true,
  },
];

// Simular token
const MOCK_TOKEN = 'mock_token_123456789';

// Función para simular delay de red
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock de login
export const mockLogin = async (email, password) => {
  await delay(800);

  const user = MOCK_USERS.find(
    u => u.email === email && u.password === password && u.activo === true
  );

  if (!user) {
    throw new Error('Credenciales incorrectas. Usuario no encontrado.');
  }

  // No devolver la contraseña
  const { password: _, ...userWithoutPassword } = user;

  return {
    token: MOCK_TOKEN,
    user: userWithoutPassword,
  };
};

// Mock de logout
export const mockLogout = async () => {
  await delay(300);
  return { success: true };
};

// Mock de getUser
export const mockGetUser = async () => {
  await delay(400);
  
  const token = localStorage.getItem('token');
  if (token !== MOCK_TOKEN) {
    throw new Error('Token inválido');
  }

  // Buscar el usuario por el token (simulado)
  const user = MOCK_USERS[0];
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};