import React from "react";
import style from "./estilos/KpisContent.module.scss";

function KpisContent({ data }) {

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

    return (
        <>
            {data.map((item, i) => (
                <article key={i} className={style.eachKpi}>
                    <h2>{item?.title}</h2>
                    <h2 className={style.faketitle} style={{ backgroundColor: `${COLORS[i]}` }}></h2>
                    <h1>{item?.primary}</h1>
                    <h3>{item?.secondary}</h3>
                </article>
            ))}
        </>
    )
}

export default KpisContent;