import React from "react";
import style from "./utilities/styles/App.module.scss";
import AppRoutes from "./Routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import Message from "./components/message/Message";

function App() {
    return (
        <>
            <Sidebar />
            <div className={style.appDashboard} style={{ fontFamily: "system-ui, sans-serif", color: "var(--secondary-2)" }}>
                <Header />
                <main className={style.mainContent}><AppRoutes /></main>
                <Footer />
            </div>
            <Message />
        </>
    );
}

export default App;
