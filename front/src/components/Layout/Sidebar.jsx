import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Productos', path: '/productos', roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Categorías', path: '/categorias', roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Clientes', path: '/clientes', roles: ['admin', 'vendedor'] },
  { name: 'Punto de Venta', path: '/pos', roles: ['admin', 'vendedor'] },
  { name: 'Stock', path: '/stock', roles: ['admin', 'vendedor', 'financiero'] },
  { name: 'Reportes', path: '/reportes', roles: ['admin', 'financiero'] },
  { name: 'Usuarios', path: '/usuarios', roles: ['admin'] },
  { name: 'Configuración', path: '/configuracion', roles: ['admin'] },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { hasRole, logout } = useAuth();

  const filteredMenu = menuItems.filter((item) => {
    return item.roles.some((role) => hasRole(role));
  });

  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          bg-[#1A1A1A] text-white w-72 flex-shrink-0 transition-transform duration-300
          fixed left-0 top-0 h-full z-50 flex flex-col md:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-2xl shadow-black/30
        `}
      >
        <div className="flex items-center justify-center h-16 border-b border-[#4A4A4A] gap-1.5 px-4">
          <h1 className="brand-loader">
            <span>Urkupiña</span>
          </h1>
          <span className="text-xs text-gray-400">Ferretería</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
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