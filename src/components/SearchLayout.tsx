import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useSearchStore } from 'src/stores/search.store';
import useDebounce from 'src/hooks/useDebounce';

interface SearchLayoutProps {
  listPanel: React.ReactNode;
  detailPanel: React.ReactNode | null; // detailPanel은 null일 수 있습니다.
}

export default function SearchLayout({
  listPanel,
  detailPanel,
}: SearchLayoutProps) {
  const performSearch = useSearchStore((s) => s.performSearch);
  const isIndexing = useSearchStore((s) => s.isIndexing);
  const hasDetailPanel = detailPanel !== null;

  // 2. 입력창의 현재 값을 저장할 로컬 state
  const [inputValue, setInputValue] = useState('');

  // 3. inputValue를 250ms 딜레이로 디바운스합니다.
  //    (사용자가 250ms 동안 타이핑을 멈추면 debouncedQuery가 업데이트됩니다.)
  const debouncedQuery = useDebounce(inputValue, 150);

  // 4. "디바운스된 값(debouncedQuery)"이 변경될 때만 검색을 실행합니다.
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  return (
    <div className="flex flex-col h-full">
<Input.Search
        placeholder="API 이름, ID, 파라미터명 등으로 검색..."
        size="large"
        className="mb-4"
        disabled={isIndexing}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onSearch={(value) => {
          setInputValue(value); // state도 동기화
          performSearch(value); // 즉시 검색
        }}
        allowClear
      />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`h-full overflow-y-auto ${
            hasDetailPanel
              ? 'w-full hidden lg:block lg:w-1/3 border-r pr-4 border-border'
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
        ) : // 상세 패널이 null이면 아무것도 렌더링하지 않음
        null}
      </div>
    </div>
  );
}
