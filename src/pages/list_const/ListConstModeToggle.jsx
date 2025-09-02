import React, { useMemo, useState } from "react";
import ListConstRenderContent from "./ListConstRenderContent";
import { VIEW_MODE, VIEW_TITLE } from "../../utilities/util/fieldTitleLists";

function ListConstModeToggle({ fetchStatus, optSelects, setOptSelects, searchConstData, searchFullData, handleDataSearch, dataSearch, setSearchText }) {

    const [viewMode, setViewMode] = useState(VIEW_MODE?.the_consts);

    const { theTitle, showHeader, showDelete, showBack, isEditConst } = useMemo(() => {
        const item = VIEW_TITLE[viewMode] || {};
        return {
            ...item,
            theTitle: (() => {
                switch (viewMode) {
                    case VIEW_MODE?.select_const:
                        return `Detalhes: Construtora ${optSelects?.opt_const?.name}`;
                    case VIEW_MODE?.the_resids:
                        return `Construtora ${optSelects?.opt_const?.name}`;
                    case VIEW_MODE?.select_resid:
                        return `Residencial ${optSelects?.opt_resid?.name}`;
                    default:
                        return item.theTitle;
                };
            })(),
            isEditConst: viewMode === VIEW_MODE?.the_resids
        };
    }, [viewMode, optSelects.opt_const, optSelects.opt_resid]);

    const handleAction = (action) => {
        if (action === "back") {
            if (viewMode === VIEW_MODE?.select_resid || viewMode === VIEW_MODE?.add_resid) {
                setOptSelects(prev => ({ ...prev, opt_resid: null }))
                setViewMode(VIEW_MODE?.the_resids);
                return;
            }
            if (viewMode === VIEW_MODE?.select_const || viewMode === VIEW_MODE?.add_const || viewMode === VIEW_MODE?.the_resids) {
                setOptSelects(prev => ({ ...prev, opt_const: null }))
                setSearchText(prev => ({ ...prev, resid: "" }));
                setViewMode(VIEW_MODE?.the_consts);
                return;
            }
        }
        else return setViewMode(action);
    };

    return (
        <ListConstRenderContent
            fetchStatus={fetchStatus}                   // status de error/loading
            optSelects={optSelects}
            setOptSelects={setOptSelects}
            viewMode={viewMode}                         // State com null/addConst/addResid
            handleAction={handleAction}                 // Atualiza State viewMode
            headerConfig={{ theTitle, showBack, showDelete, showHeader, isEditConst }}
            dataSearch={dataSearch}                     // valor real digitado no input
            handleDataSearch={handleDataSearch}         // utiliza o value do input para atualizar a lista correta (const : resid)
            searchConstData={searchConstData}           // lista de construtora filtrada pelo input
            searchFullData={searchFullData}             // sublista de imóveis filtrada pelo input
        />
    )
}

export default ListConstModeToggle;