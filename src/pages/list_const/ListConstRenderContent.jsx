import React from "react";
import style from './style/ListConstRenderContent.module.scss';
import { VIEW_MODE } from "../../utilities/util/fieldTitleLists";
import RenderContentTitle from "./components/RenderContentTitle";
import ListConstTheList from "./ListConstTheList";
import NewResid from "./components/new_resid/NewResid";
import NewConst from "./components/new_const/NewConst";
import AlterResid from "./components/alter_resid/AlterResid";
import AlterConst from "./components/alter_const/AlterConst";

function ListConstRenderContent({ fetchStatus, optSelects, setOptSelects, viewMode, handleAction, headerConfig, dataSearch, handleDataSearch, searchConstData, searchFullData }) {

    const renderDetails = () => {
        switch (viewMode) {
            case VIEW_MODE.add_const:
                return <NewConst handleViewMode={handleAction} />;
            case VIEW_MODE.add_resid:
                return <NewResid constId={optSelects?.opt_const?.id} handleViewMode={handleAction} />;
            case VIEW_MODE.select_resid:
                return <AlterResid idResidSelect={optSelects?.opt_resid?.id} handleViewMode={handleAction} />
            case VIEW_MODE?.select_const:
                return <AlterConst idConstSelect={optSelects?.opt_const?.id} handleViewMode={handleAction} />
            default:
                return (
                    <ListConstTheList
                        fetchStatus={fetchStatus}
                        optSelects={optSelects}
                        setOptSelects={setOptSelects}
                        handleAction={handleAction}
                        searchConstData={searchConstData}
                        searchFullData={searchFullData}
                    />
                );
        };
    };

    return (
        <div className={style.constList}>
            <div className={style.wrapper}>
                <RenderContentTitle
                    viewMode={viewMode}
                    handleAction={handleAction}
                    optSelects={optSelects}
                    headerConfig={headerConfig}
                    dataSearch={dataSearch}
                    handleDataSearch={handleDataSearch}
                    style={style}
                />
                <div className={style.details}>
                    {renderDetails()}
                </div>
            </div>
        </div>
    )
}

export default ListConstRenderContent;