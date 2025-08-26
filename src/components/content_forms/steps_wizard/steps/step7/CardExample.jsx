import React from "react";
import style from './CardExample.module.scss';
import { Car, Bed, Bath } from "lucide-react";

function CardExample({ formData, statusName }) {

    const file = formData?.thumb?.url;

    const formatBrl = (valor) => {
        if (!valor) return 'R$ 0,00';

        const number = String(formData?.valor ?? '');
        const formatNumber = (parseFloat(number || 0)).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return formatNumber;
    }

    const bedMin = formData?.extradb?.details?.dorms?.min;
    const bedMax = formData?.extradb?.details?.dorms?.max;
    const bathMin = formData?.extradb?.details?.banheiros?.min;
    const bathMax = formData?.extradb?.details?.banheiros?.max;
    const carMin = formData?.extradb?.details?.garagens?.min;
    const carMax = formData?.extradb?.details?.garagens?.max;

    return (
        <div className={style.exampleItem}>

            {formData?.thumb?.url &&
                <img src={file instanceof File ? URL.createObjectURL(file) : file} alt="preview" />
            }

            <div className={style.item}>
                <div className={style.status}>{statusName}</div>

                <div className={style.content}>
                    <div className={style.texts}>
                        <p className={style.title}>{formData?.name}</p>
                        <p className={style.local}>{formData?.bairro}, {formData?.cidade}</p>
                        <p className={style.valor}>A partir de <span>{formatBrl(formData?.valor)}</span></p>
                    </div>
                    <div className={style.infos}>
                        <div className={style.info}>
                            <Bed />
                            <p>{bedMin}~{bedMax}</p>
                        </div>
                        <div className={style.info}>
                            <Bath />
                            <p>{bathMin}~{bathMax}</p>
                        </div>
                        <div className={style.info}>
                            <Car />
                            <p>{carMin}~{carMax}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardExample;