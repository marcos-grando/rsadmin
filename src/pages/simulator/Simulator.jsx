import { useState } from "react";
import FormStepWizard from "../../components/content_forms/steps_wizard/FormStepWizard";
import CardExample from "../../components/content_forms/steps_wizard/steps/step7/CardExample";
import { FORM_RESID_FORMDATA } from "../../utilities/util/fieldTitleForms";
import { buildSimulatorObject, serializeSimulatorObject } from "../../utilities/util/simulatorModel";
import { useMessage } from "../../utilities/contexts/ContextMessage";
import useObjectURL from "../../utilities/hooks/useObjectURL";
import style from "./Simulator.module.scss";

function ImagePreview({ image }) {
    const url = useObjectURL(image.file);
    return <figure><img src={url || undefined} alt={image.title || image.file.name} />
        <figcaption>{image.title || image.file.name}{image.description && <p>{image.description}</p>}</figcaption>
    </figure>;
}

export default function Simulator() {
    const [formData, setFormData] = useState(() => structuredClone(FORM_RESID_FORMDATA));
    const [result, setResult] = useState(null);
    const [editingResult, setEditingResult] = useState(false);
    const [generation, setGeneration] = useState(0);
    const { showMessage } = useMessage();

    const handleSubmit = event => {
        event.preventDefault();
        try {
            setResult(buildSimulatorObject(formData));
            setEditingResult(false);
        } catch (error) { showMessage("error", <p>{error.message}</p>); }
    };
    const reset = () => {
        if (!window.confirm("Descartar esta simulação e começar outra?")) return;
        setResult(null);
        setEditingResult(false);
        setFormData(structuredClone(FORM_RESID_FORMDATA));
        setGeneration(previous => previous + 1);
    };
    const json = result ? serializeSimulatorObject(result) : "";
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(json);
            showMessage("sucess", <p>JSON copiado. As imagens estão representadas pelos dados dos arquivos, sem upload.</p>, 4500);
        } catch { showMessage("warning", <p>Não foi possível copiar. Selecione o texto do JSON abaixo.</p>); }
    };
    const galleries = result ? [
        ["Apartamento", result.images.apartment],
        ["Condomínio", result.images.condominium],
        ["Plantas", result.images.floorPlan],
    ] : [];

    return (
        <section className={style.simulator}>
            <div className={style.intro}>
                <div><h1>Simulador de imóveis</h1>
                    <p>Preencha, visualize e gere um objeto temporário. Nada é enviado ao banco ou publicado; recarregar apaga a simulação.</p>
                </div>
                <button type="button" onClick={reset}>Reiniciar</button>
            </div>
            {(!result || editingResult) ? (
                <FormStepWizard key={generation} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}
                    initialStep={editingResult ? 7 : 1} the_type_submit={{ title: "Gerar objeto" }} />
            ) : (
                <div className={style.result} aria-label="Resultado da simulação">
                    <div className={style.actions}><h2>Objeto gerado</h2>
                        <button type="button" onClick={() => setEditingResult(true)}>Voltar ao formulário</button>
                        <button type="button" onClick={copy}>Copiar JSON</button>
                    </div>
                    <p>O JSON inclui apenas os metadados das imagens. Os arquivos e suas prévias existem somente nesta sessão da página.</p>
                    <div className={style.summary}>
                        <CardExample formData={formData} statusName={result.status.name} />
                        <div><h3>{result.name}</h3><p>{result.type.name} · {result.construtora.name}</p>
                            <p>{result.address.rua}, {result.address.bairro} — {result.address.cidade}/{result.address.estado}</p>
                            {result.images.logo && <ImagePreview image={result.images.logo} />}
                        </div>
                    </div>
                    {galleries.map(([label, images]) => images.length > 0 && (
                        <section key={label} className={style.gallery}><h3>{label} · {images.length} imagem(ns)</h3>
                            <div>{images.map((image, index) => <ImagePreview key={index} image={image} />)}</div>
                        </section>
                    ))}
                    <pre tabIndex={0} aria-label="JSON do imóvel">{json}</pre>
                </div>
            )}
        </section>
    );
}
