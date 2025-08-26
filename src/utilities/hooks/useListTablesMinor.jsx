import { useCallback, useEffect, useState } from 'react';
import { fetchWithRefresh } from './fetchWithRefresh';

export function useListTablesMinor() {
    const [result, setResult] = useState({
        opts_types: [],
        opts_construtoras: [],
        opts_status: [],
        error: null, loading: false
    });

    const fetchOptions = useCallback(async () => {
        try {
            const res = await fetchWithRefresh('/api/read-opts');
            const json = await res.json();

            if (!res.ok) throw new Error(json.error || 'Erro ao buscar opções');

            setResult({
                opts_types: json.types || [],
                opts_construtoras: json.construtoras || [],
                opts_status: json.status || [],
                loading: false,
                error: null
            });
        } catch (err) {
            setResult(r => ({ ...r, loading: false, error: err.message }));
        }
    }, [])

    useEffect(() => {
        let mounted = true;
        fetchOptions().catch(() => { });
        return () => { mounted = false; };
    }, [fetchOptions]);

    return { ...result };
};

// Usado para criar os selects customizados nos formulários de criação/alteração de imóveis no banco de dados;