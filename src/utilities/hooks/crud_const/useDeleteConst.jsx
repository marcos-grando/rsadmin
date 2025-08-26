import { useState } from "react";
import { useConfirm } from "../../contexts/ContextConfirm";
import { fetchWithRefresh } from '../fetchWithRefresh';
import { callRefreshFetch } from '../../util/theRefreshFetchBus';
import { KEYS_LIST } from '../../util/theMasterKeys';

export function useDeleteConst() {

    const [result, setResult] = useState({ error: null, loading: null });
    const { showConfirm, confirmDone, confirmSetError } = useConfirm();

    const deleteConst = async (id, name, count) => {

        const isDelete = await showConfirm({
            title: `Excluir Construtora?`,
            text: [
                `"${name}" será excluída permanentemente.`,
                count === 0
                    ? `Info: Construtora não possui imóvel registrado.`
                    : count > 1
                        ? `Info: ${count} imóveis serão movidos para "Sem Construtora".`
                        : `Info: ${count} imóvel será movido para "Sem Construtora".`,
                // "Outros textos..."
            ],
            alert: "Essa ação NÃO poderá ser desfeita.",
            not: "Não, cancelar",
            yes: "Sim, excluir",
        });
        if (!isDelete) return;

        setResult(prev => ({ ...prev, loading: true, error: null }));

        try {
            // const res = await fetch(`/api/delete-const/${id}`, { method: "DELETE" });
            const res = await fetchWithRefresh(`/api/delete-const/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Erro genérico');

            callRefreshFetch(KEYS_LIST?.KEY_ALL_CONST); // BUS entre hooks

            confirmDone(); // context confirm
            setResult(prev => ({ ...prev, loading: false, error: null }));
            return json.data;

        } catch (err) {
            confirmSetError(err.message); // context confirm
            setResult(prev => ({ ...prev, loading: false, error: err.message }));
            throw err;
        };
    };

    return { ...result, deleteConst };
};