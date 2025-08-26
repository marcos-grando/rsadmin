import React, { useEffect } from "react";
import { useMessage } from "../../../../utilities/contexts/ContextMessage";

function NewResidMsgFinale({ sucess, nameFormData, error }) {

    if (sucess === null) { return null }

    const { showMessage } = useMessage();

    const typeMessage = (the_sucess, nameFormData) => {
        if (the_sucess === true) {
            return <>
                <h2>Cadastro Concluído!</h2>
                <p>Residencial {nameFormData} cadastrado com sucesso.</p>
            </>
        }

        if (the_sucess === false) {
            return <>
                <h2>Ops, ocorreu um erro...</h2>
                <p>Erro: "{error}"</p>
                <p>Por favor, relate o problema à administração!</p>
            </>
        }
    };

    useEffect(() => {
        if (sucess !== null) {
            showMessage(sucess ? "sucess" : "error", typeMessage(sucess, nameFormData));
        }
    }, [sucess])

    return null;
}

export default NewResidMsgFinale;