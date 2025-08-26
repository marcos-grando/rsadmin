import { useState } from "react";
import { callRefreshFetch } from "../../util/theRefreshFetchBus";
import { KEYS_LIST } from "../../util/theMasterKeys";
import { useConfirm } from "../../contexts/ContextConfirm";
import { fetchWithRefresh } from "../fetchWithRefresh";

export function useDeleteResid() {

    const [result, setResult] = useState({ error: null, loading: null });
    const { showConfirm, confirmDone, confirmSetError } = useConfirm();

    const deleteResid = async (id, name) => {

        const isDelete = await showConfirm({
            title: "Excluir Residencial?",
            text: [`"${name}" será excluído permanentemente.`],
            alert: "Essa ação NÃO poderá ser desfeita.",
            yes: "Excluir", not: "Cancelar"
        });
        if (!isDelete) return;

        setResult({ loading: true, error: null });

        try {
            // const res = await fetch(`/api/delete-resid/${id}`, { method: "DELETE" });
            const res = await fetchWithRefresh(`/api/delete-resid/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Erro genérico");

            callRefreshFetch(KEYS_LIST?.KEY_ALL_CONST); // BUS entre hooks

            confirmDone(); // context confirm
            setResult({ loading: false, error: null });
            return json.data;

        } catch (err) {
            confirmSetError(err.message); // context confirm
            setResult({ loading: false, error: err.message });
            throw err;
        };
    };

    return { ...result, deleteResid };
};