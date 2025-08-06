import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme-preference');
    if (saved) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme-preference', JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const setTheme = (dark) => {
    setIsDark(dark);
    localStorage.setItem('theme-preference', JSON.stringify(dark));
  };

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    root.style.setProperty('--bg-primary', isDark ? '#000000' : '#FFFFFF');
    root.style.setProperty('--bg-secondary', isDark ? '#1A1A1A' : '#F8F9FA');
    root.style.setProperty('--bg-card', isDark ? '#111111' : '#FFFFFF');
    root.style.setProperty('--text-primary', isDark ? '#FFFFFF' : '#000000');
    root.style.setProperty('--text-secondary', isDark ? '#CCCCCC' : '#4B4B4B');
    root.style.setProperty('--text-muted', isDark ? '#4B4B4B' : '#6B7280');
    root.style.setProperty('--border-color', isDark ? '#333333' : '#E5E7EB');
    root.style.setProperty('--shadow-color', isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)');
    
    root.style.setProperty('--green-primary', '#00FF66');
    root.style.setProperty('--green-hover', '#00e65a');
    root.style.setProperty('--green-dark', '#00cc52');
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const saved = localStorage.getItem('theme-preference');
      if (!saved) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const themeConfig = {
    isDark,
    isLight: !isDark,
    toggleTheme,
    setTheme,
    colors: {
      background: {
        primary: isDark ? '#000000' : '#FFFFFF',
        secondary: isDark ? '#1A1A1A' : '#F8F9FA',
        card: isDark ? '#111111' : '#FFFFFF',
        chat: isDark ? '#1A1A1A' : '#F1F5F9'
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#000000',
        secondary: isDark ? '#CCCCCC' : '#4B4B4B',
        muted: isDark ? '#4B4B4B' : '#6B7280',
        inverse: isDark ? '#000000' : '#FFFFFF'
      },
      border: isDark ? '#333333' : '#E5E7EB',
      shadow: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
      green: {
        primary: '#00FF66',
        hover: '#00e65a',
        dark: '#00cc52'
      }
    },
    classes: {
      background: {
        primary: isDark ? 'bg-black' : 'bg-white',
        secondary: isDark ? 'bg-gray-900' : 'bg-gray-50',
        card: isDark ? 'bg-gray-800' : 'bg-white'
      },
      text: {
        primary: isDark ? 'text-white' : 'text-black',
        secondary: isDark ? 'text-gray-300' : 'text-gray-600',
        muted: isDark ? 'text-gray-500' : 'text-gray-400'
      },
      border: isDark ? 'border-gray-700' : 'border-gray-200'
    }
  };

  return (
    <ThemeContext.Provider value={themeConfig}>
      {children}
    </ThemeContext.Provider>
  );
};
