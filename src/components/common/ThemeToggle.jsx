import { useTheme } from '../../contexts/ThemeContext.jsx';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative group perspective-1000 ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-2xl blur opacity-0 group-hover:opacity-40 transition-all duration-700"></div>
      <div className="relative w-12 h-12 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 hover:border-[#00FF66]/50 transition-all duration-700 hover:-translate-y-2 hover:scale-110 hover:rotate-12 transform-gpu shadow-xl hover:shadow-2xl overflow-hidden"
           style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/10 via-transparent to-[#00cc52]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
        
        <div className="relative z-10 text-2xl transition-all duration-500 group-hover:scale-110">
          {isDark ? (
            <span className="animate-pulse">☀️</span>
          ) : (
            <span className="animate-pulse">🌙</span>
          )}
        </div>
        
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF66] rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-700"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
