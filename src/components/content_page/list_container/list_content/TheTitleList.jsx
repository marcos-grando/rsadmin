import React from "react";

function TheTitleList({ titleList, style }) {

    return (
        <div className={style.titleList}>
            <h3>{titleList}</h3>
        </div>
    )
}

export default TheTitleList;