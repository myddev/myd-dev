import React, { useEffect } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import { useSearchStore } from '@/stores/search.store';
import useDebounce from '@/hooks/useDebounce';

interface SearchLayoutProps {
  listPanel: React.ReactNode;
  detailPanel: React.ReactNode | null;
}

export default function SearchLayout({
  listPanel,
  detailPanel,
}: SearchLayoutProps) {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const performSearch = useSearchStore((s) => s.performSearch);
  const isIndexing = useSearchStore((s) => s.isIndexing);
  const hasDetailPanel = detailPanel !== null;

  const debouncedQuery = useDebounce(query, 150);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  return (
    <div className="flex flex-col h-full">
      <InputGroup className="mb-4">
        <InputGroupInput
          type="search"
          placeholder="API 이름, ID, 파라미터명 등으로 검색..."
          className="h-10"
          disabled={isIndexing}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              performSearch(query); // 즉시 검색
            }
          }}
        />

        <InputGroupAddon align="inline-start">
          <Search className="h-5 w-5 text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>

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

        {hasDetailPanel ? (
          <div className="w-full lg:w-2/3 h-full overflow-y-auto lg:pl-4">
            {detailPanel}
          </div>
        ) : null}
      </div>
    </div>
  );
}
