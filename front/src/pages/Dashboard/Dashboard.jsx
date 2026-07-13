import { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import StatsCard from '../../components/Dashboard/StatsCard';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../api/auth';

// Íconos
import {
  CurrencyDollarIcon,
  CubeIcon,
  UsersIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Componente de gráfico simple
import SimpleChart from '../../components/Dashboard/SimpleChart';

// Datos estáticos (temporales, luego se conectarán a la API)
const mockStats = {
  totalSalesToday: 15420.50,
  totalProducts: 342,
  totalClients: 89,
  lowStockProducts: 12,
};

const mockSalesData = [
  { day: 'Lun', amount: 1200 },
  { day: 'Mar', amount: 1800 },
  { day: 'Mié', amount: 1500 },
  { day: 'Jue', amount: 2200 },
  { day: 'Vie', amount: 2800 },
  { day: 'Sáb', amount: 1900 },
  { day: 'Dom', amount: 1000 },
];

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [salesData, setSalesData] = useState(mockSalesData);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simular carga de datos desde la API
    const fetchData = async () => {
      setLoading(true);
      try {
        // Aquí iría la llamada a la API real
        // const token = getToken();
        // const response = await fetch(`${API_URL}/dashboard/stats`, {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        // const data = await response.json();
        // setStats(data);

        // Simulamos una carga
        setTimeout(() => {
          setStats(mockStats);
          setSalesData(mockSalesData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error al cargar dashboard:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtener nombre del rol
  const getRoleName = (role) => {
    const names = {
      admin: 'Administrador',
      vendedor: 'Vendedor',
      financiero: 'Financiero',
    };
    return names[role] || role;
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <MainLayout title="Dashboard">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D35400]"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard">
      {/* Bienvenida */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ¡Bienvenido, {user?.name || 'Usuario'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Rol: <span className="font-medium text-[#D35400]">{getRoleName(user?.rol)}</span>
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Ventas de Hoy"
          value={formatCurrency(stats.totalSalesToday)}
          icon={CurrencyDollarIcon}
          iconColor="text-[#D35400]"
          bgColor="bg-[#D35400]/10"
        />
        <StatsCard
          title="Total Productos"
          value={stats.totalProducts}
          icon={CubeIcon}
          iconColor="text-blue-600"
          bgColor="bg-blue-600/10"
        />
        <StatsCard
          title="Total Clientes"
          value={stats.totalClients}
          icon={UsersIcon}
          iconColor="text-green-600"
          bgColor="bg-green-600/10"
        />
        <StatsCard
          title="Stock Bajo"
          value={stats.lowStockProducts}
          icon={ExclamationTriangleIcon}
          iconColor="text-red-600"
          bgColor="bg-red-600/10"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas de los últimos 7 días */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-[#4A4A4A]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Ventas Últimos 7 Días
          </h3>
          <SimpleChart data={salesData} />
        </div>

        {/* Gráfico de productos más vendidos */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-[#4A4A4A]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Productos Más Vendidos
          </h3>
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <p>Próximamente: Gráfico de productos más vendidos</p>
          </div>
        </div>
      </div>

      {/* Lista de productos con stock bajo */}
      <div className="mt-6 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-[#4A4A4A]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Productos con Stock Bajo
        </h3>
        <div className="text-gray-500 dark:text-gray-400">
          <p>Próximamente: Lista de productos con stock bajo</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;