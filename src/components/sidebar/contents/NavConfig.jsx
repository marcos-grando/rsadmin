import React from "react";
import { Settings } from "lucide-react";
import style from "../styles/NavsStyle.module.scss";
import Linkto from "../../../utilities/util/Linkto";
import LiOpt from "./LiOpt";

function NavConfig({ setShowAside, liActive, setLiActive, isMob }) {

    const info = { opt: "Configurações", icon: <Settings />, into: Linkto({ type: "config" }) };

    return (
        <nav className={style.config}>
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

export default NavConfig;