import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, Box, Settings } from 'lucide-react'; // 아이콘 임포트

// 컴포넌트
function HomeComponent() {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-semibold tracking-tight mb-6">
        API 통합 검색 플랫폼
      </h2>

      {/* 카드 그리드 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* 1. API 검색 카드 (활성) */}
        <Link to="/search" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
          <Card className="h-full transition-all duration-150 hover:border-primary hover:shadow-md cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Search className="size-6 text-primary" />
                <CardTitle>API 검색</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                통합된 API 문서를 검색하고, 요청/응답 명세를 탐색합니다.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

// 라우트 정의 (변경 없음)
export const Route = createFileRoute('/')({
  component: HomeComponent,
});