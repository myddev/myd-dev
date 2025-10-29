import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import ApiListComponent from 'src/components/ApiListComponent';
import SearchLayout from 'src/components/SearchLayout'; // 1. 공유 레이아웃 임포트

function SearchIndexComponent() {
  const allApis = useLoaderData({ from: '/search' });

  return (
    <SearchLayout
      // 2. 리스트 패널 전달
      listPanel={<ApiListComponent apis={allApis} />}
      // 3. 상세 패널에 null 전달
      detailPanel={null}
    />
  );
}

export const Route = createFileRoute('/search/')({
  component: SearchIndexComponent,
});
