import React from "react";
import style from "./style/Steps7.module.scss";
import { simulatorOptions } from "../../../../data/simulatorOptions";
import TypesInputs from "../../components/TypesInputs";
import TheTitleLabel from "../../components/TheTitleLabel";
import CardExample from "./step7/CardExample";

function Step7({ THE_STEP, formData, setFormData, alterProps }) {

    const statusName = simulatorOptions.opts_status.find(option => option.id === formData.status_id)?.name ?? "";

    return (
        <div className={`step ${style?.step7}`}>
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
            <div className={style.example}>
                <h3>Exemplo de Thumbnail no anúncio</h3>
                <CardExample formData={formData} statusName={statusName} />
            </div>
        </div>
    )
}

export default Step7;
