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
                {field_titles.map((item, i) => (
                    <div className={`${item?.uniq ? style.uniq : item.classe}`} key={i}>
                        {item?.uniq ? (
                            <h3>{item.title}</h3>
                        ) : (
                            <button onClick={() => handleSort(item.optSort)}
                                className={sort.field === item.optSort ? style.focus : ""}
                            >
                                <h3>{item.title} <IconSort size={12} /></h3>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default InfosTitle;
