import React, { useEffect, useState } from "react";
import ListConstDataSearch from "./ListConstDataSearch";
import { useReadList } from "../../utilities/hooks/useReadList";
import { KEYS_LIST } from "../../utilities/util/theMasterKeys";

function ListConst() {

    const { data, loading, error } = useReadList(KEYS_LIST?.KEY_ALL_CONST);
    const [fetchStatus, setFetchStatus] = useState({ loading: loading, error: error });

    useEffect(() => {
        setFetchStatus({ loading: loading, error: error });
    }, [loading, error]);

    return <ListConstDataSearch fetchStatus={fetchStatus} constsData={data} />
};

export default ListConst;