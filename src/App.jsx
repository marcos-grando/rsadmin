import React from "react";
import AppRoutes from "./Routes";
import style from "./utilities/styles/App.module.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import Message from "./components/message/Message";
import Confirm from "./components/confirm/Confirm";

function App() {

    return (
        <>
            <Sidebar />
            <div className={style.appDashboard}>
                <Header />
                <main className={style.mainContent}>
                    <AppRoutes />
                </main>
                <Footer />
            </div>
            <Confirm />
            <Message />
        </>
    );
}

export default App;
