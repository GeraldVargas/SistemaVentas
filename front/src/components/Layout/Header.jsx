import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar preferencia de tema al montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Cambiar tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Obtener color del rol
  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-[#D35400]',
      vendedor: 'bg-green-600',
      financiero: 'bg-blue-600',
    };
    return colors[role] || 'bg-gray-600';
  };

  // Obtener nombre del rol en español
  const getRoleName = (role) => {
    const names = {
      admin: 'Administrador',
      vendedor: 'Vendedor',
      financiero: 'Financiero',
    };
    return names[role] || role;
  };

  return (
    <header className="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#4A4A4A] px-4 py-3 flex items-center justify-between">
      {/* Izquierda: Botón de menú */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#4A4A4A] transition-colors"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">
          Ferretería Urkupiña
        </h2>
      </div>

      {/* Derecha: Usuario y temas */}
      <div className="flex items-center gap-4">
        {/* Modo oscuro */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#4A4A4A] transition-colors"
          title="Cambiar tema"
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-500" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Usuario */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {user.name || 'Usuario'}
              </span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full text-white
                ${getRoleColor(user.rol)}
              `}>
                {getRoleName(user.rol)}
              </span>
            </div>
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
              ${getRoleColor(user.rol)}
            `}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;