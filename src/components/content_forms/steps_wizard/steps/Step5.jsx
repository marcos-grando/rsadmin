import React, { useEffect, useState } from "react";
import style from "./style/Steps4e5e6.module.scss";
import { validateStep } from "../../components/utility/validateStep";
import FileAndTags from "../../components/FileAndTags";

function Step5({ THE_STEP, setStatus, formData, setFormData, alterProps }) {

    // tag escrita no input
    const [currentInfos, setCurrentInfos] = useState('');
    useEffect(() => {
        const stepStatus = validateStep(formData, THE_STEP);
        setStatus(prev => ({ ...prev, 5: stepStatus }));
    }, [formData]);

    return <FileAndTags
        formData={formData}
        setFormData={setFormData}
        currentInfos={currentInfos}
        setCurrentInfos={setCurrentInfos}
        THE_STAP={THE_STEP}
        styles={style}
        alterProps={alterProps}
    />
}

export default Step5;