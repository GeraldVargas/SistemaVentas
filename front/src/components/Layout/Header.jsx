import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

const getSavedTheme = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('theme') === 'dark';
};

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(getSavedTheme);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      document.documentElement.classList.toggle('dark', nextTheme);
      document.documentElement.style.colorScheme = nextTheme ? 'dark' : 'light';
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-[#D35400]',
      vendedor: 'bg-green-600',
      financiero: 'bg-blue-600',
    };
    return colors[role] || 'bg-gray-600';
  };

  const getRoleName = (role) => {
    const names = {
      admin: 'Administrador',
      vendedor: 'Vendedor',
      financiero: 'Financiero',
    };
    return names[role] || role;
  };

  return (
    <header className="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#4A4A4A] px-4 py-3 flex items-center justify-between gap-4 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-shrink-0">
        {isMobile && (
          <label className="hb-label">
            <input
              type="checkbox"
              className="hb-checkbox"
              checked={sidebarOpen}
              onChange={toggleSidebar}
            />
            <span className="hb-line hb-line1" />
            <span className="hb-line hb-line2" />
            <span className="hb-line hb-line3" />
          </label>
        )}

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-[#D35400]" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white tracking-tight">
            Ferretería Urkupiña
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            aria-label="Cambiar tema"
          />
          <span className="theme-switch-track">
            <span className="theme-switch-thumb">
              {isDarkMode ? '🌙' : '☀️'}
            </span>
          </span>
        </label>

        {user && (
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-[#4A4A4A]">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {user.name || 'Usuario'}
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full text-white ${getRoleColor(user.rol)}`}>
                {getRoleName(user.rol)}
              </span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white dark:ring-[#1A1A1A] shadow-md ${getRoleColor(user.rol)}`}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .hb-label {
          position: relative;
          width: 34px;
          height: 24px;
          display: block;
          cursor: pointer;
        }
        .hb-checkbox {
          position: absolute;
          opacity: 0;
          width: 34px;
          height: 24px;
          margin: 0;
          cursor: pointer;
          z-index: 2;
        }
        .hb-line {
          position: absolute;
          left: 0;
          width: 34px;
          height: 3px;
          border-radius: 2px;
          background-color: #374151;
          transition: all 0.3s ease;
        }
        .dark .hb-line { background-color: #E5E7EB; }
        .hb-line1 { top: 0; }
        .hb-line2 { top: 10px; }
        .hb-line3 { top: 20px; }

        .hb-checkbox:checked ~ .hb-line1 {
          transform: rotate(35deg) scaleX(0.55) translate(19px, -2px);
          border-radius: 50px 50px 50px 0;
          background-color: #D35400;
        }
        .hb-checkbox:checked ~ .hb-line3 {
          transform: rotate(-35deg) scaleX(0.55) translate(19px, 2px);
          border-radius: 0 50px 50px 50px;
          background-color: #D35400;
        }
        .hb-checkbox:checked ~ .hb-line2 {
          width: 22px;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          opacity: 0;
        }

        .theme-switch {
          position: relative;
          display: inline-flex;
          cursor: pointer;
        }
        .theme-switch input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          margin: 0;
          cursor: pointer;
          z-index: 2;
        }
        .theme-switch-track {
          width: 60px;
          height: 30px;
          border-radius: 999px;
          background: #e5e7eb;
          box-shadow: inset 0px 2px 5px rgba(0,0,0,0.15);
          border: 1px solid #d1d5db;
          padding: 3px;
          display: flex;
          align-items: center;
          transition: background 0.3s ease;
          box-sizing: border-box;
        }
        .dark .theme-switch-track {
          background: #18181b;
          border: 1px solid #32303e;
          box-shadow: inset 0px 2px 5px rgba(0,0,0,0.5);
        }
        .theme-switch-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(#ffffff, #f3f4f6);
          box-shadow: 0px 2px 6px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transform: translateX(0);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
        }
        .theme-switch input:checked + .theme-switch-track {
          background: #1A1A1A;
        }
        .theme-switch input:checked + .theme-switch-track .theme-switch-thumb {
          transform: translateX(30px);
          background: linear-gradient(#3b3a4e, #272733);
        }
      `}</style>
    </header>
  );
};

export default Header;