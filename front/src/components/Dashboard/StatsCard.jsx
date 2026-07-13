const colorMap = {
  'text-[#D35400]': { primary: '#D35400', primary800: '#7A2E00', primaryShadow: '#4D1D00' },
  'text-blue-600':  { primary: '#2563EB', primary800: '#1E3A8A', primaryShadow: '#152a63' },
  'text-green-600': { primary: '#16A34A', primary800: '#14532D', primaryShadow: '#0d3a1f' },
  'text-red-600':   { primary: '#DC2626', primary800: '#7F1D1D', primaryShadow: '#551313' },
};

const StatsCard = ({ title, value, icon: Icon, iconColor = 'text-[#D35400]', bgColor = 'bg-[#D35400]/10' }) => {
  const { primary, primary800, primaryShadow } = colorMap[iconColor] || colorMap['text-[#D35400]'];

  return (
    <div
      className="stats-card"
      style={{
        '--primary': primary,
        '--primary-800': primary800,
        '--primary-shadow': primaryShadow,
      }}
    >
      <div className={`stats-icon_container ${bgColor}`}>
        <Icon className={`w-8 h-8 ${iconColor}`} style={{ filter: 'brightness(0) invert(1)' }} />
      </div>

      <p className="stats-title">{title}</p>
      <p className="stats-value">{value}</p>

      <div className="stats-accent-bar" />

      <style>{`
        .stats-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 1.1rem;
          width: 100%;
          height: 100%;
          background-color: #1A1A1A;
          border-radius: 1rem;
        }
        .stats-icon_container {
          overflow: hidden;
          position: relative;
          z-index: 5;
          width: 100%;
          height: 5rem;
          background-color: var(--primary-800);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stats-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: #FFFFFF;
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stats-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFFFFF;
        }
        .stats-accent-bar {
          width: 100%;
          height: 0.5rem;
          border-radius: 0.5rem;
          background-image: linear-gradient(0deg, var(--primary) 50%, #FFFFFF 125%);
          border: 2px solid color-mix(in srgb, var(--primary) 60%, transparent);
          box-shadow: inset 0 0 0.25rem 1px #FFFFFF;
        }
      `}</style>
    </div>
  );
};

export default StatsCard;