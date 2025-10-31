import { useThemeEffect } from '@/hooks/useThemeEffect';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TanStack Query 클라이언트 생성
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
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

export default function App() {
  useThemeEffect();

  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
