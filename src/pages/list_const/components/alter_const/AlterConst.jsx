import React, { useEffect, useState } from "react";
import { getValueByPath, setValueByPath } from "../../../../utilities/util/processValueByPath";
import { useReadConst } from "../../../../utilities/hooks/crud_const/useReadConst";
import { FORM_CONST_FORMDATA } from "../../../../utilities/util/fieldTitleForms";
import { KEYS_LIST } from "../../../../utilities/util/theMasterKeys";
import AlterConstContainer from "./AlterConstContainer";

function AlterConst({ idConstSelect, handleViewMode }) {

    const { data: data_read, error: error_read, loading: loading_read } = useReadConst(idConstSelect, KEYS_LIST?.KEY_SELECT_CONST);

    const [formData, setFormData] = useState(() => structuredClone(FORM_CONST_FORMDATA));
    const [startData, setStartData] = useState(() => structuredClone(FORM_CONST_FORMDATA));

    useEffect(() => {
        if (!idConstSelect || !data_read || loading_read) return;
        setStartData(prev => Object.fromEntries(
            Object.entries(prev).map(([k, v]) => [k, data_read[k] ?? v])
        ));
        setFormData(prev => Object.fromEntries(
            Object.entries(prev).map(([k, v]) => [k, data_read[k] ?? v])
        ));
    }, [idConstSelect, data_read, loading_read]);

    if (!idConstSelect) return null; // colocar message (context) aqui!
    if (error_read) return <p>Error: {error_read}</p>;

    const resetForms = () => {
        setStartData(structuredClone(FORM_CONST_FORMDATA));
        setFormData(structuredClone(FORM_CONST_FORMDATA));
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


    return <AlterConstContainer
        formData={formData}
        setFormData={setFormData}
        resetForms={resetForms}
        handleResetInfo={handleResetInfo}
        isResetInput={isResetInput}
        idConstSelect={idConstSelect}
        handleViewMode={handleViewMode}
    />
};

export default AlterConst;