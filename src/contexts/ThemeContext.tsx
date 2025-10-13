'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'black';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useState<Theme>('black');
  const [mounted, setMounted] = useState(false);

  // Initialize black theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply black theme to document
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'black');
    }
  }, [mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div 
        style={{ 
          visibility: 'hidden',
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
