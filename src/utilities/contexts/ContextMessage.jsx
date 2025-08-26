import { createContext, useCallback, useContext, useRef, useState } from "react";
// context controlar o render de src/components/Message.jsx em src/App.jsx;

const MessageContext = createContext();

function ContextMessage({ children }) {

    const [message, setMessage] = useState({ type: "", content: "" });
    const [visible, setVisible] = useState(false);
    const [closeAnimated, setCloseAnimated] = useState(false);

    const timerRef = useRef(null);

    const openWindow = useCallback(() => {
        setCloseAnimated(false);
        setVisible(true);
    }, []);

    const closeWindow = useCallback(() => {
        clearTimeout(timerRef.current);
        setCloseAnimated(true);

        setTimeout(() => {
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
    }, [closeWindow]);

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