import { useState } from "react";
import { callRefreshFetch } from "../../util/theRefreshFetchBus";
import { useConfirm } from "../../contexts/ContextConfirm";
import { fetchWithRefresh } from "../fetchWithRefresh";
import { msgFinaleDelete } from "./msgsFinalize";

export function useDeleteItem(key, keyForBus) {

    const [result, setResult] = useState({ error: null, loading: null });
    const { showConfirm, confirmDone, confirmSetError } = useConfirm();

    const deleteItem = async (id, name, count) => {

        const isDelete = await showConfirm(msgFinaleDelete(key, name, count));
        if (!isDelete) return;

        setResult({ loading: true, error: null });

        try {
            const res = await fetchWithRefresh(`/api/delete-item/${id}?key=${key}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Erro genérico");

            if (keyForBus) callRefreshFetch(keyForBus); // BUS entre hooks

            confirmDone(); // context confirm
            setResult({ loading: false, error: null });
            return json.data;

        } catch (err) {
            confirmSetError(err.message); // context confirm
            setResult({ loading: false, error: err.message });
            throw err;
        };
    };

    return { ...result, deleteItem };
};