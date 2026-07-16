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
} from '@heroicons/react/24/outline';

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

const MenuHorizontal = () => {
  const location = useLocation();
  const { hasRole } = useAuth();

  const filteredMenu = menuItems.filter((item) => {
    return item.roles.some((role) => hasRole(role));
  });

  return (
    <nav className="hidden md:block bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#4A4A4A] shadow-sm">
      <div className="px-4 py-2 overflow-x-auto">
        <div className="flex items-center justify-center gap-1 min-w-max">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D35400] text-white shadow-md shadow-[#D35400]/25'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2A2A2A]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MenuHorizontal;