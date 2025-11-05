import { createFileRoute } from '@tanstack/react-router';
import { apiSpecsQueryOptions } from '@/hooks/useApiSpecs';
import { useEffect, useMemo } from 'react';
import { useSearchStore } from '@/stores/search.store';
import { z } from 'zod'; // 쿼리 파라미터 검증을 위해 zod 임포트
import SearchLayout from '@/components/SearchLayout';
import ApiListComponent from '@/components/ApiListComponent';
import ApiSpecDetail from '@/components/ApiSpecDetail';

const searchSearchSchema = z.object({
  id: z.string().optional(), // apiId는 문자열이며 선택적
});

export const Route = createFileRoute('/search')({
  validateSearch: searchSearchSchema,
  // 1. 'allApis' 데이터를 미리 로드하여 자식 라우트가 사용하도록 함
  // 이 데이터는 search.index.tsx와 search.$apiId.tsx에서 공유됩니다.
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(apiSpecsQueryOptions);
  },

  // 3. 자식 라우트(index 또는 $apiId)를 렌더링할 <Outlet>
  component: SearchRouteComponent,
});

function SearchRouteComponent() {
  const allApis = Route.useLoaderData();
  const initializeIndex = useSearchStore((s) => s.initializeIndex);
  const filteredApis = useSearchStore((s) => s.filteredApis);
  const { id } = Route.useSearch();
  const api = useMemo(() => allApis.find((v) => v.compositeId === id), [id, allApis]);
  useEffect(() => {
    initializeIndex(allApis);
  }, [allApis, initializeIndex]);

  return (
    <SearchLayout
      // 7. 리스트 패널 전달
      listPanel={<ApiListComponent apis={filteredApis} />}
      // 8. 쿼리 파라미터로 조회된 'api'가 있을 때만 'detailPanel'을 전달
      // 'api'가 없으면 null이 전달되고, SearchLayout이 알아서 flex 레이아웃을 조정함
      detailPanel={api ? <ApiSpecDetail api={api} /> : null}
    />
  );
}
