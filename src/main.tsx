import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getGraphiteGrayTheme } from './theme'; // 테마 함수
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css';

// 생성된 라우트 트리 임포트
import { routeTree } from 'src/routeTree.gen';
import { ConfigProvider } from 'antd';

// TanStack Query 클라이언트 생성
const queryClient = new QueryClient();

// 라우터 인스턴스 생성
const router = createRouter({
  routeTree,
  // 쿼리 클라이언트를 라우터 컨텍스트에 등록
  context: {
    queryClient,
  },
});

// App이 렌더링될 때 전역 상태를 등록
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// 라이트 모드를 기본값으로 설정
const lightTheme = getGraphiteGrayTheme('light');

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <StyleProvider layer>
        {/* QueryClient/ConfigProvider를 RouterProvider 밖에 배치하여
        라우터 자체도 이 컨텍스트에 접근할 수 있게 합니다.
      */}
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ ...lightTheme, cssVar: { key: 'ant' } }}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </QueryClientProvider>
      </StyleProvider>
    </React.StrictMode>
  );
}
