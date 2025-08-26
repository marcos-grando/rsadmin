import React from "react";
import style from "./MediaForLocal.module.scss";
import MediaForLocalContent from "./content/MediaForLocalContent";

function MediaForLocal({ data }) {

    return (
        <div className={style.container}>
            <div className={style.theTitle}>
                <h2>Média de Valores por Localização</h2>
                <p>Média total de valores e mín/máx de cada região</p>
            </div>
            <div className={style.content}>
                <MediaForLocalContent data={data} style={style} />
            </div>
        </div>
    )
}

export default MediaForLocal;