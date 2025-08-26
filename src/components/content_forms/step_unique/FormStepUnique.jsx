import React, { useEffect, useState } from "react";
import "../components/style/Steps.scss";
import style from "./FormStepUnique.module.scss";
import { FORM_STEP_UNIQUE } from "../../../utilities/util/fieldTitleForms";
import { validateStep } from "../components/utility/validateStep";
import TypesInputs from "../components/TypesInputs";
import TheTitleLabel from "../components/TheTitleLabel";

function FormStepUnique({ formData, alterProps, setFormData, handleSubmit, the_type_submit, loading }) {

    const [status, setStatus] = useState("ignore");

    useEffect(() => {
        const stepStatus = validateStep(formData, FORM_STEP_UNIQUE);
        setStatus(stepStatus);
    }, [formData]);

    const hasWarning = status === "ignore" || status === "cuidado";

    return (
        <section className={style.container}>
            <form className={style.content} onSubmit={handleSubmit} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); } }}>
                <div className={style.contentTitle}>
                    <h2>Registrando nova construtora</h2>
                </div>

                <div className={`step ${style?.stepUnique}`}>
                    {FORM_STEP_UNIQUE.map((each, i) => (
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
                </div>

                <div className={style.spaceNav}>
                    <button type="submit"
                        className={loading || hasWarning ? style.disabled : ''}
                        disabled={loading || hasWarning}
                    >
                        {loading ? the_type_submit?.loading : the_type_submit?.title}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default FormStepUnique;