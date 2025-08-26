import React, { useState, useRef, useEffect } from 'react';
import style from "./CustomSelect.module.scss";

function CustomSelect({ options = [], pathname, value, onChange, required, disabled, }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('pointerdown', handleClickOutside, true);
        return () => document.removeEventListener('pointerdown', handleClickOutside, true);
    }, []);

    const handleSelect = (opt) => {
        onChange(opt.id);
        setTimeout(() => setOpen(false), 100);
    };
    const selected = options.find(o => o.id === value);

    // Estilos definidos em style/Steps.scss;
    return (
        <div ref={ref} className={`${style.customSelect} ${disabled ? style.disabled : ''}`} role="listbox" aria-expanded={open}>

            <input type="hidden" name={pathname} value={value ?? ''} />

            <button type="button" onClick={() => !disabled && setOpen(!open)} disabled={disabled} aria-disabled={disabled}>
                {selected?.name || '-- Selecione --'}
            </button>

            {open && !disabled && (
                <div className={style.customOptions}>
                    {options.map(opt => (
                        <div
                            key={opt.id} role="option"
                            aria-selected={opt.id === value}
                            className={`${style.option} ${opt.id === value ? style.selected : ''}`}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;