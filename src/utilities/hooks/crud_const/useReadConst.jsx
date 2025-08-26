import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWithRefresh } from "../fetchWithRefresh";

export function useReadConst(id, key) {
    const [result, setResult] = useState({ data: {}, error: null, loading: true });
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const fetchConst = useCallback(async () => {
        try {
            const res = await fetchWithRefresh(`/api/read-const/${id}?key=${key}`, {
                method: 'GET',
                cache: 'no-store'
            });
            const { data, error } = await res.json();

            if (!mountedRef.current) return;
            if (error) setResult(r => ({ ...r, error: error, loading: false }));
            else setResult({ data: data, error: null, loading: false });

        } catch (err) {
            if (!mountedRef.current) return;
            setResult(r => ({ ...r, error: err.message, loading: false }));
        };
    }, [id, key]);

    useEffect(() => { fetchConst().catch(() => { }); }, [fetchConst]);

    return { ...result };
};