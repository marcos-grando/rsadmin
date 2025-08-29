import React, { useState } from "react";
import style from "./style/AlterConst.module.scss";
import { useUpdateConst } from "../../../../utilities/hooks/useCrudBase";
import { buildFormData } from "../../../../utilities/util/buildFormData";
import { FORM_SUBMIT } from "../../../../utilities/util/fieldTitleForms";
import FormStepUnique from "../../../../components/content_forms/step_unique/FormStepUnique";
import AlterConstMsgFinale from "./AlterConstMsgFinale";
import LoadingCircle from "../../../../components/loadings/LoadingCircle";

// const diffPayload = (next, prev = {}) =>
//     Object.fromEntries(Object.entries(next).filter(([k, v]) =>
//         (typeof File !== 'undefined' && (v instanceof File || v instanceof Blob)) || v !== prev[k]
//     ));

function AlterConstContainer({ formData, setFormData, resetForms, handleResetInfo, isResetInput, idConstSelect, handleViewMode }) {

    const { updateConst, loading, error } = useUpdateConst();
    const [sucess, setSucess] = useState(null);
    const [nameForMsg, setNameForMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Da forma como "extradb" (Resid) está hoje, é desnecessário fazer isso;
        // const changes = diffPayload(formData, startData);
        // if (Object.keys(changes).length === 0) return null;

        const fd = new FormData();
        buildFormData(fd, formData);

        try {
            setNameForMsg(formData?.name);

            await updateConst(idConstSelect, fd);
            setSucess(true);

            setTimeout(() => {
                resetForms();
                handleViewMode('back');
                setSucess(null);
            }, 100);
        } catch {
            setSucess(false);
        };
    };


    return (
        <div className={style.nowItem}>
            <div className={style.wrapper}>
                <FormStepUnique
                    formData={formData}
                    alterProps={{ handleResetInfo, isResetInput }}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    the_type_submit={FORM_SUBMIT?.alter_const}
                    loading={loading}
                />
            </div>
            <AlterConstMsgFinale
                sucess={sucess}
                nameFormData={nameForMsg}
                error={error}
            />
            {(loading || sucess === true) && <LoadingCircle />}
        </div>
    )
};

export default AlterConstContainer;