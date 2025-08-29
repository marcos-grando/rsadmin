import React, { useState } from "react";
import style from "./AlterResidContainer.module.scss";
import { useUpdateResid } from "../../../../utilities/hooks/useCrudBase";
import { buildFormData } from "../../../../utilities/util/buildFormData";
import { FORM_SUBMIT } from "../../../../utilities/util/fieldTitleForms";
import FormStepWizard from "../../../../components/content_forms/steps_wizard/FormStepWizard";
import AlterResidMsgFinale from "./AlterResidMsgFinale";
import LoadingCircle from "../../../../components/loadings/LoadingCircle";

function AlterResidContainer({ formData, setFormData, resetForms, handleResetInfo, isResetInput, idResidSelect, handleViewMode }) {

    const { updateResid, loading, error } = useUpdateResid();
    const [sucess, setSucess] = useState(null);
    const [nameForMsg, setNameForMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        buildFormData(fd, formData);

        try {
            setNameForMsg(formData?.name);

            await updateResid(idResidSelect, fd);
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
                <FormStepWizard
                    formData={formData}
                    alterProps={{ handleResetInfo, isResetInput }}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    the_type_submit={FORM_SUBMIT?.alter_resid}
                    loading={loading}
                />
            </div>
            <AlterResidMsgFinale
                sucess={sucess}
                nameFormData={nameForMsg}
                error={error}
            />
            {(loading || sucess === true) && <LoadingCircle />}
        </div>
    )
};

export default AlterResidContainer;