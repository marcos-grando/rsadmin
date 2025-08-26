import React, { useMemo, useState } from "react";
import GeralListRenderContent from "./GeralListRenderContent";

function GeralListModeToggle({ fetchStatus, TYPES_LABEL, slug, filteredData, searchText, setSearchText }) {

    const [viewMode, setViewMode] = useState("list"); // "add" ou "list"
    const [itemSelect, setItemSelect] = useState(null);

    const { theTitle, showBack } = useMemo(() => {
        if (viewMode === 'list')
            return { theTitle: TYPES_LABEL?.[slug]?.the_title, showBack: false };
        if (viewMode === 'add')
            return { theTitle: `Criando novo anúncio`, showBack: true }
        if (itemSelect)
            return { theTitle: `Dados de ${itemSelect.name}`, showBack: true }

        return { theTitle: TYPES_LABEL?.[slug]?.the_title, showBack: false };
    }, [viewMode, itemSelect, slug]);

    // action => "add" ou "back" ou "select";
    // eventos de "novo imóvel" + "voltar";
    // "select" retira o "list" qnd clica num item da lista;
    const handleAction = (action) => {
        if (action === "back") {
            setViewMode("list");
            setItemSelect(null);
            return
        }
        setViewMode(action);
    };

    return (
        <GeralListRenderContent
            fetchStatus={fetchStatus}
            TYPES_LABEL={TYPES_LABEL}
            slug={slug}
            itemSelect={itemSelect}
            setItemSelect={setItemSelect}
            handleAction={handleAction}
            viewMode={viewMode}
            theTitle={theTitle}
            showBack={showBack}
            filteredData={filteredData}
            searchText={searchText}
            setSearchText={setSearchText}
        />
    )
}

export default GeralListModeToggle;