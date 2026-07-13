import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const MainLayout = ({ children, title = 'Dashboard' }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // En móvil, el sidebar se oculta
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} user={user} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={user} toggleSidebar={toggleSidebar} />

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;