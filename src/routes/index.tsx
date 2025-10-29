import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Typography } from 'antd';

// 컴포넌트
function HomeComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Typography.Title level={2}>API 통합 검색 플랫폼</Typography.Title>
      <Button type="primary" size="large">
        <Link to="/search">검색 시작하기</Link>
      </Button>
    </div>
  );
}

// 라우트 정의
export const Route = createFileRoute('/')({
  component: HomeComponent,
});