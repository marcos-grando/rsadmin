import React, { useMemo, useState } from "react";
import { ALL_IMOVEIS } from "../../utilities/util/fieldTitleLists";
import { Search } from "lucide-react";
import style from "./ListAllContainer.module.scss";
import ListContainer from "../../components/content_page/list_container/ListContainer";
import FetchStatusList from "../../components/loadings/FetchStatusList";

function ListAllContainer({ fetchStatus, fullData }) {

    const [searchText, setSearchText] = useState("");

    const data = useMemo(() => {
        const needle = searchText.toLowerCase();
        const keys = ['name', 'tipo', 'local', 'valor'];

        return fullData.filter(item => keys.some(key => (item[key] ?? '').toString().toLowerCase().includes(needle)));
    }, [fullData, searchText]);

    const isPageType = "alltypes";
    const the_status = useMemo(() => {
        if (fetchStatus.loading)
            return { isLoading: true, theTitle: "Carregando...", theMsg: "Aguarde enquanto os dados são carregados.", typePage: isPageType };
        if (fetchStatus.error)
            return { isLoading: false, theTitle: "Ops, ocorreu um erro!", theMsg: `Erro: ${fetchStatus.error.message}`, typePage: isPageType };
        if (!data || data.length === 0)
            return { isLoading: false, theTitle: "Imóvel não encontrado!", theMsg: "Refaça a busca ou insira novos imóveis.", typePage: isPageType };
        return null;
    }, [fetchStatus.loading, fetchStatus.error, fetchStatus.error?.message, data]);

    return (
        <div className={style.allList}>
            <div className={style.wrapper}>
                <div className={style.bossTitle}>
                    <h2>Todos Imóveis</h2>
                    <div className={style.inputSpace}>
                        <input
                            className={style.inpuText}
                            type="text"
                            placeholder="Pesquisar anúncio..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Search size={22} />
                    </div>
                </div>
                {the_status && <FetchStatusList {...the_status} />}
                {!the_status && <ListContainer
                    originalList={data}
                    titleList={"Lista de Todos Imóveis no Banco de Dados"}
                    totalColumns={ALL_IMOVEIS.totalColumns}
                    fieldTitles={ALL_IMOVEIS.fieldTitles}
                    gridColumns={ALL_IMOVEIS.gridColumns}
                />}
            </div>
        </div>
    )
}

export default ListAllContainer;