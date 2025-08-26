import React from "react";
import style from "./PendingInfos.module.scss";
import { LucideHardHat, Construction } from "lucide-react";

function PendingInfos() {

    return (
        <div className={style.container}>
            <div className={style.theTitle}>
                <h2>Alerta: Pendências!</h2>
                <p>Informações vazias ou possivelmente erradas.</p>
            </div>
            <div className={style.content}>
                <Construction size={120} strokeWidth={1} />
                <h2>Em breve...</h2>
                {/* <div className={style.infoContent}>
                    <p>Mensagens de pendência</p>
                </div>
                <div className={style.infoContent}>
                    <p>Mensagens de pendência</p>
                </div>
                <div className={style.infoContent}>
                    <p>Mensagens de pendência</p>
                </div>
                <div className={style.infoContent}>
                    <p>Mensagens de pendência</p>
                </div>
                <div className={style.infoContent}>
                    <p>Mensagens de pendência</p>
                </div> */}
            </div>
        </div>
    )
}

export default PendingInfos;