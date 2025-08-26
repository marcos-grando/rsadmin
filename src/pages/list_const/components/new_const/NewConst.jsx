import React, { useState } from "react";
import style from "./style/NewConst.module.scss";
import { useCreateConst } from "../../../../utilities/hooks/crud_const/useCreateConst";
import { FORM_CONST_FORMDATA, FORM_SUBMIT } from "../../../../utilities/util/fieldTitleForms";
import { buildFormData } from "../../../../utilities/util/buildFormData";
import FormStepUnique from "../../../../components/content_forms/step_unique/FormStepUnique";
import NewConstMsgFinale from "./NewConstMsgFinale";
import LoadingCircle from "../../../../components/loadings/LoadingCircle";

function NewConst({ handleViewMode }) {

    const { createConst, loading, error } = useCreateConst();
    const [sucess, setSucess] = useState(null);
    const [formData, setFormData] = useState(() => structuredClone(FORM_CONST_FORMDATA));

    const [nameForMsg, setNameForMsg] = useState("");

    const resetFormData = () => setFormData(FORM_CONST_FORMDATA);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        buildFormData(fd, formData);

        try {
            setNameForMsg(formData?.name);

            await createConst(fd);
            setSucess(true);

            setTimeout(() => {
                resetFormData();
                handleViewMode("back");
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
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    the_type_submit={FORM_SUBMIT?.new_const}
                    loading={loading}
                />
            </div>
            <NewConstMsgFinale
                sucess={sucess}
                nameFormData={nameForMsg}
                error={error}
            />
            {(loading || sucess === true) && <LoadingCircle />}
        </div>
    )
}

export default NewConst;