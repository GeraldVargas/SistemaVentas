import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
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
    <div className="min-h-screen grid grid-cols-1 lg:[grid-template-columns:40%_60%]">
      {/* ========== SVG FILTER (textura del gradiente futurista) ========== */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="advanced-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0.035 0"
              result="grain"
            />
            <feComposite in="grain" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="neon-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0.035 0"
              result="grain"
            />
            <feComposite in="grain" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* ========== LADO IZQUIERDO: LOGIN ========== */}
      <div className="w-full flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-[280px]">
          <form onSubmit={handleSubmit} className="form">
            <div id="heading">Iniciar Sesión</div>

            {(localError || authError) && (
              <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-2 rounded text-sm text-center w-full">
                {localError || authError}
              </div>
            )}

            <div className="field">
              <svg className="input-icon" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              <input
                type="email"
                className="input-field"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="field">
              <svg className="input-icon" viewBox="0 0 24 24">
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V8a5 5 0 0 0-10 0v2H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1zm-7-2a3 3 0 0 1 6 0v2H11V8z" />
              </svg>
              <input
                type="password"
                className="input-field"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="btn">
              <button type="submit" className="button2" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </div>

            <div className="switch">
              <span className="text-gray-500 text-xs">
                Sistema de Gestión Ferretero
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* ========== LADO DERECHO: FONDO ========== */}
      <div className="hidden lg:flex encrypted-neon-pattern items-center justify-center relative overflow-hidden">
        <div className="data-stream-overlay" />
        <div className="loader z-10 text-center">
          <span>Urkupiña</span>
          <div className="text-sm text-gray-300 font-normal not-italic mt-2">
            Ferretería y Moto Repuestos
          </div>
        </div>
      </div>

      {/* ========== ESTILOS ========== */}
      <style>{`
        /* ---- Formulario (paleta primary/secondary/dark/light) ---- */
        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-left: 2em;
          padding-right: 2em;
          padding-bottom: 0.4em;
          background-color: #1A1A1A;
          border-radius: 25px;
          transition: .4s ease-in-out;
        }
        .form:hover {
          transform: scale(1.03);
          border: 1px solid #D35400;
        }
        #heading {
          text-align: center;
          margin: 2em 0 0.5em 0;
          color: #FFFFFF;
          font-size: 1.2em;
          font-weight: 600;
        }
        .field {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5em;
          border-radius: 25px;
          padding: 0.6em;
          border: none;
          outline: none;
          color: white;
          background-color: #1A1A1A;
          box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
        }
        .input-icon {
          height: 1.3em;
          width: 1.3em;
          fill: #D35400;
          flex-shrink: 0;
        }
        .input-field {
          background: none;
          border: none;
          outline: none;
          width: 100%;
          color: #FFFFFF;
          font-size: 14px;
        }
        .input-field::placeholder {
          color: #4A4A4A;
        }
        .input-field:disabled {
          opacity: 0.6;
        }
        .form .btn {
          display: flex;
          justify-content: center;
          flex-direction: row;
          margin-top: 1.8em;
        }
        .button2 {
          padding: 0.6em;
          padding-left: 2.3em;
          padding-right: 2.3em;
          border-radius: 5px;
          border: none;
          outline: none;
          transition: .4s ease-in-out;
          background-color: #D35400;
          color: white;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }
        .button2:hover {
          background-color: #b34700;
          color: white;
        }
        .button2:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .switch {
          font-size: 12px;
          color: #4A4A4A;
          text-align: center;
          margin-bottom: 2em;
        }

        /* ---- Lado derecho: patrón neón encriptado (Uiverse.io by chase2k25) ---- */
        .encrypted-neon-pattern {
          width: 100%;
          height: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a0d0d, #2f1a1a 50%, #4f2a1a);
          filter: url(#neon-texture);
          position: relative;
        }

        .data-stream-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
              circle at 30% 40%,
              rgba(211, 84, 0, 0.35) 0%,
              transparent 20%
            ),
            radial-gradient(
              circle at 70% 60%,
              rgba(255, 140, 0, 0.2) 0%,
              transparent 15%
            );
          animation: pulse-stream 3s ease-in-out infinite;
        }

        @keyframes pulse-stream {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
        }

        /* ---- Texto con efecto loader ---- */
        .loader {
          max-width: fit-content;
          color: #FFFFFF;
          font-size: 48px;
          font-weight: 600;
          font-style: italic;
          position: relative;
          padding: 0 20px;
        }

        .loader span {
          animation: cut 2s infinite;
          transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-block;
        }

        .loader:hover {
          color: #D35400;
        }

        .loader::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 4px;
          border-radius: 4px;
          background-color: rgba(211, 84, 0, 0.35);
          top: 0px;
          filter: blur(10px);
          animation: scan 2s infinite;
          left: 0;
          z-index: 0;
          transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .loader::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 3px;
          border-radius: 4px;
          background-color: #D35400;
          top: 0px;
          animation: scan 2s infinite;
          left: 0;
          z-index: 1;
          filter: opacity(0.9);
          transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scan {
          0% { top: 0px; }
          25% { top: 58px; }
          50% { top: 0px; }
          75% { top: 58px; }
        }

        @keyframes cut {
          0% { clip-path: inset(0 0 0 0); }
          25% { clip-path: inset(100% 0 0 0); }
          50% { clip-path: inset(0 0 100% 0); }
          75% { clip-path: inset(0 0 0 0); }
        }

        @media (max-width: 1024px) {
          .loader {
            font-size: 36px;
          }
          .loader span {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;