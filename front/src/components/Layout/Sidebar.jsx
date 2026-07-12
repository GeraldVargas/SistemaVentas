import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  UsersIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

// Definimos los menús
const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Productos', path: '/productos', icon: CubeIcon, roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Categorías', path: '/categorias', icon: TagIcon, roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Clientes', path: '/clientes', icon: UsersIcon, roles: ['admin', 'vendedor'] },
  { name: 'Punto de Venta', path: '/pos', icon: ShoppingCartIcon, roles: ['admin', 'vendedor'] },
  { name: 'Stock', path: '/stock', icon: ChartBarIcon, roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Reportes', path: '/reportes', icon: DocumentTextIcon, roles: ['admin', 'financiero'] },
  { name: 'Usuarios', path: '/usuarios', icon: UserGroupIcon, roles: ['admin'] },
  { name: 'Configuración', path: '/configuracion', icon: Cog6ToothIcon, roles: ['admin'] },
];

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
  const location = useLocation();
  const { hasRole, logout } = useAuth();

  // Filtrar menús según el rol del usuario
  const filteredMenu = menuItems.filter(item => {
    return item.roles.some(role => hasRole(role));
  });

  return (
    <aside
      className={`
        bg-[#1A1A1A] text-white w-64 flex-shrink-0 transition-all duration-300
        fixed md:relative h-full z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:w-64
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-[#4A4A4A]">
        <h1 className="text-lg font-bold text-[#D35400]">
          Urkupiña
        </h1>
        <span className="text-xs text-gray-400 ml-1">Ferretería</span>
      </div>

      {/* Menú */}
      <nav className="p-4 space-y-1">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-[#D35400] text-white' 
                  : 'text-gray-300 hover:bg-[#4A4A4A] hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Cerrar sesión */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#4A4A4A]">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-300 hover:bg-[#4A4A4A] hover:text-white transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;