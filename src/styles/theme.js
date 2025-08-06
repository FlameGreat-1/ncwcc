export const theme = {
  colors: {
    background: {
      // Dynamic backgrounds for both themes
      primary: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      secondary: {
        dark: '#1A1A1A', 
        light: '#F8F9FA'
      },
      card: {
        dark: '#111111',
        light: '#FFFFFF'
      },
      chat: {
        dark: '#1A1A1A',
        light: '#F1F5F9'
      }
    },
    
    text: {
      primary: {
        dark: '#FFFFFF',
        light: '#000000'
      },
      secondary: {
        dark: '#CCCCCC',
        light: '#4B4B4B'
      },
      muted: {
        dark: '#4B4B4B',
        light: '#6B7280'
      },
      inverse: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    },
    
    border: {
      dark: '#333333',
      light: '#E5E7EB'
    },
    
    shadow: {
      dark: 'rgba(0, 0, 0, 0.5)',
      light: 'rgba(0, 0, 0, 0.1)'
    },
    
    // Green colors remain consistent across themes
    primary: {
      green: '#00FF66',
      greenHover: '#00e65a',
      greenDark: '#00cc52',
      greenGlow: {
        dark: 'radial-gradient(circle, #006b3b 0%, #000000 100%)',
        light: 'radial-gradient(circle, #00FF66 0%, #FFFFFF 100%)'
      }
    },
    
    button: {
      green: '#00FF66',
      greenHover: '#00e65a',
      text: '#000000'
    },
    
    chat: {
      sent: {
        dark: '#002b13',
        light: '#E6F7FF'
      },
      received: {
        dark: '#1A1A1A',
        light: '#F5F5F5'
      }
    },
    
    inputBorder: '#00FF66'
  },
  
  typography: {
    fontFamily: {
      base: 'Inter, system-ui, -apple-system, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '3rem',    // 48px
      '5xl': '4rem',    // 64px
      '6xl': '4.5rem'   // 72px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeight: {
      tight: '1.1',
      normal: '1.2',
      relaxed: '1.4',
      loose: '1.6'
    }
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '2rem',      // 32px
    xl: '4rem',      // 64px
    '2xl': '6rem',   // 96px
    '3xl': '7.5rem'  // 120px
  },
  
  layout: {
    containerMaxWidth: '71.25rem', // 1140px
    containerPadding: '0 1.5rem',  // 0 24px
    sectionPadding: '4rem 0',      // 64px 0
    chatBubblePadding: '0.75rem 1rem' // 12px 16px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
    full: '9999px',
    circle: '50%'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: {
      dark: '0 4px 12px rgba(0, 0, 0, 0.5)',
      light: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    lg: {
      dark: '0 10px 25px rgba(0, 0, 0, 0.6)',
      light: '0 10px 25px rgba(0, 0, 0, 0.15)'
    },
    xl: {
      dark: '0 20px 40px rgba(0, 0, 0, 0.7)',
      light: '0 20px 40px rgba(0, 0, 0, 0.2)'
    },
    glow: {
      green: '0 0 20px rgba(0, 255, 102, 0.3)',
      greenStrong: '0 0 40px rgba(0, 255, 102, 0.5)'
    }
  },
  
  components: {
    avatar: {
      sm: '2rem',    // 32px
      md: '2.5rem',  // 40px
      lg: '3rem',    // 48px
      xl: '4rem'     // 64px
    },
    button: {
      padding: {
        sm: '0.5rem 1rem',     // 8px 16px
        md: '0.75rem 1.5rem',  // 12px 24px
        lg: '1rem 2rem'        // 16px 32px
      },
      radius: '9999px',
      height: {
        sm: '2rem',   // 32px
        md: '2.5rem', // 40px
        lg: '3rem'    // 48px
      }
    },
    card: {
      padding: {
        sm: '1rem',     // 16px
        md: '1.5rem',   // 24px
        lg: '2rem'      // 32px
      },
      radius: '1rem'    // 16px
    },
    input: {
      height: '2.5rem',      // 40px
      padding: '0.75rem',    // 12px
      radius: '0.5rem'       // 8px
    }
  },
  
  breakpoints: {
    sm: '40rem',     // 640px
    md: '48rem',     // 768px
    lg: '64rem',     // 1024px
    xl: '80rem',     // 1280px
    '2xl': '96rem'   // 1536px
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070
  }
};

// Helper functions to get theme-aware values
export const getThemeValue = (path, isDark = true) => {
  const keys = path.split('.');
  let value = theme;
  
  for (const key of keys) {
    value = value[key];
  }
  
  if (typeof value === 'object' && value.dark && value.light) {
    return isDark ? value.dark : value.light;
  }
  
  return value;
};

// Utility to generate CSS custom properties
export const generateCSSVariables = (isDark = true) => {
  return {
    '--color-bg-primary': getThemeValue('colors.background.primary', isDark),
    '--color-bg-secondary': getThemeValue('colors.background.secondary', isDark),
    '--color-bg-card': getThemeValue('colors.background.card', isDark),
    '--color-text-primary': getThemeValue('colors.text.primary', isDark),
    '--color-text-secondary': getThemeValue('colors.text.secondary', isDark),
    '--color-text-muted': getThemeValue('colors.text.muted', isDark),
    '--color-border': getThemeValue('colors.border', isDark),
    '--color-shadow': getThemeValue('colors.shadow', isDark),
    '--color-green': theme.colors.primary.green,
    '--color-green-hover': theme.colors.primary.greenHover,
    '--color-green-dark': theme.colors.primary.greenDark,
    '--font-family-base': theme.typography.fontFamily.base,
    '--border-radius-md': theme.borderRadius.md,
    '--border-radius-lg': theme.borderRadius.lg,
    '--border-radius-xl': theme.borderRadius.xl,
    '--transition-normal': theme.transitions.normal,
    '--shadow-md': getThemeValue('shadows.md', isDark),
    '--shadow-lg': getThemeValue('shadows.lg', isDark)
  };
};
