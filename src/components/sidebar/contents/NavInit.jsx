import React from "react";
import { AppWindow } from "lucide-react";
import style from "../styles/NavsStyle.module.scss";
import Linkto from "../../../utilities/util/Linkto";
import LiOpt from "./LiOpt";

function NavInit({ setShowAside, liActive, setLiActive, isMob }) {
    // opt, icon, into, setShowAside, isMob, liActive, setLiActive
    const info = { opt: "Dashboard", icon: <AppWindow />, into: Linkto({ type: "home" }) };

    return (
        <nav className={style.init}>
            <ul>
                <LiOpt
                    opt={info.opt} icon={info.icon} into={info.into}
                    setShowAside={setShowAside}
                    liActive={liActive} setLiActive={setLiActive}
                    isMob={isMob}
                />
            </ul>
        </nav>
    )
}

export default NavInit;