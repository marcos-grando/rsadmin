import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWithRefresh } from "./fetchWithRefresh";
import { refreshFetch } from "../util/theRefreshFetchBus";

export function useReadTypeList(id, key) {
    const [result, setResult] = useState({ data: [], error: null, loading: true });
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const fetchList = useCallback(async () => {
        if (!Number.isFinite(Number(id))) {
            if (mountedRef.current) setResult({ data: [], error: null, loading: false });
            return;
        };
        try {
            const res = await fetchWithRefresh(`/api/read-type-list/${id}?key=${key}`, { cache: 'no-store' });
            const { data, error } = await res.json();

            if (!mountedRef.current) return;
            if (error) setResult(r => ({ ...r, error: error, loading: false }));
            else setResult({ data, error: null, loading: false });

        } catch (err) {
            if (!mountedRef.current) return;
            setResult(r => ({ ...r, error: err.message, loading: false }));
        };
    }, [id, key]);

    useEffect(() => { fetchList().catch(() => { }); }, [fetchList]);

    useEffect(() => {
        const unsub = refreshFetch(key, fetchList); // BUS entre hooks
        return () => unsub?.();
    }, [key, fetchList]);

    return { ...result };
};