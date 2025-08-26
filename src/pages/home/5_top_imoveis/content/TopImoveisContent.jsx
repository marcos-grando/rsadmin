import React from "react";
import TopImoveisContentGraphic from "./TopImoveisContentGraphic";

function TopImoveisContent({ data, style }) {

    const maxValue = Math.max(...data.map(item => item?.value));
    
    const textTruncate = (text, max = 8) => {
        if (!text) return "";
        return text.length > max ? text.slice(0, max) + "..." : text;
    }

    return (
        <div className={style.graphWrapper}>
            <div className={style.yLabels}>
                {data.map((each, i) => (
                    <div key={i} className={style.yLabel}>
                        <p>{textTruncate(each.title)}</p>
                    </div>
                ))}
            </div>
            <div className={style.xLabels}>
                {[0, 25, 50, 75, 100].map((each, i) => (
                    <div key={i} className={style.xLabel}>{each}%</div>
                ))}
            </div>
            <TopImoveisContentGraphic data={data} maxValue={maxValue} style={style} />
        </div>
    )
}

export default TopImoveisContent;