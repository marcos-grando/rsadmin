import { lazy, Suspense, useState } from "react";
import style from "./style/Steps2e3.module.scss";
import TypesInputs from "../../components/TypesInputs";
import TheTitleLabel from "../../components/TheTitleLabel";
const Step2Container = lazy(() => import("./Step2/Step2Container"));

export default function Step2({ THE_STEP, formData, setFormData }) {
    const [showMap, setShowMap] = useState(false);
    const hasToken = Boolean(import.meta.env.VITE_MAPBOX_TOKEN);
    return (
        <div className={"step " + style.step2}>
            {THE_STEP.map((each, index) => (
                <div key={index} className={style.theInput}>
                    <TheTitleLabel the_label={each.the_label} isRequired={each.inputProps(formData)?.required} />
                    <label><TypesInputs {...each} formData={formData} setFormData={setFormData} /></label>
                </div>
            ))}
            <div className={style.mapArea}>
                <p>Endereço manual. Coordenadas são opcionais.</p>
                {hasToken ? <button type="button" onClick={() => setShowMap(!showMap)}>
                    {showMap ? "Fechar mapa" : "Usar mapa opcional"}
                </button> : <p>Mapa opcional não configurado. O formulário funciona sem ele.</p>}
                {showMap && <Suspense fallback={<p>Carregando mapa…</p>}>
                    <Step2Container formData={formData} setFormData={setFormData} />
                </Suspense>}
            </div>
        </div>
    );
}
