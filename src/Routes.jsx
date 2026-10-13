import { Routes, Route, Navigate } from "react-router-dom";
import Simulator from "./pages/simulator/Simulator";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Simulator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
