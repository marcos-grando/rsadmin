import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const MessageContext = createContext();

function ContextMessage({ children }) {

    const [message, setMessage] = useState({ type: "", content: "" });
    const [visible, setVisible] = useState(false);
    const [closeAnimated, setCloseAnimated] = useState(false);

    const timerRef = useRef(null);
    const closingRef = useRef(null);

    useEffect(() => () => { clearTimeout(timerRef.current); clearTimeout(closingRef.current); }, []);

    const openWindow = useCallback(() => {
        clearTimeout(closingRef.current);
        setCloseAnimated(false);
        setVisible(true);
    }, []);

    const closeWindow = useCallback(() => {
        clearTimeout(timerRef.current);
        clearTimeout(closingRef.current);
        setCloseAnimated(true);

        closingRef.current = setTimeout(() => {
            setCloseAnimated(false);
            setVisible(false);
        }, 550);
    }, []);

    // type => sucess, error, warning;
    const showMessage = useCallback((type, content, duration = 15000) => {
        clearTimeout(timerRef.current);
        setMessage({ type: type, content: content });
        openWindow();

        timerRef.current = setTimeout(() => {
            closeWindow();
        }, duration);
    }, [closeWindow, openWindow]);

    const value = { showMessage, closeWindow, visible, message, closeAnimated }
    // message => type: sucess/error/warning, content: conteúdo/mensagem;
    // showMessage => define o estado + open/close window;
    // visible => bool open/close window;
    // closeWindow => possibilita interação do usuário para fechar;
    // closeAnimated => tempo para animação de style.closeWindow;

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};

export default ContextMessage;
export const useMessage = () => useContext(MessageContext);
