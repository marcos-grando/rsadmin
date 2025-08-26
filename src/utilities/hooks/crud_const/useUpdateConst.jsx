import { useState } from "react";
import { useConfirm } from "../../contexts/ContextConfirm";
import { fetchWithRefresh } from '../fetchWithRefresh';
import { callRefreshFetch } from "../../util/theRefreshFetchBus";
import { KEYS_LIST } from "../../util/theMasterKeys";

export function useUpdateConst() {

    const [result, setResult] = useState({ error: null, loading: null });
    const { showConfirm, confirmDone, confirmSetError } = useConfirm();

    const updateConst = async (id, formData, key) => {

        const isUpdate = await showConfirm({
            title: "Fazer as Alterações?",
            text: [`Os dados serão alterados permanentemente.`],
            alert: "Essa ação NÃO poderá ser desfeita.",
            not: "Não, cancelar",
            yes: "Fazer Alterações",
        });
        if (!isUpdate) return;

        setResult(prev => ({ ...prev, loading: true, error: null }));

        try {
            // const res = await fetch(`/api/update-const/${id}?key=${key}`, { method: 'PATCH', body: formData });
            const res = await fetchWithRefresh(`/api/update-const/${id}?key=${key}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Erro genérico');

            callRefreshFetch(KEYS_LIST?.KEY_ALL_CONST); // BUS entre hooks

            confirmDone(); // context confirm
            setResult(prev => ({ ...prev, loading: false, error: null }));
            return json.data;

        } catch (err) {
            confirmSetError(err.message); // context confirm
            setResult(prev => ({ ...prev, error: err?.message || 'Erro desconhecido', loading: false }));
            return null;

        } finally {
            confirmDone();
        };
    };

    return { ...result, updateConst };
};