import { useEffect } from 'react';
import { useEffectiveTheme } from '@/hooks/useEffectiveTheme';

/**
 * Tailwind의 dark class를 <html> 태그에 적용/제거하는 훅.
 */
export function useThemeEffect() {
  const effectiveTheme = useEffectiveTheme();

  useEffect(() => {
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [effectiveTheme]);
}
