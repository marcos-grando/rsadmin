import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./ConfirmContent.module.scss";
import { Loader2 } from "lucide-react";
import { useConfirm } from "../../utilities/contexts/ContextConfirm";

function ConfirmContent({ dialogRef }) {

    const { message, loadFetch, confirmation, closeWindow } = useConfirm(); // pending errorMsg isClosing
    const [opening, setOpening] = useState(false);
    const [closing, setClosing] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(() => setOpening(true));
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    useEffect(() => {
        if (loadFetch?.isClosing) setClosing(true);
    }, [loadFetch?.isClosing])

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget && !loadFetch?.pending) {
            confirmation(false);
        }
    }, [confirmation, loadFetch?.pending]);

    const onYes = () => { if (!loadFetch?.pending) confirmation(true); };
    const onNot = () => { if (!loadFetch?.pending) confirmation(false); };

    const handleTransitionEnd = useCallback((e) => {
        if (!closing) return;
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== "opacity") return;
        closeWindow();
    }, [closing, closeWindow]);

    return (
        <div ref={dialogRef}
            role="dialog" aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-text"
            // aria-descri
            tabIndex={-1}
            onClick={handleBackdropClick}
            onTransitionEnd={handleTransitionEnd}
            className={`${style.modalConfirm} ${opening ? style.openConfirm : ""} ${closing ? style.closeConfirm : ""}`}
        >
            <div className={style.content}>

                <h2 id="confirm-title">{message.title}</h2>
                <div id="confirm-text" className={style.theText}>
                    {message?.text.map((eachP, i) => (
                        <p key={i}>{eachP}</p>
                    ))}
                </div>
                <p className={style.theAlert}>{message.alert}</p>

                <div className={style.buttons}>
                    <button className={`${style.buttonTrue} ${loadFetch?.pending ? style.loadingTrue : ""}`}
                        disabled={loadFetch?.pending}
                        onClick={onYes}
                    >
                        <p>{message.yes}</p>
                        {loadFetch?.pending ? <Loader2 strokeWidth={3} size={28} /> : ""}
                    </button>
                    <button className={style.buttonFalse}
                        disabled={loadFetch?.pending}
                        onClick={onNot}
                    >
                        <p>{message.not}</p>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ConfirmContent;