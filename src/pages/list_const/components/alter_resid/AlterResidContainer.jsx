import React, { useEffect, useState } from "react";
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

    // useEffect(() => {
    //     const fd = new FormData();
    //     buildFormData(fd, formData);

    //     setTimeout(() => {
    //         const allowed = ['aptoimg', 'condimg', 'plantimg', 'logo', 'thumb'];
    //         console.log("=================================================================================================================================")
    //         for (const [k, v] of fd.entries()) {
    //             const isAllowed = allowed.some(a => k.startsWith(a + '['));
    //             const isIgnored = k.endsWith('[title]') || k.endsWith('[desc]');
    //             if (isAllowed && !isIgnored) console.log(k, v);
    //         }
    //         console.log("=================================================================================================================================")

    //         console.log("formData: ", formData);
    //     }, 1200);

    // }, [formData]);

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