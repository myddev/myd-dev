// src/hooks/useApiSpecs.ts
import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchApiSpecs } from 'src/api/fetchApiSpecs'; 
import type IApiSpec from 'src/types/IApiSpec';

export const apiSpecsQueryOptions = queryOptions<IApiSpec[], Error>({
  queryKey: ['apiSpecs'],
  queryFn: fetchApiSpecs,
  staleTime: 1000 * 60 * 60, // 1시간
});

// 2. 훅은 이 options를 재사용
export function useApiSpecs() {
  return useQuery(apiSpecsQueryOptions);
}