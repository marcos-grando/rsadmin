import { useState } from 'react';
import { callRefreshFetch } from '../../util/theRefreshFetchBus';
import { KEYS_LIST } from '../../util/theMasterKeys';

export function useCreateResid() {
    const [result, setResult] = useState({ data: null, error: null, loading: false });

    const createResid = async (formData) => {
        setResult(prev => ({ ...prev, loading: true, error: null }));

        try {
            // const res = await fetch('/api/create-resid', { method: 'POST', body: formData, });
            const res = await fetchWithRefresh(`/api/create-resid`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData,
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Erro genérico');

            callRefreshFetch(KEYS_LIST?.KEY_ALL_CONST); // BUS entre hooks

            setResult({ data: json.data || null, error: null, loading: false });
            return json.data;

        } catch (err) {
            setResult(prev => ({ ...prev, error: err?.message || 'Erro desconhecido', loading: false }));
            throw err;
        }
    };

    return { ...result, createResid };
};