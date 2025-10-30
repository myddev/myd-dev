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
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});
