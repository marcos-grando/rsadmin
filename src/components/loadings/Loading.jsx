import React from "react";
import style from "./Loading.module.scss";
import { Loader2 } from "lucide-react";

function Loading() {

    return (
        // <div style={{ width: "100%", height: "100%", padding: "1rem 0 5px 2rem", fontWeight: "400" }}>
        //     <span className={style.modalLoading}> <Loader2 /> </span>
        // </div>
        <div className={style.container}>
            <div className={style.shadow}>
                <span className={style.loading}> <Loader2 /> </span>
            </div>
        </div>
    )
}

export default Loading;