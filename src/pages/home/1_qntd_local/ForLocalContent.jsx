import React from "react";

function ForTypesContent({ payload, style }) {

    if (!payload) return null;

    return (
        <div className={style.legend}>
            {payload.map((entry, index) => {
                const { title, total } = entry.payload;
                return (
                    <div key={index} style={{ whiteSpace: "nowrap", width: "max-content", display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: entry.color,
                                borderRadius: "50%",
                            }}
                        />
                        <span>{title}: {total}</span>
                    </div>
                );
            })}
        </div>
    )
}

export default ForTypesContent;