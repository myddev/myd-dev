// src/routes/search.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { apiSpecsQueryOptions } from 'src/hooks/useApiSpecs';
import { Spin } from 'antd';

export const Route = createFileRoute('/search')({
  // 1. 'allApis' 데이터를 미리 로드하여 자식 라우트가 사용하도록 함
  // 이 데이터는 search.index.tsx와 search.$apiId.tsx에서 공유됩니다.
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(apiSpecsQueryOptions);
  },

  // 2. 데이터 로딩 중에 표시할 스피너
  pendingComponent: () => <Spin size="large" className="m-auto" />,

  // 3. 자식 라우트(index 또는 $apiId)를 렌더링할 <Outlet>
  component: () => <Outlet />,
});
