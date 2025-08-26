import React from "react";
import style from "./InfosItem.module.scss";
import { Trash2 as RemoveIcon, ArrowBigRightDash as LinkIcon } from "lucide-react";
// import Loading from "../../../Loading";

function InfosItem({ eachItem, grid_columns, iCont, itemRef, theOptSelect, onDeleteClick }) {

    const brlFormat = (valor) => {
        // const valor = Number(value);
        return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };

    const onDelete = async (e, id, name, count) => {
        e.stopPropagation();
        await onDeleteClick(id, name, count);
    };

    return (
        <li ref={itemRef}
            className={style.infosItem}
            style={{ gridTemplateColumns: grid_columns.grid }}
            onClick={theOptSelect ? () => theOptSelect(eachItem) : null}
        >
            <p className={style.uniq}>{iCont}</p>
            {grid_columns.total === 7 && <p>{eachItem.tipo}</p>}
            <p>{eachItem.name}</p>
            <p>{eachItem.local}</p>
            <p>{brlFormat(eachItem.valor)}</p>

            <p className={`${style.uniq} ${style.delete}`}
                onClick={(e) => onDelete(e, eachItem.id, eachItem.name, eachItem.items_count)}
            >
                <RemoveIcon size={14} />
            </p>

            <p className={`${style.uniq} ${style.link}`}><LinkIcon size={14} /></p>
        </li>
    )
}

export default InfosItem;