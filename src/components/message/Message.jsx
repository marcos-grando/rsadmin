import React from "react";
import style from "./Message.module.scss";
import { X as IconCloseWindow } from "lucide-react";
import { useMessage } from "../../utilities/contexts/ContextMessage";

function Message() {
    const { message, closeWindow, visible, closeAnimated } = useMessage();
    if (!visible || !message) return null;

    return (
        <div className={`${style.messageWindow} ${closeAnimated ? style.closeWindow : ""}`} style={{ borderColor: `var(--${message?.type})` }}>
            <IconCloseWindow onClick={() => closeWindow()} />
            <div className={`${style.content} ${style?.[message.type]}`} >
                {message.content}
            </div>
        </div>
    )
}

export default Message;

// Tipo de 'message.content' esperado:

// return <>
//     <h2>Cadastro Concluído!</h2>
//     <p>Residencial {nameFormData} cadastrado com sucesso!</p>
// </>

// Podendo ter qnts <p> for necessário;
// Todo h2 e span vai ter coloração;