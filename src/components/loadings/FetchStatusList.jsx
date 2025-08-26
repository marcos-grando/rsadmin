import React from "react";
import style from "./FetchStatusList.module.scss";
import { Building2 as AllTypes, House, Building as Empreend, InspectionPanel as Terreno, TentTree as Fazenda } from "lucide-react";

const ICONS = {
    alltypes: <AllTypes size={80} />,
    residenciais: <Empreend size={80} strokeWidth={1} />,
    casas: <House size={80} />,
    terrenos: <Terreno size={80} />,
    fazendas: <Fazenda size={80} />
};

function FetchStatusList({ theTitle, theMsg, typePage, isLoading }) {

    if (isLoading) {
        return (
            <section className={style.containerLoading}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div className={style.eachItem} key={i}>
                        <div className={style.shadow}></div>
                        <div className={style.shadow}></div>
                        <div className={style.shadow}></div>
                        <div className={style.shadow}></div>
                    </div>
                ))}
            </section>
        )
    }

    return (
        <section className={style.containerGeneral}>
            <h2>{theTitle}</h2>
            {ICONS[typePage]}
            <p>{theMsg}</p>
        </section>
    )
}

export default FetchStatusList