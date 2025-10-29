import { useState, useEffect } from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ConfigProvider, Switch } from 'antd';
import { QueryClient } from '@tanstack/react-query';
import { getGraphiteGrayTheme } from 'src/theme';
import MainLayout from 'src/components/MainLayout';

// 라우터 컨텍스트 타입 정의
interface MyRouterContext {
  queryClient: QueryClient;
}

// App.tsx의 로직을 __root.tsx로 이동
function RootComponent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mode = isDarkMode ? 'dark' : 'light';
  const currentTheme = getGraphiteGrayTheme(mode);

  // Tailwind의 dark 클래스 토글
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(mode);
  }, [isDarkMode, mode]);

  return (
    <ConfigProvider theme={{ ...currentTheme, cssVar: { key: 'ant' } }}>
      <MainLayout>
        {/* 다크 모드 스위치 (예시: MainLayout 헤더에 배치) */}
        <div className="absolute top-4 right-20">
          <Switch
            checkedChildren="Dark"
            unCheckedChildren="Light"
            checked={isDarkMode}
            onChange={setIsDarkMode}
          />
        </div>

        {/* 자식 라우트들이 여기에 렌더링됩니다. */}
        <Outlet />
      </MainLayout>
    </ConfigProvider>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});
