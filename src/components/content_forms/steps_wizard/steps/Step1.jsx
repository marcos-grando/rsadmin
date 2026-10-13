import React from "react";
import style from "./style/Steps1.module.scss";
import { simulatorOptions } from "../../../../data/simulatorOptions";
import TypesInputs from "../../components/TypesInputs";
import TheTitleLabel from "../../components/TheTitleLabel";

function Step1({ THE_STEP, formData, setFormData, alterProps }) {

const { opts_types, opts_construtoras } = simulatorOptions;

    return (
        <div className={`step ${style?.step1}`}>
            {THE_STEP.map((each, i) => {
                const pathKey = each.the_path?.[0];
                const dynamicOpts =
                    (pathKey === 'construtora_id' && opts_construtoras) ||
                    (pathKey === 'type_id' && opts_types) || each?.the_opts;

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

export default Step1;
