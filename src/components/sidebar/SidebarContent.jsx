import { useLocation } from "react-router-dom";
import NavInit from "./contents/NavInit";

export default function SidebarContent({ setShowAside, isMob }) {
    const { pathname } = useLocation();
    return <NavInit setShowAside={setShowAside} liActive={pathname} setLiActive={() => {}} isMob={isMob} />;
}
