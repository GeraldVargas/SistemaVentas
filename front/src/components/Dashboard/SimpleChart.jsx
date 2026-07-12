const SimpleChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.amount));

  return (
    <div className="w-full">
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, index) => {
          const height = (item.amount / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full max-w-[40px] bg-[#D35400] rounded-t transition-all duration-500 hover:bg-[#E05A00]"
                style={{ height: `${Math.max(height, 5)}%` }}
              >
                <div className="text-center text-xs text-white font-medium -mt-6 opacity-0 hover:opacity-100 transition-opacity">
                  ${item.amount}
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleChart;