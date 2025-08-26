import React, { useEffect, useState } from "react";
import ListAllContainer from "./ListAllContainer";
import { useReadList } from "../../utilities/hooks/useReadList";
import { KEYS_LIST } from "../../utilities/util/theMasterKeys";

function ListAll() {

    const { data, loading, error } = useReadList(KEYS_LIST?.KEY_ALL_ITEMS);
    const [fetchStatus, setFetchStatus] = useState({ loading: loading, error: error });

    useEffect(() => {
        setFetchStatus({ loading: loading, error: error });
    }, [loading, error]);

    return <ListAllContainer fetchStatus={fetchStatus} fullData={data} />;
};

export default ListAll;