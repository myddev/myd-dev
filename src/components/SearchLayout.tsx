import React from 'react';
import { Input } from 'antd';

interface SearchLayoutProps {
  listPanel: React.ReactNode;
  detailPanel: React.ReactNode | null; // detailPanel은 null일 수 있습니다.
}

export default function SearchLayout({ listPanel, detailPanel }: SearchLayoutProps) {
  // 상세 패널이 존재하는지 여부 (null이 아님)
  const hasDetailPanel = detailPanel !== null;

  return (
    <div className="flex flex-col h-full">
      {/* 공통 검색창 */}
      <Input.Search
        placeholder="API 이름, ID, 리소스 등으로 검색..."
        size="large"
        className="mb-4"
      />
      {/* 메인 Flex 컨테이너 */}
      <div className="flex h-full overflow-hidden">
        {/* 1. 좌측 패널 (리스트) */}
        <div
          className={`h-full overflow-y-auto ${
            hasDetailPanel
              // 상세 패널이 있으면: 데스크톱(lg)에서만 보이고 1/3 너비
              ? 'w-full hidden lg:block lg:w-1/3 border-r pr-4 dark:border-r-gray-700'
              // 상세 패널이 없으면(null): 항상 전체 너비
              : 'w-full'
          }`}
        >
          {listPanel}
        </div>

        {/* 2. 우측 패널 (상세) */}
        {hasDetailPanel ? (
          // 상세 패널이 있으면: 모바일에선 전체, 데스크톱에선 2/3 너비
          <div className="w-full lg:w-2/3 h-full overflow-y-auto lg:pl-4">
            {detailPanel}
          </div>
        ) : (
          // 상세 패널이 null이면 아무것도 렌더링하지 않음
          null
        )}
      </div>
    </div>
  );
}