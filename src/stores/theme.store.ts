import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 사용자의 '선호' 상태. 'system'이 기본값입니다.
export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

/**
 * 사용자의 테마 선호도를 관리하는 Zustand 스토어.
 * 이 스토어는 'light', 'dark', 'system' 중 사용자가
 * 선택한 값을 localStorage에 저장하기만 합니다.
 *
 * 실제 DOM(<html> 태그)에 'dark' 클래스를 적용하는 로직은
 * 'useThemeEffect' 훅에서 처리됩니다.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: 'theme-storage', 
      storage: createJSONStorage(() => localStorage),
    },
  ),
);