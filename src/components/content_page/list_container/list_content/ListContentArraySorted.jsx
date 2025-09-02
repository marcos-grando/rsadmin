import React, { useEffect, useState } from "react";
import ListContentBuildPages from "./ListContentBuildPages";

function ListContentArraySorted({ originalList, grid_columns, field_titles, theOptSelect, style }) {
    
    const [contentSorted, setContentSorted] = useState([]);
    const [sort, setSort] = useState({ field: "name", order: "asc" });

    useEffect(() => {
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base",
        });

        const sorted = [...originalList].sort((a, b) => {
            const aStr = String(a[sort.field] ?? "");
            const bStr = String(b[sort.field] ?? "");

            // collator.compare já faz numeric-aware e case-insensitive
            const result = collator.compare(aStr, bStr);
            return sort.order === "asc" ? result : -result;
        });

        setContentSorted(sorted);
    }, [originalList, sort.field, sort.order]);

    return (
        <>
            <ListContentBuildPages
                contentSorted={contentSorted}
                grid_columns={grid_columns}
                field_titles={field_titles}
                sort={sort} setSort={setSort}
                theOptSelect={theOptSelect}
                style={style}
            />
        </>
    )
}

export default ListContentArraySorted;