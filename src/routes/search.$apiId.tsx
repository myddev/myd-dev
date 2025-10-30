import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import ApiSpecDetail from 'src/components/ApiSpecDetail';
import ApiListComponent from 'src/components/ApiListComponent';
import SearchLayout from 'src/components/SearchLayout'; // 1. 공유 레이아웃 임포트
import { Spin, Alert } from 'antd';
import { useSearchStore } from 'src/stores/search.store';

function ApiDetailComponent() {
  const filteredApis = useSearchStore((s) => s.filteredApis);
  const selectedApi = useLoaderData({ from: '/search/$apiId' });

  return (
    <SearchLayout
      // 2. 리스트 패널 전달 (데스크톱에서는 보이고 모바일에선 숨겨짐)
      listPanel={<ApiListComponent apis={filteredApis} />}
      // 3. 상세 패널 전달
      detailPanel={<ApiSpecDetail api={selectedApi} />}
    />
  );
}

export const Route = createFileRoute('/search/$apiId')({
  loader: async ({ params: { apiId }, parentMatchPromise }) => {
    const parentMatch = await parentMatchPromise;
    const allApis = parentMatch.loaderData;
    const selectedApi = allApis?.find((api) => api.apiId === apiId);
    if (!selectedApi) {
      throw new Error('API not found');
    }
    return selectedApi;
  },
  errorComponent: ({ error }) => (
    <Alert
      message="API를 찾을 수 없습니다."
      description={error.message}
      type="error"
    />
  ),
  pendingComponent: () => <Spin size="large" className="m-auto" />,
  component: ApiDetailComponent,
});
