import React from "react";
import MediaForLocalContentGraphic from "./MediaForLocalContentGraphic";

function MediaForLocalContent({ data, style }) {

    const maxValue = Math.max(...data.map(item => item.max)) + 50;

    // retorna o xLabel com "..." caso > 8 caracteres;
    const textTruncate = (text, max = 8) => {
        if (!text) return "";
        return text.length > max ? text.slice(0, max) + "..." : text;
    };

    return (
        <div className={style.graphWrapper}>

            <div className={style.yLabels}>
                {[0, 25, 50, 75, 100].reverse().map((value, i) => (
                    <div key={i} className={style.yLabel}>
                        {((value * maxValue) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                ))}
            </div>
            <div className={style.xLabels}>
                {data.map((value, i) => (
                    <div key={i} className={style.xLabel}>
                        <p title={value.localName}>{textTruncate(value.localName)}</p>
                    </div>
                ))}
            </div>
            <MediaForLocalContentGraphic data={data} maxValue={maxValue} style={style} />

        </div>
    )
}

export default MediaForLocalContent;