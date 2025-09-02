import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useConfirm } from "../../utilities/contexts/ContextConfirm";
import ConfirmContent from "./ConfirmContent";

function Confirm() {
    const { confirmation, visible, loadFetch } = useConfirm();
    const dialogRef = useRef(null);

    const onKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            if (loadFetch?.pending) return;
            confirmation(false);
        }
    }, [confirmation, loadFetch?.pending]);

    useEffect(() => {
        if (!visible) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        document.addEventListener("keydown", onKeyDown);
        dialogRef.current?.focus();
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [visible, onKeyDown]);

    if (!visible) return null;

    const content = <ConfirmContent dialogRef={dialogRef} />

    return createPortal(content, document.body);
}

export default Confirm;