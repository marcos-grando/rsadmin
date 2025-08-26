import React from "react";

function TopImoveisContentGraphic({ data, maxValue, style }) {

    const lawOfThree = (value, valueMax) => {
        return (value * 100) / valueMax;
    };
    const brlFormat = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    return (
        <div className={style.contentGraphic}>
            <div className={style.grid}>
                <div className={style.horizontalLines}>
                    {Array.from({ length: data.length }).map((_, i) => (
                        <div key={i} className={style.line}></div>
                    ))}
                </div>
                <div className={style.verticalLines}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={style.line}></div>
                    ))}
                </div>
            </div>
            {data.map((each, i) => (
                <div key={i} className={style.column}>
                    <div
                        title={`${each.title}: ${each.value}`}
                        className={style.columnContent}
                        style={{ width: `${lawOfThree(each.value, maxValue)}%` }}
                    >
                        {brlFormat(each.value)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopImoveisContentGraphic;