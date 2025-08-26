import React from "react";
import { RotateCcwIcon } from "lucide-react";

function TheTitleLabel({ the_label, isRequired, the_path, alterProps = {} }) {

    const { handleResetInfo, isResetInput } = alterProps;
    let newData;
    if (isResetInput) { newData = isResetInput(the_path); };

    return (
        <>
            <h3 style={{ display: "flex", alignItems: "center" }}>
                {the_label}
                {isRequired ? <span style={{ color: "red" }}> *</span> : <span style={{ color: "orange" }}> *</span>}
                {typeof handleResetInfo === "function" && (
                    <button type="button"
                        onClick={() => handleResetInfo(the_path)}
                        disabled={!newData}
                        style={{ marginLeft: "10px", opacity: newData ? 1 : 0.25, cursor: newData ? "pointer" : "default" }}
                        title={newData ? "Retornar info padrão" : "Sem alterações para restaurar"}
                    >
                        <RotateCcwIcon size={16} />
                    </button>
                )}
            </h3>
        </>
    )
}

export default TheTitleLabel;