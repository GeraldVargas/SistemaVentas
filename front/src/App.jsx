import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Pages
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';

// Placeholder para páginas que aún no hemos creado
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">Página en construcción</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productos" element={<PlaceholderPage title="Productos" />} />
            <Route path="/categorias" element={<PlaceholderPage title="Categorías" />} />
            <Route path="/clientes" element={<PlaceholderPage title="Clientes" />} />
            <Route path="/pos" element={<PlaceholderPage title="Punto de Venta" />} />
            <Route path="/stock" element={<PlaceholderPage title="Stock" />} />
          </Route>

          {/* Solo admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/usuarios" element={<PlaceholderPage title="Usuarios" />} />
            <Route path="/configuracion" element={<PlaceholderPage title="Configuración" />} />
          </Route>

          {/* Solo admin y financiero */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'financiero']} />}>
            <Route path="/reportes" element={<PlaceholderPage title="Reportes" />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PlaceholderPage title="404 - Página no encontrada" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;