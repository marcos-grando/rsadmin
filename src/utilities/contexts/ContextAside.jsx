import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

function ContextAside({ children }) {

    const isWidth = 1480;
    const getIsMob = () => typeof window !== "undefined" ? window.innerWidth < isWidth : false;

    const [isMob, setIsMob] = useState(getIsMob);
    const [showAside, setShowAside] = useState(() => !getIsMob());

    // funciona como um media query, criando um breakpoint para atualizar o estado isMob
    // isMob atualizado ao cruzar o breakpoint, ao invés de atualizar à cada pixel movimentado
    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${isWidth}px)`);
        const onChange = e => {
            setIsMob(e.matches);
            setShowAside(!e.matches);
        };
        onChange(mql);

        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return (
        <SidebarContext.Provider value={{ showAside, setShowAside, isMob, setIsMob }}>
            {children}
        </SidebarContext.Provider>
    );
};

export default ContextAside;
export const useSidebar = () => useContext(SidebarContext);
