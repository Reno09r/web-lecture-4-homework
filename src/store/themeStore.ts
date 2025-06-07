import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { Theme } from '../types/feedback';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        
        toggleTheme: () => {
          set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light'
          }));
        },
        
        setTheme: (theme: Theme) => {
          set({ theme });
        },
      }),
      {
        name: 'theme-storage',
      }
    ),
    { name: 'theme-store' }
  )
);