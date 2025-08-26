import React, { useMemo } from "react";
import ListContainer from "../../components/content_page/list_container/ListContainer";
import FetchStatusList from "../../components/loadings/FetchStatusList";
import { TYPE_IMOVEIS } from "../../utilities/util/fieldTitleLists";

function GeralListTheList({ fetchStatus, TYPES_LABEL, slug, itemSelect, setItemSelect, filteredData, handleAction }) {

    const handleClick = (constt) => {
        setItemSelect(constt);
        handleAction('select')
    };

    const isPageType = slug;
    const the_status = useMemo(() => {

        if (fetchStatus.loading)
            return { isLoading: true, theTitle: "Carregando...", theMsg: "Aguarde enquanto os dados são carregados.", typePage: isPageType };
        if (fetchStatus.error)
            return { isLoading: false, theTitle: "Ops, ocorreu um erro!", theMsg: `Erro: ${fetchStatus.error.message}`, typePage: isPageType };
        if (filteredData.length === 0)
            return { isLoading: false, theTitle: "Nenhum anúncio encontrado!", theMsg: `${TYPES_LABEL?.[slug]?.the_zero} ou refaça a busca.`, typePage: isPageType };
        return null;

    }, [fetchStatus.loading, fetchStatus.error, fetchStatus.error?.message, itemSelect, filteredData.length]);

    if (the_status) return <FetchStatusList {...the_status} />;

    return (
        <ListContainer
            originalList={filteredData}
            theOptSelect={handleClick}
            totalColumns={TYPE_IMOVEIS.totalColumns}
            fieldTitles={TYPE_IMOVEIS?.[slug]?.fieldTitles}
            gridColumns={TYPE_IMOVEIS.gridColumns}
        />
    );
}

export default GeralListTheList;