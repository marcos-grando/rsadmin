import React from "react";
import { Search, MoveLeft, Edit, Trash2 } from "lucide-react";
import { VIEW_BUTTON, VIEW_MODE, VIEW_PLACEHOLDER } from "../../../utilities/util/fieldTitleLists";
import { useDeleteConst, useDeleteResid } from "../../../utilities/hooks/useCrudBase";

function RenderContentTitle({ handleAction, optSelects, headerConfig, dataSearch, handleDataSearch, style }) {

    const { showHeader, showBack, showDelete, theTitle, isEditConst } = headerConfig;

    const { deleteConst } = useDeleteConst();
    const { deleteResid } = useDeleteResid();

    const onDeleteItem = optSelects?.opt_resid ? deleteResid : deleteConst;
    const handleDelete = async (e, id, name, count) => {
        e.stopPropagation();
        try { await onDeleteItem(id, name, count); }
        catch (err) { console.error(err); }
        finally {
            setTimeout(() => {
                handleAction('back')
            }, 450);
        }
    };

    const id = optSelects?.opt_resid ? optSelects?.opt_resid?.id : optSelects?.opt_const?.id;
    const name = optSelects?.opt_resid ? optSelects?.opt_resid?.name : optSelects?.opt_const?.name;
    const count = optSelects?.opt_resid ? null : optSelects?.opt_const?.items_count;

    const placeHolder = optSelects?.opt_const ? VIEW_PLACEHOLDER?.resid : VIEW_PLACEHOLDER?.const; // placeholder do input;
    const typeToggle = optSelects?.opt_const ? VIEW_BUTTON?.resid : VIEW_BUTTON?.const; // texto do button;
    const valueButton = optSelects?.opt_const ? VIEW_MODE?.add_resid : VIEW_MODE?.add_const; // valor retornado pelo button;

    return (
        <div className={style.bossTitle}>
            <div className={style.theTitleList}>
                {showBack &&
                    <MoveLeft size={20}
                        className={style.moveLeft}
                        onClick={() => handleAction("back")}
                    />
                }
                <h2 className={showBack ? style.open : style.close}>{theTitle}</h2>
                {isEditConst &&
                    <Edit size={20}
                        className={`${style.editConst} ${showBack ? style.open : style.close}`}
                        onClick={() => handleAction(VIEW_MODE?.select_const)}
                    />
                }
            </div>
            <div className={style.toggleSpace}>
                {showDelete &&
                    <button type="button" onClick={(e) => handleDelete(e, id, name, count)} className={style.deleteButton}>
                        <Trash2 size={18} />
                    </button>
                }
                {showHeader && <>
                    <button type="button" onClick={() => handleAction(valueButton)}>
                        {typeToggle}
                    </button>
                    <div className={style.inputSpace}>
                        <input
                            className={style.inpuText}
                            type="text"
                            placeholder={placeHolder}
                            value={dataSearch}
                            onChange={(e) => handleDataSearch(e.target.value)}
                        />
                        <Search size={18} />
                    </div>
                </>}
            </div>
        </div>
    )
};

export default RenderContentTitle;