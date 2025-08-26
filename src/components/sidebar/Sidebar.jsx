import React, { useEffect, useRef, useState } from "react";
import { X, Menu } from "lucide-react";
import { useSidebar } from "../../utilities/contexts/ContextAside";
import style from "./styles/Sidebar.module.scss";
import SidebarContent from "./SidebarContent";

function Sidebar() {

    const { showAside, setShowAside, isMob } = useSidebar();
    const [openAside, setOpenAside] = useState(showAside);

    useEffect(() => {
        let timer;
        if (showAside) {
            setOpenAside(true);
            return
        } else {
            timer = setTimeout(() => {
                setOpenAside(false);
            }, 400);
        }
        return () => clearTimeout(timer);
    }, [showAside])

    const touchStartX = useRef(null);
    const touchCurrentX = useRef(null);

    useEffect(() => {
        if (!isMob) return;

        const threshold = 100;
        const edgeZone = 125;

        const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
            touchCurrentX.current = touchStartX.current;
        };
        const handleTouchMove = (e) => {
            if (touchStartX.current !== null) {
                touchCurrentX.current = e.touches[0].clientX;
            }
        };

        const handleTouchEnd = () => {
            const startX = touchStartX.current;
            const endX = touchCurrentX.current;
            if (startX === null || endX === null) {
                touchStartX.current = null;
                touchCurrentX.current = null;
                return;
            }

            const deltaX = endX - startX;

            if (!showAside && startX < edgeZone && deltaX > threshold) {
                setShowAside(true);
            } else if (showAside && deltaX < -threshold) {
                setShowAside(false);
            }

            touchStartX.current = null;
            touchCurrentX.current = null;
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isMob, showAside, setShowAside]);

    return (
        <>
            <aside className={`${style.sidebar} ${isMob ? style.mobile : style.desktop} ${showAside ? style.open : style.closed}`}>
                <div className={style.buttonContainer}>
                    {!showAside ?
                        <Menu size={32} strokeWidth={2}
                            className={`${style.closOpenIcons} ${style.menuIcon}`}
                            onClick={() => setShowAside(prev => !prev)}
                        />
                        : <X size={32} strokeWidth={2}
                            className={`${style.closOpenIcons} ${style.xIcon}`}
                            onClick={() => setShowAside(prev => !prev)}
                        />
                    }
                </div>
                <div className={`${style.theTitle} ${showAside ? style.open : style.closed}`}>
                    <h1>RS</h1>
                    <p>Admin</p>
                </div>
                {openAside &&
                    <SidebarContent setShowAside={setShowAside} style={style} isMob={isMob} />
                }
            </aside>
            {isMob && showAside && <div className={style.modalNoclick} onClick={() => setShowAside(false)}></div>}
        </>
    )
}

export default Sidebar;