import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import 'src/index.css';
import App from 'src/App';
import { ConfigProvider } from 'antd';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ConfigProvider>
        <StyleProvider layer>
          <App />
        </StyleProvider>
      </ConfigProvider>
    </React.StrictMode>
  );
}
