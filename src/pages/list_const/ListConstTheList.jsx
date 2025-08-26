import React, { useMemo } from "react";
import { CONST_CONSTRUTORAS, CONST_RESIDENCIAIS, VIEW_MODE } from "../../utilities/util/fieldTitleLists";
import { useDeleteConst } from "../../utilities/hooks/crud_const/useDeleteConst";
import { useDeleteResid } from "../../utilities/hooks/crud_resid/useDeleteResid";
import ListContainer from "../../components/content_page/list_container/ListContainer";
import FetchStatusList from "../../components/loadings/FetchStatusList";

function ListConstTheList({ fetchStatus, optSelects, setOptSelects, handleAction, searchConstData, searchFullData }) {

    const { deleteConst } = useDeleteConst();
    const { deleteResid } = useDeleteResid();

    const handleClick = (constt) => {
        setOptSelects(prev => ({ ...prev, opt_const: constt }));
        handleAction(VIEW_MODE?.the_resids);
    };
    const handleClickResid = (residd) => {
        setOptSelects(prev => ({ ...prev, opt_resid: residd }));
        handleAction(VIEW_MODE?.select_resid);
    };

    const isPageType = "residenciais";
    const the_status = useMemo(() => {
        if (!optSelects.opt_const) {
            if (fetchStatus.loading)
                return { isLoading: true, theTitle: "Carregando...", theMsg: "Aguarde enquanto os dados são carregados.", typePage: isPageType };
            if (fetchStatus.error)
                return { isLoading: false, theTitle: "Ops, ocorreu um erro!", theMsg: `Erro: ${fetchStatus.error.message}`, typePage: isPageType };
            if (!searchConstData || searchConstData.length === 0)
                return { isLoading: false, theTitle: "Construtora não encontrada!", theMsg: "Refaça a busca ou insira novas construtoras.", typePage: isPageType };
        };
        if (optSelects.opt_const && (!searchFullData || searchFullData.length === 0))
            return { isLoading: false, theTitle: "Imóvel não encontrado!", theMsg: "Refaça a busca ou insira novos imóveis.", typePage: isPageType };

        return null;
    }, [fetchStatus.loading, fetchStatus.error, fetchStatus.error?.message, optSelects.opt_const, searchConstData, searchFullData]);

    if (the_status) return <FetchStatusList {...the_status} />;

    return (
        <>
            {!optSelects.opt_const ? (
                <ListContainer
                    originalList={searchConstData}
                    theOptSelect={handleClick}
                    onDeleteClick={deleteConst}
                    totalColumns={CONST_CONSTRUTORAS.totalColumns}
                    fieldTitles={CONST_CONSTRUTORAS.fieldTitles}
                    gridColumns={CONST_CONSTRUTORAS.gridColumns}
                />
            ) : (
                <ListContainer
                    originalList={searchFullData}
                    theOptSelect={handleClickResid}
                    onDeleteClick={deleteResid}
                    totalColumns={CONST_RESIDENCIAIS.totalColumns}
                    fieldTitles={CONST_RESIDENCIAIS.fieldTitles}
                    gridColumns={CONST_RESIDENCIAIS.gridColumns}
                />
            )}
        </>
    );
};

export default ListConstTheList;