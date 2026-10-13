import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextAside from "./utilities/contexts/ContextAside.jsx";
import ContextMessage from "./utilities/contexts/ContextMessage.jsx";
import "./utilities/styles/style.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ContextAside>
                <ContextMessage><App /></ContextMessage>
            </ContextAside>
        </BrowserRouter>
    </StrictMode>
);
