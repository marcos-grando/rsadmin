import { createContext, useCallback, useContext, useRef, useState } from "react";

const ConfirmContext = createContext(null);

function ContextConfirm({ children }) {
    const [message, setMessage] = useState({ title: "", text: [], alert: "", yes: "", not: "" });
    const [visible, setVisible] = useState(false);
    const [loadFetch, setLoadFetch] = useState({ pending: false, errorMsg: "", isClosing: false });
    const resolverRef = useRef(null);

    const showConfirm = useCallback((content) => {
        if (resolverRef.current) return Promise.reject(new Error("Já existe um diálogo aberto."));
        setMessage({
            title: content?.title ?? "",
            text: content?.text ?? [],
            alert: content?.alert ?? "",
            yes: content?.yes ?? "OK",
            not: content?.not ?? "Cancelar",
        });
        setLoadFetch({ pending: false, errorMsg: "", isClosing: false });
        setVisible(true);
        return new Promise((resolve) => { resolverRef.current = resolve; });
    }, []);

    const confirmation = useCallback((value) => {
        if (!resolverRef.current) return;
        resolverRef.current(!!value);
        resolverRef.current = null;

        if (value) {
            setLoadFetch(prev => ({ ...prev, pending: true, errorMsg: "" }));
        } else {
            setLoadFetch(prev => ({ ...prev, isClosing: true }));
        }
    }, []);

    const confirmDone = useCallback(() => {
        setLoadFetch(prev => ({ ...prev, pending: false, isClosing: true }));
    }, []);
    const confirmSetError = useCallback((msg) => {
        setLoadFetch(prev => ({ ...prev, pending: false, errorMsg: msg || "Algo deu errado." }));
    }, []);

    const closeWindow = useCallback(() => {
        setVisible(false);
        setLoadFetch({ pending: false, errorMsg: "", isClosing: false });
    }, []);

    const value = {
        showConfirm, confirmation, confirmDone, confirmSetError, closeWindow,
        message, visible, loadFetch
    };

    return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
}

export default ContextConfirm;
export const useConfirm = () => useContext(ConfirmContext);
