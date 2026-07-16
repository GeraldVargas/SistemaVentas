import { useAuth } from '../../hooks/useAuth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const { logout } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-[#4A4A4A] px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
          <span className="text-[#D35400] font-semibold">© {year}</span> Ferretería y Moto Repuestos Urkupiña. Todos los derechos reservados.
        </p>

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#4A4A4A] px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2A2A2A] transition-colors"
          aria-label="Cerrar sesión"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          <span>Salir</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;