import React from "react";
import style from "./MediaForConst.module.scss";
import MediaForConstContent from "./content/MediaForConstContent";

function MediaForConst({ data }) {

    return (
        <div className={style.container}>
            <div className={style.theTitle}>
                <h2>Média de Valores por Construtora</h2>
                <p>Média total de valores e mín/máx de cada construtora</p>
            </div>
            <div className={style.content}>
                <MediaForConstContent data={data} style={style} />
            </div>
        </div>
    )
}

export default MediaForConst;