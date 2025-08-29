import React, { useEffect, useState } from "react";
import style from "./style/NewResid.module.scss";
import { useCreateResid } from "../../../../utilities/hooks/useCrudBase";
import { FORM_RESID_FORMDATA, FORM_SUBMIT } from "../../../../utilities/util/fieldTitleForms";
import { buildFormData } from "../../../../utilities/util/buildFormData";
import FormStepWizard from "../../../../components/content_forms/steps_wizard/FormStepWizard";
import NewResidMsgFinale from "./NewResidMsgFinale";
import LoadingCircle from "../../../../components/loadings/LoadingCircle";

function NewResid({ handleViewMode, constId }) {

    const { createResid, loading, error } = useCreateResid();
    const [sucess, setSucess] = useState(null);
    const [formData, setFormData] = useState(() => structuredClone(FORM_RESID_FORMDATA));

    const [nameForMsg, setNameForMsg] = useState("");

    useEffect(() => {
        if (constId) setFormData(prev => ({ ...prev, construtora_id: constId }));
    }, [constId]);

    const resetFormData = () => setFormData(() => structuredClone(FORM_RESID_FORMDATA));

    // Chama o buildFormData e envia para o hook -> api;
    const handleSubmit = async e => {
        e.preventDefault();

        const updatedFormData = constId ? { ...formData, construtora_id: constId } : formData;
        const fd = new FormData();
        buildFormData(fd, updatedFormData);

        try {
            setNameForMsg(formData?.name);

            await createResid(fd);
            setSucess(true);
            resetFormData();

            setTimeout(() => {
                handleViewMode("back");
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
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    the_type_submit={FORM_SUBMIT?.new_resid}
                    loading={loading}
                />
            </div>

            <NewResidMsgFinale
                sucess={sucess}
                nameFormData={nameForMsg}
                error={error}
            />

            {(loading || sucess === true) && <LoadingCircle />}
        </div>
    );
};

export default NewResid;