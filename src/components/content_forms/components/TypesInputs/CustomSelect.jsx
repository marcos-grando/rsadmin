import { useState, useRef, useEffect } from "react";
import style from "./CustomSelect.module.scss";

export default function CustomSelect({ options = [], pathname, label, value, onChange, disabled }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const outside = event => { if (!ref.current?.contains(event.target)) setOpen(false); };
        document.addEventListener("pointerdown", outside, true);
        return () => document.removeEventListener("pointerdown", outside, true);
    }, []);
    const selected = options.find(option => option.id === value);
    return (
        <div ref={ref} className={style.customSelect + (disabled ? " " + style.disabled : "")}
            onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
            <input type="hidden" name={pathname} value={value ?? ""} />
            <button type="button" aria-label={label} aria-haspopup="listbox" aria-expanded={open} disabled={disabled}
                onClick={() => setOpen(!open)}>{selected?.name || "-- Selecione --"}</button>
            {open && !disabled && <div className={style.customOptions} role="listbox" aria-label={label}>
                {options.map(option => <button key={option.id} type="button" role="option"
                    aria-selected={option.id === value}
                    className={style.option + (option.id === value ? " " + style.selected : "")}
                    onClick={() => { onChange(option.id); setOpen(false); ref.current.querySelector("button")?.focus(); }}>{option.name}</button>)}
            </div>}
        </div>
    );
}
