import { useCallback, useEffect, useRef, useState } from 'react';
import { refreshFetch } from '../util/theRefreshFetchBus';
import { fetchWithRefresh } from './fetchWithRefresh';

export function useReadList(key) {
    const [result, setResult] = useState({ data: [], error: null, loading: true });
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const fetchList = useCallback(async () => {
        try {
            const res = await fetchWithRefresh(`/api/read-list?key=${key}`, { cache: 'no-store' });
            const { data, error } = await res.json();

            if (!mountedRef.current) return;
            if (error) setResult(r => ({ ...r, error: error, loading: false }));
            else setResult({ data, error: null, loading: false });

        } catch (err) {
            if (!mountedRef.current) return;
            setResult(r => ({ ...r, error: err.message, loading: false }));
        };
    }, [key]);

    useEffect(() => { fetchList().catch(() => { }); }, [fetchList]);

    useEffect(() => {
        const unsub = refreshFetch(key, fetchList); // BUS entre hooks
        return () => unsub?.();
    }, [key, fetchList]);

    return { ...result };
};