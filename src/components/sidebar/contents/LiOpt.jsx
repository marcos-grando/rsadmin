import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/NavsStyle.module.scss";

function LiOpt({ opt, icon, into, setShowAside, liActive, setLiActive, isMob }) {

    return (
        <li className={`${style.item} ${liActive === into ? style.active : ""}`}
            onClick={() => {
                setLiActive(into);
                isMob && setShowAside(false);
            }}
        >
            <Link to={into}>
                {icon} <span>{opt}</span>
            </Link>
        </li>
    )
}

export default LiOpt;