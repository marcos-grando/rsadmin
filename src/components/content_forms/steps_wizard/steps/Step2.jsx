import React, { useEffect } from "react";
import style from "./style/Steps2e3.module.scss";
import { validateStep } from "../../components/utility/validateStep";
import Step2Contaienr from "./Step2/Step2Container";
import TypesInputs from "../../components/TypesInputs";
import TheTitleLabel from "../../components/TheTitleLabel";

function Step2({ THE_STEP, setStatus, formData, setFormData, alterProps }) {

    useEffect(() => {
        const stepStatus = validateStep(formData, THE_STEP);
        setStatus(prev => ({ ...prev, 2: stepStatus }))
    }, [formData]);

    return (
        <div className={`step ${style?.step2}`}>
            {THE_STEP.map((each, i) => (
                <div key={i} className={style.theInput}>
                    <TheTitleLabel
                        the_label={each?.the_label}
                        isRequired={each.inputProps?.(formData)?.required}
                        the_path={each?.the_path}
                        alterProps={alterProps}
                    />
                    <label>
                        <TypesInputs
                            {...each}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </label>
                </div>
            ))}

            <Step2Contaienr formData={formData} setFormData={setFormData} style={style.theMap} />
        </div>
    );
}

export default Step2;
