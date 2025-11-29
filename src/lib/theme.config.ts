/**
 * StellarGo Theme Configuration
 * Dark/Neon Green Aesthetic
 */

export const themeConfig = {
  colors: {
    // Neon Green Primary
    neon: {
      50: '#f0fff4',
      100: '#c6f6d5',
      200: '#9ae6b4',
      300: '#68d391',
      400: '#48bb78',
      500: '#00FF41', // Main Neon Green
      600: '#00e63b',
      700: '#00cc33',
      800: '#00b32d',
      900: '#009926',
    },
    // Dark backgrounds
    dark: {
      50: '#1a1a1a',
      100: '#171717',
      200: '#141414',
      300: '#111111',
      400: '#0e0e0e',
      500: '#0a0a0a',
      600: '#080808',
      700: '#050505',
      800: '#030303',
      900: '#000000',
    },
    // Gray accents
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    }
  },
  
  gradients: {
    neonGlow: 'linear-gradient(135deg, #00FF41 0%, #00cc33 100%)',
    darkBg: 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)',
    glassLight: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    glassDark: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
  },
  
  shadows: {
    neonGlow: '0 0 20px rgba(0, 255, 65, 0.5)',
    neonGlowLarge: '0 0 40px rgba(0, 255, 65, 0.6), 0 0 80px rgba(0, 255, 65, 0.3)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    elevated: '0 20px 50px rgba(0, 0, 0, 0.5)',
  },
  
  blur: {
    glass: '10px',
    heavy: '20px',
  },
  
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  spacing: {
    navbar: {
      height: '80px',
      heightMobile: '64px',
    },
    tabBar: {
      height: '72px',
    }
  },
  
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    xl: '24px',
  }
};

export type ThemeConfig = typeof themeConfig;

