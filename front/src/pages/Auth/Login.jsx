import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  // Credenciales por defecto para desarrollo
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setLocalError('Complete todos los campos');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setLocalError(result.error || 'Credenciales incorrectas');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#D35400]">Urkupiña</h1>
          <p className="text-gray-400 text-sm mt-1">Ferretería y Moto Repuestos</p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#2D2D2D] rounded-2xl p-8 shadow-2xl border border-[#4A4A4A]">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Iniciar Sesión
          </h2>

          {/* Mostrar errores */}
          {(localError || authError) && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] text-white border border-[#4A4A4A] rounded-lg focus:outline-none focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 transition-colors"
                placeholder="correo@ejemplo.com"
                disabled={isLoading}
              />
            </div>

            {/* Contraseña */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] text-white border border-[#4A4A4A] rounded-lg focus:outline-none focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 transition-colors"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200
                ${isLoading 
                  ? 'bg-[#D35400]/70 cursor-not-allowed' 
                  : 'bg-[#D35400] hover:bg-[#E05A00] hover:shadow-lg hover:shadow-[#D35400]/20'
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Enlaces */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿Olvidaste tu contraseña?{' '}
              <span className="text-[#D35400] hover:text-[#E05A00] transition-colors cursor-pointer">
                Recuperar
              </span>
            </p>
          </div>

          <div className="mt-4 text-center border-t border-[#4A4A4A] pt-4">
            <p className="text-gray-500 text-xs">
              Sistema de Gestión Ferretero
            </p>
          </div>

          {/* Credenciales de prueba (solo en desarrollo) */}
          <div className="mt-4 text-center bg-[#1A1A1A] rounded-lg p-3">
            <p className="text-gray-500 text-xs">
              <span className="text-gray-400">Prueba con:</span>
            </p>
            <div className="flex flex-col gap-1 mt-1">
              <span className="text-gray-400 text-xs">
                <span className="text-[#D35400]">admin@admin.com</span> / <span className="text-[#D35400]">admin</span>
                <span className="text-gray-500 ml-2">(Administrador)</span>
              </span>
              <span className="text-gray-400 text-xs">
                <span className="text-[#D35400]">vendedor@vendedor.com</span> / <span className="text-[#D35400]">vendedor</span>
                <span className="text-gray-500 ml-2">(Vendedor)</span>
              </span>
              <span className="text-gray-400 text-xs">
                <span className="text-[#D35400]">financiero@financiero.com</span> / <span className="text-[#D35400]">financiero</span>
                <span className="text-gray-500 ml-2">(Financiero)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;