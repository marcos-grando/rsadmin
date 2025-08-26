import React, { useEffect, useState } from "react";
import "../components/style/Steps.scss";
import style from "./FormStepWizard.module.scss";
import { BadgeX, Verified, BadgeAlert, Badge } from "lucide-react";
import { FORM_FIELD_STEPS } from "../../../utilities/util/fieldTitleForms";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";
import { STEPS_WIZARD_RESID } from "./inputConfig";
import { validateStep } from "../components/utility/validateStep";

const IS_CLASS = {
    ignore: { classIn: style.ignoreStatus, icon: <Badge size={28} /> },
    obs: { classIn: style.obsStatus, icon: <BadgeAlert size={28} /> },
    cuidado: { classIn: style.warningStatus, icon: <BadgeX size={28} /> },
    certo: { classIn: style.sucessoStatus, icon: <Verified size={28} /> },
};

function FormStepWizard({ formData, alterProps, setFormData, handleSubmit, the_type_submit, loading }) {

    const [theStep, setTheStep] = useState(1);
    const [status, setStatus] = useState({ 1: "obs", 2: "ignore", 3: "ignore", 4: "ignore", 5: "ignore", 6: "ignore", 7: "ignore", }); // "ignore", "obs", "cuidado", "certo"

    useEffect(() => {
        if (alterProps) {
            Object.values(STEPS_WIZARD_RESID).forEach((STEP_X, i) => {
                const stepStatus = validateStep(formData, STEP_X);
                setStatus(prev => ({ ...prev, [i+1]: stepStatus }));
            });
        };
    }, [alterProps]);
    
    useEffect(() => {
        setTimeout(() => {
            const consoletext = alterProps ? "Alter Resid: " : "New Resid: ";
            console.log(consoletext, formData);
        }, 1000);
    }, [formData]);

    const isNav = (s) => { if (status?.[s] !== "ignore") setTheStep(s); };
    const back = () => setTheStep((prev) => Math.max(prev - 1, 1));
    const next = () => setTheStep((prev) => Math.min(prev + 1, 7));

    const hasWarning = Object.values(status).some(value => value === "ignore" || value === "cuidado");
    const submitOrNor = theStep === 7;
    const backOrNor = FORM_FIELD_STEPS?.[theStep].is_back;
    const nextOrNor = FORM_FIELD_STEPS?.[theStep].is_next;
    const nextWarning = status?.[theStep] === "cuidado";

    // definição das props + return do componente Step correto;
    const theCommonProps = {
        setStatus: setStatus, formData: formData, setFormData: setFormData, alterProps: alterProps,
    };
    const stepReturn = (stepHere) => {
        switch (stepHere) {
            case 1: return <Step1 THE_STEP={STEPS_WIZARD_RESID?.STEP_1} {...theCommonProps} />
            case 2: return <Step2 THE_STEP={STEPS_WIZARD_RESID?.STEP_2} {...theCommonProps} />
            case 3: return <Step3 THE_STEP={STEPS_WIZARD_RESID?.STEP_3} {...theCommonProps} />
            case 4: return <Step4 THE_STEP={STEPS_WIZARD_RESID?.STEP_4} {...theCommonProps} />
            case 5: return <Step5 THE_STEP={STEPS_WIZARD_RESID?.STEP_5} {...theCommonProps} />
            case 6: return <Step6 THE_STEP={STEPS_WIZARD_RESID?.STEP_6} {...theCommonProps} />
            case 7: return <Step7 THE_STEP={STEPS_WIZARD_RESID?.STEP_7} {...theCommonProps} />
        };
    };

    return (
        <section className={style.container}>
            <div className={style.spaceTitle}>
                <div className={style.spaceSteps}>

                    {Object.entries(FORM_FIELD_STEPS).map(([objKey, each]) => (
                        <button key={objKey}
                            onClick={() => isNav(each.opt_step.step)}
                            className={`
                                ${style.stepInfo}
                                ${Number(objKey) === theStep ? style.stepIn : style.stepOut}
                                ${IS_CLASS?.[status?.[Number(objKey)]]?.classIn}
                            `}
                        >
                            {IS_CLASS?.[status?.[Number(objKey)]]?.icon}
                            <h2>{each.opt_step.opt}</h2>
                        </button>
                    ))}
                </div>
            </div>

            <form className={style.content} onSubmit={handleSubmit} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); } }}>

                <div className={style.contentTitle}>
                    <h2>{FORM_FIELD_STEPS?.[theStep].title}</h2>
                </div>

                {stepReturn(theStep)}

                <div className={style.spaceNav}>
                    {backOrNor &&
                        <button type="button" onClick={back}
                            className={style.buttonBack}
                        >
                            Anterior: {FORM_FIELD_STEPS?.[theStep - 1].opt_step.opt}
                        </button>
                    }

                    {submitOrNor &&
                        <button type="submit"
                            className={loading || hasWarning ? style.disablede : ''}
                            disabled={loading || hasWarning}
                        >
                            {loading ? the_type_submit?.loading : the_type_submit?.title}
                        </button>
                    }

                    {nextOrNor &&
                        <button type="button" onClick={next}
                            className={nextWarning ? style.disablede : ''}
                            disabled={nextWarning}
                        >
                            Próximo: {FORM_FIELD_STEPS?.[theStep + 1].opt_step.opt}
                        </button>
                    }
                </div>
            </form>

        </section>
    )
}

export default FormStepWizard;
