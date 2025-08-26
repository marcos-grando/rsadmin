import React, { useEffect, useMemo, useState } from "react";
import ListConstModeToggle from "./ListConstModeToggle";

function ListConstDataSearch({ fetchStatus, constsData }) {

    const [searchText, setSearchText] = useState({ const: "", resid: "" });
    const [optSelects, setOptSelects] = useState({ opt_const: null, opt_resid: null })

    // filtro de construtora (Focado no primeiro )
    const safeData = constsData || []; // redudante com "data: []" no hook useSelectResource, mas mantive por aprendizado
    const searchConstData = useMemo(() => {
        const needle = searchText.const.toLowerCase();
        const keys = ['name'];

        return safeData.filter(item => keys.some(key => String(item[key] ?? '').toLowerCase().includes(needle)));
    }, [safeData, searchText.const]);

    // filtro nos imóveis (construtora.imoveis)
    const imoveisConstOpt = optSelects.opt_const ? optSelects.opt_const?.imoveis : [];
    const searchFullData = useMemo(() => {
        const needle = searchText.resid.toLowerCase();
        const keys = ['name', 'local', 'valor'];

        return imoveisConstOpt.filter(item => keys.some(key => String(item[key] ?? '').toLowerCase().includes(needle)));
    }, [imoveisConstOpt, searchText.resid]);

    const handleDataSearch = (inputValue) => { setSearchText(prev => ({ ...prev, [optSelects.opt_const ? 'resid' : 'const']: inputValue })); };
    const dataSearch = optSelects.opt_const ? searchText.resid : searchText.const;

    useEffect(() => {
        if (!optSelects?.opt_const) return;
        const updated = constsData.find(c => c.id === optSelects.opt_const.id);
        if (updated && updated !== optSelects.opt_const) {
            setOptSelects(prev => ({ ...prev, opt_const: updated }));
        }
    }, [constsData, optSelects?.opt_const?.id, setOptSelects]);

    return (
        <ListConstModeToggle
            fetchStatus={fetchStatus}
            optSelects={optSelects}
            setOptSelects={setOptSelects}
            searchConstData={searchConstData}
            searchFullData={searchFullData}
            handleDataSearch={handleDataSearch}
            dataSearch={dataSearch}
            setSearchText={setSearchText}
        />
    )
}

export default ListConstDataSearch;