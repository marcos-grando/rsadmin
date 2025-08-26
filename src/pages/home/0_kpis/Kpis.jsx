import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./estilos/Kpis.module.scss";
import KpisContent from "./KpisContent";

function Kpis({ data }) {

    const containerRef = useRef(null);
    const [endOrStart, setEndOrStart] = useState(null);

    const handleScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const tolerance = 2;
        const atStart = el.scrollLeft <= tolerance;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance;
        const fitsAll = el.scrollWidth <= el.clientWidth + 1;

        if (fitsAll) setEndOrStart(null);
        else if (atStart) setEndOrStart("start");
        else if (atEnd) setEndOrStart("end");
        else setEndOrStart("both");
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            el.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <div ref={containerRef} onScroll={handleScroll} className={style.kpisContainer}> 
                <KpisContent data={data} />
            </div>
            <div className={`${style.divShadowExternal} ${endOrStart === "start" ? style.divStart : endOrStart === "end" ? style.divEnd : endOrStart === "both" ? style.divBoth : style.divNotBoth}`}></div>
        </>
    );
}

export default Kpis;
