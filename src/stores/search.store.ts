// src/store/useSearchStore.ts
import { create } from 'zustand';
import lunr from 'lunr';

// 1. Lunr 한국어 지원 활성화
import lunrStemmerSupport from 'lunr-languages/lunr.stemmer.support.js';
import lunrKo from 'lunr-languages/lunr.ko.js';
import type IApiSpec from '@/types/IApiSpec';
import type IApiSpecField from '@/types/IApiSpecField';

lunrStemmerSupport(lunr);
lunrKo(lunr);

// 2. 검색을 위해 Request/Response 필드를 텍스트로 변환하는 헬퍼
const flattenFields = (fields: IApiSpecField[] = []): string => {
  return fields.map((f) => `${f.name} ${f.itemDescription}`).join(' ');
};

// 3. 스토어 상태 및 액션 인터페이스
interface SearchStore {
  lunrIndex: lunr.Index | null;
  apiDataMap: Map<string, IApiSpec>;
  filteredApis: IApiSpec[];
  isIndexing: boolean;
  
  // 액션
  initializeIndex: (allApis: IApiSpec[]) => void;
  performSearch: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  // 4. 초기 상태
  lunrIndex: null,
  apiDataMap: new Map(),
  filteredApis: [],
  isIndexing: false,

  // 5. 인덱스 초기화 액션
  initializeIndex: (allApis) => {
    // 이미 인덱싱되었으면 중복 실행 방지
    if (get().lunrIndex) {
      set({ filteredApis: allApis }); // 필터 목록만 초기화
      return;
    }
    
    set({ isIndexing: true });

    // 5-1. 나중에 'apiId'로 원본 데이터를 찾기 위한 Map 생성
    const dataMap = new Map<string, IApiSpec>();
    allApis.forEach(api => dataMap.set(api.compositeId, api));

    // 5-2. Lunr 인덱스 빌드
    const idx = lunr(function () {
      // 한국어 확장 사용
      this.use((lunr as any).ko);

      // 5-3. 검색 결과로 반환할 고유 ID 설정
      this.ref('compositeId');

      // 5-4. 검색 대상 필드 및 가중치(boost) 설정      
      this.field('apiId', { boost: 10 });
      this.field('apiCode', { boost: 10 });
      this.field('apiName', { boost: 5 });
      this.field('resource', { boost: 3 });
      this.field('description');
      this.field('industry');
      this.field('requestParams'); // Request Body/Params 검색용
      this.field('responseParams'); // Response Body/Params 검색용

      // 5-5. 데이터 인덱싱 (검색용 문서로 변환)
      allApis.forEach((api) => {
        this.add({
          compositeId: api.compositeId,
          apiId: api.apiId,
          apiName: api.apiName,
          apiCode: api.apiCode,
          resource: api.resource,
          description: api.description,
          industry: api.industry?.join(' '),
          // Request/Response의 name, itemDescription을 검색 가능하도록 평탄화
          requestParams: flattenFields(api.request.body) + ' ' + flattenFields(api.request.params),
          responseParams: flattenFields(api.response.body),
        });
      });
    });

    // 5-6. 스토어에 인덱스, 데이터 맵, 초기 목록 저장
    set({
      lunrIndex: idx,
      apiDataMap: dataMap,
      filteredApis: allApis, // 처음엔 전체 목록
      isIndexing: false,
    });
  },

  // 6. 검색 실행 액션
  performSearch: (query) => {
    const { lunrIndex, apiDataMap } = get();

    // 6-1. 검색어가 없으면 전체 목록 반환
    if (!query || !lunrIndex) {
      set({ filteredApis: [...apiDataMap.values()] });
      return;
    }

    // 6-2. Lunr 검색 실행 (와일드카드 추가로 부분 검색 강화)
    try {
      const results = lunrIndex.search(`*${query}*`);

      // 6-3. 결과(ref)를 원본 데이터(IApiSpec)로 매핑
      const foundApis = results.map((r) => apiDataMap.get(r.ref)).filter(Boolean) as IApiSpec[];
      set({ filteredApis: foundApis });
    } catch (e) {
      // Lunr가 빈 쿼리나 특정 문자를 처리 못할 때 대비
      console.warn('Lunr search error:', e);
      set({ filteredApis: [...apiDataMap.values()] });
    }
  },
}));