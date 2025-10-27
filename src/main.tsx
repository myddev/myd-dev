import React, { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import App from './App.tsx';
import { getElegantIndigoTheme, getForestGreenTheme, getGraphiteGrayTheme, getModernSlateTheme, getVibrantTealTheme } from './theme';
import MainLayout from './components/MainLayout.tsx';
import ThemeTestContent from './components/ThemeTestContent.tsx';

const Root: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // ... (useEffect, 핸들러 함수, useMemo 등 기존 로직은 동일)
  const activeTheme = useMemo(() => {
    return getGraphiteGrayTheme(mode);
  }, [mode]);
  return (
    <ConfigProvider theme={activeTheme}>
      <MainLayout>
        {/* <div></div> */}
        <ThemeTestContent />
      </MainLayout>
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <Root />
    </StyleProvider>
  </StrictMode>
);
