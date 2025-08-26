import React from "react";
import style from "./OptsTitle.module.scss";

function OptsTitle({ optFocus, setOptFocus, infosType }) {

    return (
        <ul className={style.theTitle}>
            <li onClick={() => setOptFocus("list")}
                className={`${style.opt} ${optFocus === "list" ? style.focus : ""}`}
            >
                Lista de {infosType?.name}
            </li>
            <li onClick={() => setOptFocus("resid")}
                className={`${style.opt} ${optFocus === "resid" ? style.focus : ""}`}
            >
                Novo {infosType?.single}
            </li>
            {infosType && infosType?.name === "Residenciais" &&
                <li onClick={() => setOptFocus("const")}
                    className={`${style.opt} ${optFocus === "const" ? style.focus : ""}`}
                >
                    Nova Construtora
                </li>
            }
        </ul>
    )
}

export default OptsTitle;