import React, { useEffect, useState } from "react";
import { Building2 as AllTypes, House, Building as Empreend, InspectionPanel as Terreno, TentTree as Fazenda } from "lucide-react";
import style from "../styles/NavsStyle.module.scss";
import Linkto from "../../../utilities/util/Linkto";
import LiOpt from "./LiOpt";

function NavMain({ setShowAside, liActive, setLiActive, isMob }) {

    const infos = [
        { opt: "Todos Imóveis",   icon: <AllTypes />,   into: Linkto({ type: "alltypes" }) },
        { opt: "Residenciais",    icon: <Empreend />,   into: Linkto({ type: "residenciais" }) },
        { opt: "Casas",           icon: <House />,      into: Linkto({ type: "casas" }) },
        { opt: "Terrenos",        icon: <Terreno />,    into: Linkto({ type: "terrenos" }) },
        { opt: "Fazendas",        icon: <Fazenda />,    into: Linkto({ type: "fazendas" }) },
    ]

    return (
        <nav className={style.navMain}>
            <ul>
                {infos.map((info, i) => (
                    <LiOpt
                        key={i}
                        opt={info.opt} icon={info.icon} into={info.into}
                        setShowAside={setShowAside}
                        liActive={liActive} setLiActive={setLiActive}
                        isMob={isMob}
                    />
                ))}
            </ul>
        </nav>
    )
}

export default NavMain;