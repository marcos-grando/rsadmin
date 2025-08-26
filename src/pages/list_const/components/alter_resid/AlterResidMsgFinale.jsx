import React, { useEffect } from "react";
import { useMessage } from "../../../../utilities/contexts/ContextMessage";

function AlterResidMsgFinale({ sucess, nameFormData, error }) {

    if (sucess === null) { return null };

    const { showMessage } = useMessage();

    const typeMessage = (the_sucess, nameFormData) => {
        if (the_sucess === true) {
            return <>
                <h2>Alterações salvas!</h2>
                <p>Residencial {nameFormData} alterada com sucesso.</p>
            </>
        }

        if (the_sucess === false) {
            return <>
                <h2>Ops, ocorreu um error...</h2>
                <p>Erro: "{error}"</p>
                <p>Por favor, relate o problema à administração!</p>
            </>
        }
    };

    useEffect(() => {
        if (sucess !== null) {
            showMessage(sucess ? "sucess" : "error", typeMessage(sucess, nameFormData));
        }
    }, [sucess]);

    return null;
};

export default AlterResidMsgFinale;