import React, { useEffect, useState } from "react";
import supabase from "../../utilities/util/supabaseClient";
import styles from "./Home.module.scss";
// processData
import processkpis from "./scripts/processKpis";
import processMediaLocal from "./scripts/processMediaLocal";
import processMediaConst from "./scripts/processMediaConst";
import processQntdLocal from "./scripts/processQntdLocal";
import processQntdConst from "./scripts/processQntdConst";
import processTopImoveis from "./scripts/processTopImoveis";
// contents
import Kpis from "./0_kpis/Kpis";
import ForLocal from "./1_qntd_local/ForLocal";
import MediaForLocal from "./2_media_local/MediaForLocal";
import MediaForConst from "./3_media_const/MediaForConst";
import ForConst from "./4_qntd_const/ForConst";
import TopImoveis from "./5_top_imoveis/TopImoveis";
import PendingInfos from "./6_pending/PendingInfos";
import Loading from "../../components/loadings/Loading";
import { useReadList } from "../../utilities/hooks/useReadList";
import { KEYS_LIST } from "../../utilities/util/theMasterKeys";

function Home() {

    const { data, loading, error } = useReadList(KEYS_LIST?.KEY_HOME)

    const [kpiData, setKpiData] = useState(null);
    const [qntdLocalData, setQntdLocalData] = useState(null);
    const [mediaConstData, setMediaConstData] = useState(null);
    const [mediaLocalData, setMediaLocalData] = useState(null);
    const [qntdConstData, setQntdConstData] = useState(null);
    const [topImoveisData, setTopImoveisData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!data) return;

        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        if (!list || list.length === 0) return;

        try {
            const isData = data.map(i => ({
                ...i,
                local: [i.bairro, i.cidade].filter(Boolean).join(', ')
            }));

            setKpiData(processkpis(isData));
            setMediaConstData(processMediaConst(isData));
            setMediaLocalData(processMediaLocal(isData));
            setQntdLocalData(processQntdLocal(isData));
            setQntdConstData(processQntdConst(isData));
            setTopImoveisData(processTopImoveis(isData));
        } catch (err) {
            console.error("Erro Home.jsx: ", err);
        };
    }, [data]);

    useEffect(() => {
        if (error) { setFetchStatus(prev => ({ ...prev, loading: loading })); };
    }, [error]);

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);


    const divsDashboard = [
        { isValid: kpiData, isClass: styles.kpiWrapper, isCompn: <Kpis data={kpiData} /> },
        { isValid: qntdLocalData, isClass: styles.localDonuts, isCompn: <ForLocal data={qntdLocalData} /> },
        { isValid: mediaLocalData, isClass: styles.localPriceBars, isCompn: <MediaForLocal data={mediaLocalData} /> },
        { isValid: mediaConstData, isClass: styles.valueconstWrapper, isCompn: <MediaForConst data={mediaConstData} /> },
        { isValid: qntdConstData, isClass: styles.constWrapper, isCompn: <ForConst data={qntdConstData} /> },
        { isValid: topImoveisData, isClass: styles.localWrapper, isCompn: <TopImoveis data={topImoveisData} /> },
        { isValid: isLoading, isClass: styles.pendingWrapper, isCompn: <PendingInfos /> }
    ]

    return (
        <div className={styles.mainContainer}>
            {divsDashboard.map((each, i) => (
                <section key={i} className={each?.isClass}>
                    {each?.isValid ?
                        each?.isCompn
                        :
                        <div className={styles.loading}>
                            <Loading />
                        </div>
                    }
                </section>
            ))}
        </div>
    );
}

export default Home;
