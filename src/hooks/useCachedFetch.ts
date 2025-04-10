// hooks/useCachedFetch.ts
import { useEffect, useState, useCallback } from 'react';
import { ApiResponse } from '../types/api';

const cache = new Map<string, any>();

type Options = {
    paginated?: boolean;
    enabled?: boolean;
    initialDataResolver?: () => any | null; // 👈 NEW
};

export function useCachedFetch<T>(url: string, options?: Options) {
    const { paginated = false, enabled = true, initialDataResolver } = options || {};
    const [data, setData] = useState<T[] | T | null>(() => {
        // 👇 Try resolver first
        const resolved = initialDataResolver?.();
        if (resolved) {
            cache.set(url, resolved);
            return resolved;
        }
        // 👇 Fallback to cache if available
        return cache.get(url) ?? null;
    });

    const [isLoading, setIsLoading] = useState<boolean>(!data && enabled);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        // ✅ Early exit if data already cached
        if (cache.has(url)) {
            setData(cache.get(url));
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (paginated) {
                let allData: T[] = [];
                let nextUrl: string | null = url;

                while (nextUrl) {
                    const res = await fetch(nextUrl);
                    if (!res.ok) throw new Error('Failed to fetch data');
                    const json: ApiResponse<T> = await res.json();
                    allData = [...allData, ...json.results];
                    nextUrl = json.next;
                }

                cache.set(url, allData);
                setData(allData);
            } else {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch data');
                const json = await res.json();
                const result = json.results ?? json;
                cache.set(url, result);
                setData(result);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [url, paginated, enabled]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        cache.delete(url);
        fetchData();
    };

    return {
        data: cache.get(url) ?? data, // Return cached if set externally
        isLoading,
        error,
        refetch
    };
}
