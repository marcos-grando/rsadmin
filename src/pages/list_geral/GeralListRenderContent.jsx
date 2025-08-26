import React from "react";
import { Search, MoveLeft } from "lucide-react";
import style from "./style/GeralListRenderContent.module.scss"
import GeralListTheList from "./GeralListTheList";

function GeralListRenderContent({ fetchStatus, TYPES_LABEL, slug, itemSelect, setItemSelect, handleAction, viewMode, theTitle, showBack, filteredData, searchText, setSearchText }) {

    return (
        <div className={style.constList}>
            <div className={style.wrapper}>
                <div className={style.bossTitle}>
                    <div className={style.theTitleList}>
                        {showBack && <MoveLeft size={20} className={style.moveLeft} onClick={() => handleAction("back")} />}
                        <h2 className={showBack ? style.open : style.close}>{theTitle}</h2>
                    </div>
                    {viewMode === "list" && <div className={style.toggleSpace}>
                        <button type="button"
                            disabled={true}
                            onClick={() => handleAction("add")}
                            style={{ opacity: '0.7' }}
                            title="Em breve..."
                        >
                            {TYPES_LABEL?.[slug].button}
                        </button>
                        <div className={style.inputSpace}>
                            <input
                                className={style.inpuText}
                                type="text"
                                placeholder={"Pesquisar anúncio..."}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <Search size={18} />
                        </div>
                    </div>}
                </div>
                <div className={style.details}>
                    {itemSelect ? (
                        <p>Item Selecionado</p>
                    ) : (
                        viewMode === "add" ? (
                            <p>Novo Item</p>
                        ) : (
                            <GeralListTheList
                                fetchStatus={fetchStatus}
                                TYPES_LABEL={TYPES_LABEL}
                                slug={slug}
                                itemSelect={itemSelect}
                                setItemSelect={setItemSelect}
                                filteredData={filteredData}
                                handleAction={handleAction}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default GeralListRenderContent;