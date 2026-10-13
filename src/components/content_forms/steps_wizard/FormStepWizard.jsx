import { useState } from "react";
import "../components/style/Steps.scss";
import style from "./FormStepWizard.module.scss";
import { BadgeX, Verified, BadgeAlert, Badge } from "lucide-react";
import { FORM_FIELD_STEPS } from "../../../utilities/util/fieldTitleForms";
import { stepErrors } from "../../../utilities/util/simulatorModel";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";
import { STEPS_WIZARD_RESID } from "./inputConfig";
import { validateStep } from "../components/utility/validateStep";

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
const statusDisplay = {
    ignore: { className: style.ignoreStatus, Icon: Badge },
    obs: { className: style.obsStatus, Icon: BadgeAlert },
    cuidado: { className: style.warningStatus, Icon: BadgeX },
    certo: { className: style.sucessoStatus, Icon: Verified },
};

export default function FormStepWizard({ formData, setFormData, handleSubmit, the_type_submit, initialStep = 1 }) {
    const [theStep, setTheStep] = useState(initialStep);
    const [furthest, setFurthest] = useState(initialStep);
    const statuses = steps.map((_, index) => index + 1 > furthest ? "ignore" :
        stepErrors(formData, index + 1).length ? "cuidado" :
        validateStep(formData, STEPS_WIZARD_RESID["STEP_" + (index + 1)]));
    const errors = stepErrors(formData, theStep);
    const canSubmit = statuses.every(status => status !== "ignore" && status !== "cuidado");
    const Step = steps[theStep - 1];
    const next = () => { setTheStep(theStep + 1); setFurthest(Math.max(furthest, theStep + 1)); };

    return (
        <section className={style.container}>
            <div className={style.spaceTitle}>
                <div className={style.spaceSteps} aria-label="Etapas do formulário">
                    {Object.entries(FORM_FIELD_STEPS).map(([key, step]) => {
                        const number = Number(key);
                        const { className, Icon } = statusDisplay[statuses[number - 1]];
                        return <button key={key} type="button" disabled={number > furthest}
                            aria-current={number === theStep ? "step" : undefined}
                            onClick={() => setTheStep(number)}
                            className={style.stepInfo + " " + className + " " + (number === theStep ? style.stepIn : style.stepOut)}>
                            <Icon size={28} /><h2>{step.opt_step.opt}</h2>
                        </button>;
                    })}
                </div>
            </div>
            <form className={style.content} onSubmit={handleSubmit} noValidate>
                <div className={style.contentTitle}>
                    <h2>{FORM_FIELD_STEPS[theStep].title}</h2>
                    <p style={{ marginTop: 8, fontSize: "0.8rem" }}>
                        {errors.length ? errors.join(" ") : "Campos opcionais podem ficar em branco."}
                    </p>
                </div>
                <Step THE_STEP={STEPS_WIZARD_RESID["STEP_" + theStep]} formData={formData} setFormData={setFormData} />
                <div className={style.spaceNav}>
                    {theStep > 1 && <button type="button" className={style.buttonBack}
                        onClick={() => setTheStep(theStep - 1)}>Anterior</button>}
                    {theStep < 7 ? <button type="button" onClick={next} disabled={errors.length > 0}
                        className={errors.length ? style.disablede : ""}>Próximo: {FORM_FIELD_STEPS[theStep + 1].opt_step.opt}</button>
                        : <button type="submit" disabled={!canSubmit} className={!canSubmit ? style.disablede : ""}>{the_type_submit.title}</button>}
                </div>
            </form>
        </section>
    );
}
