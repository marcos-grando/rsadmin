// src/Routes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/loadings/Loading";
const ListConst = lazy(() => import("./pages/list_const/ListConst"));
const Home = lazy(() => import("./pages/home/Home"));
const HouseList = lazy(() => import("./pages/house_test/HouseList"));
const ListAll = lazy(() => import("./pages/list_all/ListAll"));
const GeralList = lazy(() => import("./pages/list_geral/GeralList"));

function AppRoutes() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/todos-imoveis" element={<ListAll />} />
                <Route path="/residenciais" element={<ListConst />} />
                {/* <Route path="/casas" element={<HouseList />} />
                <Route path="/terrenos" element={<HouseList />} /> */}
                <Route path="/:slug" element={<GeralList />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;