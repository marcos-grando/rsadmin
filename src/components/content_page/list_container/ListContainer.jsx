import React, { useMemo } from "react";
import style from "./ListContainer.module.scss";
import TheTitleList from "./list_content/TheTitleList";
import ListContentArraySorted from "./list_content/ListContentArraySorted";

function ListContainer({ originalList, titleList, theOptSelect, totalColumns, gridColumns, fieldTitles }) {

    const grid_columns = {
        total: totalColumns,
        grid: gridColumns
        // totalColumns === 6 ? (
        //     "minmax(40px, 60px) 110px minmax(180px, 2fr) minmax(160px, 1fr) minmax(150px, 1fr) 70px"
        // ) : (
        //     "minmax(40px, 60px) minmax(180px, 2fr) minmax(160px, 1fr) minmax(150px, 1fr) 70px"
        // )
    }

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