import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { ApiResponse } from '../types/api';
import { useData } from '../context/DataContext';

const cache = new Map<string, ApiResponse<any>>();

export function useInfiniteScroll<T>(initialUrl: string, resourceType: string) {
  const { state, dispatch } = useData();
  const [nextUrl, setNextUrl] = useState<string | null>(initialUrl);
  const { ref, inView } = useInView();
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string) => {
    if (cache.has(url)) {
      const cachedData = cache.get(url)!;
      // Only set data if we don't already have these results
      const existingUrls = new Set(state.data[resourceType].map(item => item.url));
      const newResults = cachedData.results.filter(item => !existingUrls.has(item.url));

      if (newResults.length > 0) {
        dispatch({
          type: 'SET_DATA',
          resourceType,
          data: [...state.data[resourceType], ...newResults]
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

      // Only add new items that don't already exist in the state
      const existingUrls = new Set(state.data[resourceType].map(item => item.url));
      const newResults = json.results.filter(item => !existingUrls.has(item.url));

      if (newResults.length > 0) {
        dispatch({
          type: 'SET_DATA',
          resourceType,
          data: [...state.data[resourceType], ...newResults]
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
    // Only fetch if we don't have any data yet or if we're scrolling and there's more to load
    if (!nextUrl || state.loading[resourceType] || !inView) return;
    if (state.data[resourceType].length === 0 || inView) {
      fetchData(nextUrl);
    }
  }, [inView, nextUrl, state.loading, fetchData, resourceType, state.data]);

  const reset = useCallback(() => {
    dispatch({ type: 'SET_DATA', resourceType, data: [] });
    setNextUrl(initialUrl);
    setError(null);
  }, [dispatch, initialUrl, resourceType]);

  return {
    data: state.data[resourceType] || [],
    isLoading: state.loading[resourceType] || false,
    error,
    ref,
    reset,
    hasMore: !!nextUrl
  };
}