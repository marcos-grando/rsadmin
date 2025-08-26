import React, { useEffect } from "react";
import style from "./style/Steps2e3.module.scss";
import { validateStep } from "../../components/utility/validateStep";
import { useListTablesMinor } from "../../../../utilities/hooks/useListTablesMinor";
import TypesInputs from "../../components/TypesInputs";
import TheTitleLabel from "../../components/TheTitleLabel";

function Step3({ THE_STEP, setStatus, formData, setFormData, alterProps }) {

    useEffect(() => {
        const stepStatus = validateStep(formData, THE_STEP);
        setStatus(prev => ({ ...prev, 3: stepStatus }))
    }, [formData]);

    const { opts_status } = useListTablesMinor();

    return (
        <div className={`step ${style?.step3}`}>
            {THE_STEP.map((each, i) => {
                const pathKey = each.the_path?.[0];
                const dynamicOpts = (pathKey === 'status_id' && opts_status) || each?.the_opts;

                const the_props = { ...each, the_opts: dynamicOpts };

                return (
                    <div key={i} className={style.theInput}>
                        <TheTitleLabel
                            the_label={each?.the_label}
                            isRequired={each.inputProps?.(formData)?.required}
                            the_path={each?.the_path}
                            alterProps={alterProps}
                        />
                        <label>
                            <TypesInputs
                                {...the_props}
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Step3;