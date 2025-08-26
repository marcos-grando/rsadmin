import React from "react";
import { ArrowUpDown as IconSort } from "lucide-react";
import style from "./InfosTitle.module.scss";

function InfosTitle({ grid_columns, field_titles, sort, setSort }) {

    const handleSort = (field) => {
        setSort((prev) => ({
            field: field, order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <>
            <div className={style.infosTitle} style={{ gridTemplateColumns: grid_columns.grid }}>
                <div className={style.uniq}><h3>#</h3></div>

                {field_titles.map((item, i) => (
                    <div className={item.classe} key={i}>
                        <h3>
                            <button onClick={() => handleSort(item.optSort)}
                                className={sort.field === item.optSort ? style.focus : ""}
                            >
                                {item.title} <IconSort size={12} />
                            </button>
                        </h3>
                    </div>
                ))}
                <div className={style.uniq}><h3>---</h3></div>
                <div className={style.uniq}><h3>---</h3></div>
            </div>
        </>
    )
}

export default InfosTitle;