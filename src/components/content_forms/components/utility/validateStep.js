
import { getValueByPath } from "../../../../utilities/util/processValueByPath";

// Faz uma análise dos inputs do formulário junto do formData;
// Ou seja, trabalha junto de THE_STEP + formData 'State'; 
// Verifica se: 
// 1 - Algum "required" não preenchido? 'cuidado';
// 2 - Algum não-"required" não preenchido? 'obs';
// 3 - Tudo preenchido? 'certo;
export const validateStep = (formData, stepConfig) => {
    let hasRequiredMissing = false;
    let hasOptionalMissing = false;

    const entries = Array.isArray(stepConfig) ? stepConfig : Object.values(stepConfig);

    for (const input of entries) {
        const inputPropObj = input.inputProps?.(formData, () => { });
        const isRequired = inputPropObj?.required ?? false;
        const value = getValueByPath(formData, input.the_path);
        const isEmpty =
            value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0);

        if (isRequired && isEmpty) {
            hasRequiredMissing = true;
        } else if (!isRequired && isEmpty) {
            hasOptionalMissing = true;
        }
    }

    if (hasRequiredMissing) return 'cuidado';
    if (hasOptionalMissing) return 'obs';
    return 'certo';
};