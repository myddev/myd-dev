import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Home, User, Settings, Menu, Sun, Moon } from 'lucide-react';

import SvgLogo from '@/assets/logo.svg?react';
import { useThemeStore } from '@/stores/theme.store';
import { useEffectiveTheme } from '@/hooks/useEffectiveTheme';

// 네비게이션 메뉴 컴포넌트
const AppNavigation: React.FC<{ isMobile?: boolean }> = ({
  isMobile = false,
}) => {
  return (
    <nav className="flex flex-col gap-2 px-4">
      {/* TODO: 실제 라우팅을 위해 <Link> 컴포넌트와 조합해야 합니다. */}
      <Button
        variant="ghost"
        className="justify-start w-full gap-2 text-primary bg-accent"
      >
        <Home className="size-4" /> Dashboard
      </Button>
      <Button variant="ghost" className="justify-start w-full gap-2">
        <User className="size-4" /> Profile
      </Button>
      <Button variant="ghost" className="justify-start w-full gap-2">
        <Settings className="size-4" /> Settings
      </Button>
    </nav>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { setTheme } = useThemeStore();
  const mode = useEffectiveTheme();
  const isDarkMode = mode === 'dark';

  const setIsDarkMode = (checked: boolean) => {
    setTheme(checked == true ? 'dark' : 'light');
  };

  return (
    <div className="flex h-dvh w-full bg-background">
      <aside className="hidden lg:block w-[200px] border-r bg-muted">
        <div className="h-14 flex items-center justify-center">
          <SvgLogo className="size-16 mr-2 fill-foreground" />
        </div>
        <AppNavigation />
      </aside>

      <div className="flex-1 flex flex-col h-full">
        <header className="z-10 h-14 flex items-center justify-between border-b bg-background px-4">
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[200px] p-0 pt-10">
                <AppNavigation isMobile />
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <Sun className="size-5 text-muted-foreground" />
            <Switch
              id="theme-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Moon className="size-5 text-muted-foreground" />
          </div>
        </header>

        <main className="p-4 flex-1 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;