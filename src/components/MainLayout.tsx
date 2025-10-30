import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Switch } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import SvgLogo from 'src/assets/logo.svg?react';
import { useThemeStore } from 'src/stores/theme.store';
import { useEffectiveTheme } from 'src/hooks/useEffectiveTheme';
import type { SwitchChangeEventHandler } from 'antd/es/switch';

const { Header, Sider, Content } = Layout;

// 1. 메뉴 아이템 (Sider와 Drawer가 공유)
const menuItems = [
  { key: '1', icon: <HomeOutlined />, label: 'Dashboard' },
  { key: '2', icon: <UserOutlined />, label: 'Profile' },
  { key: '3', icon: <SettingOutlined />, label: 'Settings' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { setTheme } = useThemeStore();
  const mode = useEffectiveTheme();

  const isDarkMode = mode === 'dark';
  const setIsDarkMode: SwitchChangeEventHandler = (checked) => {
    setTheme(checked == true ? 'dark' : 'light');
  };

  return (
    <Layout className="min-h-screen w-full">
      <Sider width={200} className="hidden lg:block">
        <div className="h-16 flex items-center justify-center text-xl font-bold">
          <SvgLogo className="size-16 mr-2 fill-text" />
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
      </Sider>

      <Layout>
        <Header
          className="p-0 flex items-center justify-between bg-background"
        >
          <div>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              className="block lg:hidden text-lg w-16 h-16"
            />
          </div>

          <div className="pr-4">
            <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              checked={isDarkMode}
              onChange={setIsDarkMode}
            />
          </div>
        </Header>

        <Content className="m-4 lg:m-6">
          <div className="p-4 lg:p-6 h-[calc(100vh-128px)] bg-background radius">
            {children}
          </div>
        </Content>
      </Layout>

      <Drawer
        title="MENU"
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        classNames={{ body: 'p-0' }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          // 메뉴 클릭 시 Drawer가 닫히도록 설정
          onClick={() => setMobileDrawerOpen(false)}
        />
      </Drawer>
    </Layout>
  );
};

export default MainLayout;
