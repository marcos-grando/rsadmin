import React, { useMemo } from "react";
import style from "./ListContainer.module.scss";
import TheTitleList from "./list_content/TheTitleList";
import ListContentArraySorted from "./list_content/ListContentArraySorted";

function ListContainer({ originalList, titleList, theOptSelect, totalColumns, gridColumns, fieldTitles }) {

    const grid_columns = {
        total: totalColumns,
        grid: gridColumns
    };

    const field_titles = useMemo(() => fieldTitles, [fieldTitles]);

    return (
        <section className={style.containerList}>
            {titleList &&
                <TheTitleList
                    titleList={titleList}
                    style={style}
                />
            }
            <ListContentArraySorted
                originalList={originalList}
                grid_columns={grid_columns}
                field_titles={field_titles}
                theOptSelect={theOptSelect}
                style={style}
            />
        </section>
    )
}

export default ListContainer;