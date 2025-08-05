 export const theme = {
  colors: {
    background: {
      dark: '#000000',
      white: '#FFFFFF',
      chat: '#1A1A1A',
      card: '#111111'
    },
    primary: {
      green: '#00FF66',
      greenHover: '#00e65a',
      greenDark: '#00cc52',
      greenGlow: 'radial-gradient(circle, #006b3b 0%, #000000 100%)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      black: '#000000',
      muted: '#4B4B4B'
    },
    button: {
      green: '#00FF66',
      greenHover: '#00e65a',
      text: '#000000'
    },
    chat: {
      sent: '#002b13',
      received: '#000000'
    },
    border: '#333333',
    inputBorder: '#00FF66'
  },
  
  typography: {
    fontFamily: {
      base: 'Inter, sans-serif'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '48px',
      '5xl': '64px',
      '6xl': '72px'
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
      tight: '110%',
      normal: '120%',
      relaxed: '140%'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
    '2xl': '96px',
    '3xl': '120px'
  },
  
  layout: {
    containerMaxWidth: '1140px',
    containerPadding: '0 24px',
    sectionPadding: '64px 0',
    chatBubblePadding: '12px 16px'
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '999px',
    circle: '50%'
  },
  
  shadows: {
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(0, 255, 102, 0.3)'
  },
  
  components: {
    avatar: {
      md: '40px'
    },
    button: {
      padding: '12px 24px',
      radius: '999px'
    },
    card: {
      padding: '24px',
      radius: '16px'
    }
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
