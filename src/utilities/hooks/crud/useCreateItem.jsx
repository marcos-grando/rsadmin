import { useState } from 'react';
import { fetchWithRefresh } from '../fetchWithRefresh';
import { callRefreshFetch } from '../../util/theRefreshFetchBus';

export function useCreateItem(key, keyForBus) {
    const [result, setResult] = useState({ data: null, error: null, loading: false });

    const createItem = async (formData) => {
        setResult(prev => ({ ...prev, loading: true, error: null }));

        try {
            const res = await fetchWithRefresh(`/api/create-item/?key=${key}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData,
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Erro genérico');

            if (keyForBus) callRefreshFetch(keyForBus); // BUS entre hooks

            setResult({ data: json.data || null, error: null, loading: false });
            return json.data;

        } catch (err) {
            setResult(prev => ({ ...prev, error: err?.message || 'Erro desconhecido', loading: false }));
            throw err;
        };
    };

    return { ...result, createItem };
};