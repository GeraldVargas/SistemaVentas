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

  const filteredMenu = menuItems.filter((item) => {
    return item.roles.some((role) => hasRole(role));
  });

  return (
    <>
      {/* Overlay para mobile: cierra el sidebar al tocar fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          bg-[#1A1A1A] text-white w-64 flex-shrink-0 transition-transform duration-300
          fixed md:relative h-full z-30 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:w-64
        `}
      >
        {/* Logo con efecto de texto animado */}
        <div className="flex items-center justify-center h-16 border-b border-[#4A4A4A] gap-1.5">
          <h1 className="brand-loader">
            <span>Urkupiña</span>
          </h1>
          <span className="text-xs text-gray-400">Ferretería</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                className={`
                  relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-[#D35400] text-white shadow-md shadow-[#D35400]/30'
                    : 'text-gray-300 hover:bg-[#4A4A4A] hover:text-white'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-white/70" />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#4A4A4A]">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>

        <style>{`
          /* --- Texto del logo (Uiverse: kat_2522, adaptado) --- */
          .brand-loader {
            position: relative;
            display: inline-block;
            font-size: 1.125rem;
            font-weight: 700;
            font-style: italic;
            color: #D35400;
            overflow: hidden;
          }
          .brand-loader span {
            display: inline-block;
            animation: brand-cut 3s infinite;
          }
          .brand-loader::before {
            content: "";
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #FFFFFF;
            top: 0px;
            filter: opacity(0.9);
            animation: brand-scan 3s infinite;
            z-index: 1;
          }
          .brand-loader::after {
            content: "";
            position: absolute;
            left: 0;
            width: 100%;
            height: 3px;
            border-radius: 4px;
            background-color: #D35400;
            top: 0px;
            filter: blur(4px);
            animation: brand-scan 3s infinite;
            z-index: 0;
          }
          @keyframes brand-scan {
            0% { top: 0px; }
            25% { top: 22px; }
            50% { top: 0px; }
            75% { top: 22px; }
          }
          @keyframes brand-cut {
            0% { clip-path: inset(0 0 0 0); }
            25% { clip-path: inset(100% 0 0 0); }
            50% { clip-path: inset(0 0 100% 0); }
            75% { clip-path: inset(0 0 0 0); }
          }
        `}</style>
      </aside>
    </>
  );
};

export default Sidebar;