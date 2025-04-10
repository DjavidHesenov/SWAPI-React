import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { ApiResponse } from '../types/api';
import { useData } from '../context/DataContext';

const cache = new Map<string, ApiResponse<any>>();

// Define allowed resource keys
export type ResourceType = 'films' | 'people' | 'planets' | 'species' | 'vehicles' | 'starships';

export function useInfiniteScroll<T>(initialUrl: string, resourceType: ResourceType) {
  const { state, dispatch } = useData();
  const [nextUrl, setNextUrl] = useState<string | null>(initialUrl);
  const { ref, inView } = useInView();
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string) => {
    if (cache.has(url)) {
      const cachedData = cache.get(url)!;
      const existingUrls = new Set((state.data[resourceType] || []).map((item: any) => item.url));
      const newResults = cachedData.results.filter((item: any) => !existingUrls.has(item.url));

      if (newResults.length > 0) {
        dispatch({
          type: 'SET_DATA',
          resourceType,
          data: [...(state.data[resourceType] || []), ...newResults],
        });
      }
      setNextUrl(cachedData.next);
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', resourceType, loading: true });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');

      const json: ApiResponse<T> = await response.json();
      cache.set(url, json);

      const existingUrls = new Set((state.data[resourceType] || []).map((item: any) => item.url));
      const newResults = json.results.filter((item: any) => !existingUrls.has(item.url));

      if (newResults.length > 0) {
        dispatch({
          type: 'SET_DATA',
          resourceType,
          data: [...(state.data[resourceType] || []), ...newResults],
        });
      }
      setNextUrl(json.next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      dispatch({ type: 'SET_LOADING', resourceType, loading: false });
    }
  }, [dispatch, resourceType, state.data]);

  useEffect(() => {
    if (!nextUrl || state.loading[resourceType]) return;
  
    const hasData = (state.data[resourceType] || []).length > 0;
  
    // Fetch immediately on first load
    if (!hasData) {
      fetchData(nextUrl);
      return;
    }
  
    // Fetch more if the scroll target is in view
    if (inView) {
      fetchData(nextUrl);
    }
  }, [inView, nextUrl, state.loading, fetchData, resourceType, state.data]);
  
  const reset = useCallback(() => {
    dispatch({ type: 'SET_DATA', resourceType, data: [] });
    setNextUrl(initialUrl);
    setError(null);
  }, [dispatch, initialUrl, resourceType]);

  return {
    data: state.data[resourceType] as T[] || [],
    isLoading: state.loading[resourceType] || false,
    error,
    ref,
    reset,
    hasMore: !!nextUrl,
  };
}