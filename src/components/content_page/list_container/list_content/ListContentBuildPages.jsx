import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ListContentDetails from "./ListContentDetails";

function ListContentBuildPages({ grid_columns, field_titles, contentSorted, sort, setSort, theOptSelect, onDeleteClick, style }) {

    const theListRef = useRef(null);
    const itemRef = useRef(null);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [page, setPage] = useState(1);

    const measureItems = () => {
        if (theListRef.current && itemRef.current) {
            const theListHeight = theListRef.current.getBoundingClientRect().height;
            const itemHeight = itemRef.current.getBoundingClientRect().height;

            const possible = Math.floor(theListHeight / itemHeight);
            setItemsPerPage(possible > 0 ? possible : 1);
            // Reseta página se estourar
            setPage(prev => Math.min(prev, Math.ceil(contentSorted.length / (possible || 1))));
        }
    };

    // Medições iniciais e quando itens mudam
    useLayoutEffect(() => {
        measureItems();
    }, [contentSorted]);

    // Atualiza ao redimensionar a janela
    useEffect(() => {
        window.addEventListener('resize', measureItems);
        return () => window.removeEventListener('resize', measureItems);
    }, []);

    // const totalPages = itemsPerPage > 0 ? Math.ceil(contentSorted.length / itemsPerPage) : 1;
    const totalPages = Math.max(1, Math.ceil(contentSorted.length / itemsPerPage));
    useEffect(() => { setPage(prev => Math.min(prev, totalPages)); }, [totalPages]);

    const start = (page - 1) * itemsPerPage;
    const currentItems = contentSorted.slice(start, start + itemsPerPage);

    return (
        <>
            <div className={style.contentScroll}>
                {/* <ul ref={theListRef} className={style.contentList}>
                    
                </ul> */}
                <ListContentDetails
                    grid_columns={grid_columns}
                    field_titles={field_titles}
                    currentItems={currentItems}
                    theListRef={theListRef}
                    itemRef={itemRef}
                    start={start}
                    sort={sort}
                    setSort={setSort}
                    theOptSelect={theOptSelect}
                    onDeleteClick={onDeleteClick}
                    styleContent={style.contentList}
                />

                <div className={style.pagination}>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span>{page} / {totalPages}</span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default ListContentBuildPages;