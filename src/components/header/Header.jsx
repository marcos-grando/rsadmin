import React from "react";
import style from "./Header.module.scss";
import { LogOut } from "lucide-react";
import { useSidebar } from "../../utilities/contexts/ContextAside";
import { logout } from "../../auth/authLogin";

function Header() {

    const { setShowAside } = useSidebar();

    return (
        <header className={style.header}>
            <h2>RS Administração</h2>
            <button type="button"
            className={style.quit}
            onClick={logout}>
                <LogOut />
            </button>
        </header>
    )
}

export default Header;