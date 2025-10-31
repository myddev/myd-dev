import { useState, useEffect } from 'react';
import { useThemeStore } from '@/stores/theme.store';

/**
 * Zustand 스토어와 OS 설정을 조합하여
 * 현재 앱에 적용되어야 할 실제 테마('light' 또는 'dark')를 반환합니다.
 */
export function useEffectiveTheme(): 'light' | 'dark' {
  const { theme: themePreference } = useThemeStore();
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // SSR 환경에서는 window가 없으므로 'light'를 기본값으로 사용
    if (typeof window === 'undefined') {
      return;
    }

    // 'system'이 아닐 경우, 스토어의 값을 그대로 사용
    if (themePreference !== 'system') {
      setEffectiveTheme(themePreference);
      return;
    }

    // 'system'일 경우, OS 설정을 확인
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');

    // 1. 현재 시스템 테마로 즉시 설정
    setEffectiveTheme(getSystemTheme());

    // 2. OS 테마 변경 감지 리스너 등록
    const handleChange = () => {
      setEffectiveTheme(getSystemTheme());
    };
    mediaQuery.addEventListener('change', handleChange);

    // 3. 클린업
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]); // 스토어의 선호도가 바뀔 때마다 재실행

  return effectiveTheme;
}