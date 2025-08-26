import React from "react";
import style from "./TopImoveis.module.scss";
import TopImoveisContent from "./content/TopImoveisContent";

function TopImoveis({ data }) {


    return (
        <div className={style.container}>
            <div className={style.theTitle}>
                <h2>Top 10 Imóveis Valorizados</h2>
                <p>Raking dos 10 imóveis mais valorizados</p>
            </div>
            <div className={style.content}>
                <TopImoveisContent data={data} style={style} />
            </div>
        </div>
    )
}

export default TopImoveis;