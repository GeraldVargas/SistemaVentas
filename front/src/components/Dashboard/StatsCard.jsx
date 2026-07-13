const StatsCard = ({ title, value, icon: Icon, iconColor = 'text-[#D35400]', bgColor = 'bg-[#D35400]/10' }) => {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-[#4A4A4A] transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;