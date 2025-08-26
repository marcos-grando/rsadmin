import React from "react";
import { Loader2 } from "lucide-react";
import style from './LoadingCircle.module.scss';

function LoadingCircle() {
    return <span className={style.modalLoading}> <Loader2 /> </span>
};

export default LoadingCircle;