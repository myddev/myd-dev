import React, { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { getGraphiteGrayTheme } from './theme';
import MainLayout from './components/MainLayout.tsx';
import ThemeTestContent from './components/ThemeTestContent.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Root: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const activeTheme = useMemo(() => {
    return getGraphiteGrayTheme(mode);
  }, [mode]);
  return (
    <ConfigProvider theme={{ ...activeTheme, cssVar: { key: 'ant' } }}>
      <MainLayout>
        <ThemeTestContent />
      </MainLayout>
    </ConfigProvider>
  );
};

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </StyleProvider>
  </StrictMode>
);
