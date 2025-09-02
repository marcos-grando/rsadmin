import React from "react";
import InfosTitle from "../item_titles/InfosTitle";
import InfosItem from "../item_infos/InfosItem";

function ListContentDetails({ grid_columns, field_titles, currentItems, theListRef, itemRef, start, sort, setSort, theOptSelect, styleContent }) {

    return (
        <>
            <InfosTitle
                grid_columns={grid_columns}
                field_titles={field_titles}
                sort={sort} setSort={setSort}
            />
            <ul ref={theListRef} className={styleContent}>
                {currentItems.map((eachItem, i) => (
                    <InfosItem key={start + i}
                        eachItem={eachItem}
                        grid_columns={grid_columns}
                        iCont={i + 1}
                        itemRef={i === 0 ? itemRef : null}
                        theOptSelect={theOptSelect}
                    />
                ))}
            </ul>
        </>
    )
}

export default ListContentDetails;