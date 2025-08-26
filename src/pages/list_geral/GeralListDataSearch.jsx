import React, { useMemo, useState } from "react";
import GeralListModeToggle from "./GeralListModeToggle";

const TYPES_LABEL = {
    casas: { the_title: "Casas Registradas", button: "Add nova casa", the_zero: "Registre novas casas ", the_tipo: "casas" },
    terrenos: { the_title: "Terrenos Registrados", button: "Add novo terreno", the_zero: "Registre novos terrenos", the_tipo: "terrenos" },
    fazendas: { the_title: "Fazendas Registradas", button: "Add nova fazenda", the_zero: "Registre novas fazendas", the_tipo: "fazendas" }
};

function GeralListDataSearch({ fetchStatus, slug, typeData }) {

    const [searchText, setSearchText] = useState("");

    const filteredData = useMemo(() => {
        const needle = searchText.toLowerCase();
        const keys = ['name', 'local', 'valor'];

        return typeData.filter(item => keys.some(key => String(item[key] ?? '').toLowerCase().includes(needle)));
    }, [typeData, searchText, slug])

    return (
        <GeralListModeToggle
            fetchStatus={fetchStatus}
            TYPES_LABEL={TYPES_LABEL}
            slug={slug}
            filteredData={filteredData}
            searchText={searchText}
            setSearchText={setSearchText}
        />
    )
}

export default GeralListDataSearch;
