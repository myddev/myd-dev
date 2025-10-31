import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

// 컴포넌트
function HomeComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-semibold tracking-tight mb-4">
        API 통합 검색 플랫폼
      </h2>
      <Button size="lg" asChild>
        <Link to="/search">검색 시작하기</Link>
      </Button>
    </div>
  );
}

// 라우트 정의 (변경 없음)
export const Route = createFileRoute('/')({
  component: HomeComponent,
});