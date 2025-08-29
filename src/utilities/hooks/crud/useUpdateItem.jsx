import { useState } from "react";
import { useConfirm } from "../../contexts/ContextConfirm";
import { fetchWithRefresh } from "../fetchWithRefresh";
import { callRefreshFetch } from "../../util/theRefreshFetchBus";
import { msgFinale } from "./msgsFinalize";

export function useUpdateItem(key, keyForBus) {
    const [result, setResult] = useState({ error: null, loading: null });
    const { showConfirm, confirmDone, confirmSetError } = useConfirm();

    const updateItem = async (id, formData) => {

        const isUpdate = await showConfirm(msgFinale);
        if (!isUpdate) return;

        setResult(prev => ({ ...prev, loading: true, error: null }));

        try {
            const res = await fetchWithRefresh(`/api/update-item/${id}?key=${key}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData,
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Erro genérico');

            if (keyForBus) callRefreshFetch(keyForBus); // BUS entre hooks

            confirmDone(); // context confirm
            setResult(prev => ({ ...prev, loading: false, error: null }));
            return json.data;

        } catch (err) {
            confirmSetError(err.message); // context confirm
            setResult(prev => ({ ...prev, error: err?.message || 'Erro desconhecido', loading: false }));
            return null;
        };
    };

    return { ...result, updateItem };
};