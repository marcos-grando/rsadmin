import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavMain from "./contents/NavMain";
import NavInit from "./contents/NavInit";
import NavConfig from "./contents/NavConfig";

function SidebarContent({ setShowAside, style, isMob }) {

    const location = useLocation();
    const [liActive, setLiActive] = useState(location.pathname);

    useEffect(() => {
        setLiActive(location.pathname);
    }, [location])

    return (
        <>
            <NavInit setShowAside={setShowAside} liActive={liActive} setLiActive={setLiActive} isMob={isMob} />
            <NavMain setShowAside={setShowAside} liActive={liActive} setLiActive={setLiActive} isMob={isMob} />
            <NavConfig setShowAside={setShowAside} liActive={liActive} setLiActive={setLiActive} isMob={isMob} />
        </>
    )
}

export default SidebarContent;