const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D35400]"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;