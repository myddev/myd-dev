import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // `delay` 시간(밀리초)이 지난 후에 `debouncedValue`를 업데이트하는 타이머를 설정합니다.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // `value`가 변경될 때마다 (즉, 새로운 키 입력이 있을 때마다)
    // 이전 타이머를 취소하고 새 타이머를 시작합니다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // `value`나 `delay`가 변경될 때만 이 effect를 실행합니다.

  return debouncedValue;
}