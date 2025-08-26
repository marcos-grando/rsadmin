import React, { useEffect, useState, useMemo } from "react";
import style from "./style/Steps7.module.scss";
import { validateStep } from "../../components/utility/validateStep";
import { useListTablesMinor } from "../../../../utilities/hooks/useListTablesMinor";
import TypesInputs from "../../components/TypesInputs";
import TheTitleLabel from "../../components/TheTitleLabel";
import CardExample from "./step7/CardExample";

function Step7({ THE_STEP, setStatus, formData, setFormData, alterProps }) {

    useEffect(() => {
        const stepStatus = validateStep(formData, THE_STEP);
        setStatus(prev => ({ ...prev, 7: stepStatus }))
    }, [formData]);

    // No formData tenho apenas o status_id e o utilizo em 'statusMap;
    // Identificando seu nome em opts_status, armazenando no State;
    const [statusName, setStatusName] = useState(null);
    const { opts_status } = useListTablesMinor();

    const statusMap = useMemo(() => {
        const map = {};
        opts_status.forEach(each => {
            if (each?.id != null) { map[each.id] = each.name; }
        });
        return map;
    }, [opts_status]);

    useEffect(() => {
        setStatusName(statusMap[formData?.status_id] || null);
    }, [formData?.status_id, statusMap]);

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