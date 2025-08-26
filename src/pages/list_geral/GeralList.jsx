import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadTypeList } from "../../utilities/hooks/useReadTypeList";
import { KEYS_LIST } from "../../utilities/util/theMasterKeys";
import GeralListDataSearch from "./GeralListDataSearch";

const tipoUrlMap = { casas: 2, terrenos: 3, fazendas: 4 };

function GeralList() {

    const { slug } = useParams();
    const type_id_now = useMemo(() => { return slug ? tipoUrlMap[slug] : null; }, [slug]);

    const { data, loading, error } = useReadTypeList(type_id_now, KEYS_LIST?.KEY_GERAL);

    const [typeData, setTypeData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState({ loading: loading, error: error });

    useEffect(() => {
        if (!data) return;

        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        if (!list || list.length === 0) return;

        try {
            setTypeData(data);
        } catch (err) {
            console.error("Erro GeralList.jsx: ", err);
        };
    }, [data, type_id_now]);

    useEffect(() => {
        if (error) { setFetchStatus(prev => ({ ...prev, error: error })); };
    }, [error]);

    useEffect(() => {
        setFetchStatus(prev => ({ ...prev, loading: loading }));
    }, [loading])
    

    return (
        <GeralListDataSearch
            slug={slug}
            typeData={typeData}
            fetchStatus={fetchStatus}
        />
    )
}

export default GeralList;