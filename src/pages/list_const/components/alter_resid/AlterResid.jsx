import React, { useEffect, useState } from "react";
import { useReadResid } from "../../../../utilities/hooks/crud_resid/useReadResid";
import { KEYS_LIST } from "../../../../utilities/util/theMasterKeys";
import { FORM_RESID_FORMDATA } from "../../../../utilities/util/fieldTitleForms";
import { getValueByPath, setValueByPath } from "../../../../utilities/util/processValueByPath";
import AlterResidContainer from "./AlterResidContainer";

function AlterResid({ idResidSelect, handleViewMode }) {

    const { data: data_read, error: error_read, loading: loading_read } = useReadResid(idResidSelect, KEYS_LIST?.KEY_SELECT_RESID);

    const [formData, setFormData] = useState(() => structuredClone(FORM_RESID_FORMDATA));
    const [startData, setStartData] = useState(() => structuredClone(FORM_RESID_FORMDATA));

    useEffect(() => {
        if (!data_read || loading_read) return;
        setStartData(prev => Object.fromEntries(
            Object.entries(prev).map(([k, v]) => [k, data_read[k] ?? v])
        ));
        setFormData(prev => Object.fromEntries(
            Object.entries(prev).map(([k, v]) => [k, data_read[k] ?? v])
        ));
    }, [idResidSelect, data_read, loading_read]);

    if (!idResidSelect) return null; // colocar message (context) aqui!
    if (error_read) return <p>Error: {error_read}</p>;

    const resetForms = () => {
        setStartData(structuredClone(FORM_RESID_FORMDATA));
        setFormData(structuredClone(FORM_RESID_FORMDATA));
    };

    const isResetInput = (path) => {
        const current = getValueByPath(formData, path);
        const original = getValueByPath(startData, path);

        return (typeof File !== "undefined" && (current instanceof File || current instanceof Blob)) || current !== original;
    };
    const handleResetInfo = (path) => {
        const current = getValueByPath(formData, path);
        const original = getValueByPath(startData, path);

        if (current === original) return;

        setFormData(prev => setValueByPath(prev, path, original));
    };


    return <AlterResidContainer
        formData={formData}
        setFormData={setFormData}
        resetForms={resetForms}
        handleResetInfo={handleResetInfo}
        isResetInput={isResetInput}
        idResidSelect={idResidSelect}
        handleViewMode={handleViewMode}
    />
};

export default AlterResid;