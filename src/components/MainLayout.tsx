import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Home, Search, Menu, Sun, Moon, Github } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import SvgLogo from '@/assets/logo.svg?react';
import { useThemeStore } from '@/stores/theme.store';
import { useEffectiveTheme } from '@/hooks/useEffectiveTheme';

// 네비게이션 메뉴 컴포넌트
const AppNavigation = () => {
  const { setTheme } = useThemeStore();
  const mode = useEffectiveTheme();
  const isDarkMode = mode === 'dark';

  const setIsDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <nav className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-2 px-4">
        <Button
          variant="ghost"
          className="justify-start w-full gap-2"
          asChild
        >
          <Link to="/" activeProps={{ className: 'text-primary bg-accent' }}>
            <Home className="size-4" /> 홈
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="justify-start w-full gap-2"
          asChild
        >
          <Link to="/search" activeProps={{ className: 'text-primary bg-accent' }}>
            <Search className="size-4" /> 검색
          </Link>
        </Button>
      </div>

      <div className="px-4 pb-4 space-y-3 border-t pt-4">
        <div className="flex items-center justify-center gap-2">
          <Sun className="size-5 text-muted-foreground" />
          <Switch
            id="theme-toggle"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
          />
          <Moon className="size-5 text-muted-foreground" />
        </div>
        <a
          href="https://github.com/myddev/myd-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <Button variant="ghost" size="icon">
            <Github className="size-5" />
          </Button>
        </a>
      </div>
    </nav>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-dvh w-full bg-background">
      <aside className="hidden lg:flex w-[200px] border-r bg-muted flex-col flex-shrink-0">
        <div className="h-14 flex items-center justify-center flex-shrink-0">
          <Link to="/">
            <SvgLogo className="size-16 mr-2 fill-foreground cursor-pointer" />
          </Link>
        </div>
        <div className="flex-1 min-h-0">
          <AppNavigation />
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full min-w-0">
        <header className="z-10 h-14 flex items-center justify-between border-b bg-background px-4">
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[200px] p-0 pt-10">
                <AppNavigation />
              </SheetContent>
            </Sheet>
          </div>

          <div className="lg:hidden flex items-center">
            <Link to="/">
              <SvgLogo className="size-12 fill-foreground" />
            </Link>
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