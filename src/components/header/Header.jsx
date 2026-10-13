import style from "./Header.module.scss";
import { Menu } from "lucide-react";
import { useSidebar } from "../../utilities/contexts/ContextAside";

export default function Header() {
    const { setShowAside } = useSidebar();
    return (
        <header className={style.header}>
            <h2>RS Simulador</h2>
            <button type="button" className={style.quit} aria-label="Abrir ou fechar menu"
                onClick={() => setShowAside(previous => !previous)}><Menu /></button>
        </header>
    );
}
