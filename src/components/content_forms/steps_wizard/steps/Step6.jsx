import React, { useState } from "react";
import style from "./style/Steps4e5e6.module.scss";
import FileAndTags from "../../components/FileAndTags";

function Step6({ THE_STEP, formData, setFormData, alterProps }) {

    // tag escrita no input
    const [currentInfos, setCurrentInfos] = useState('');
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

export default Step6;
