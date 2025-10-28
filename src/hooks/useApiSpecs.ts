// src/hooks/useApiSpecs.ts
import { useQuery } from '@tanstack/react-query';
import { fetchApiSpecs } from 'src/api/fetchApiSpecs'; 
import type IApiSpec from 'src/types/IApiSpec';

export default function useApiSpecs() {
  return useQuery<IApiSpec[], Error>({
    queryKey: ['apiSpecs'],
    queryFn: fetchApiSpecs, 
    staleTime: Infinity, 
  });
};