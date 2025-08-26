import React from "react";

function MediaForConstContentGraphic({ data, maxValue, style }) {

    // retorna o valor percentual de "total" comparado ao maxValue ("total" mais alto + 50);
    const lawOfThree = (total, valueMax) => {
        return (total * 100) / valueMax;
    };
    const brlFormat = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    return (

        <div className={style.contentGraphic}>
            <div className={style.grid}>
                <div className={style.horizontalLines}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={style.line}></div>
                    ))}
                </div>
                <div className={style.verticalLines}>
                    {Array.from({ length: data.length }).map((_, i) => (
                        <div key={i} className={style.line}></div>
                    ))}
                </div>
            </div>
            {data.map((each, i) => (
                <div key={i} className={style.column}>
                    <div
                        title={`Menor valor: ${brlFormat(each.min)}\n${each.minType} ${each.minName}`}
                        className={style.columnMin}
                        style={{ height: `${lawOfThree(each.min, maxValue)}%` }}>
                    </div>
                    
                    <div
                        title={`Média total: ${brlFormat(each.media)}`}
                        className={style.columnContent}
                        style={{ height: `${lawOfThree(each.media, maxValue)}%` }}>
                    </div>

                    <div
                        title={`Maior valor: ${brlFormat(each.max)}\n${each.maxType} ${each.maxName}`}
                        className={style.columnMax}
                        style={{ height: `${lawOfThree(each.max, maxValue)}%` }}>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MediaForConstContentGraphic;