import React from "react";
import { Search, MoveLeft, Edit } from "lucide-react";
import { VIEW_BUTTON, VIEW_MODE, VIEW_PLACEHOLDER } from "../../../utilities/util/fieldTitleLists";

function RenderContentTitle({ handleAction, optSelects, headerConfig, dataSearch, handleDataSearch, style }) {

    const { showHeader, showBack, theTitle, isEditConst } = headerConfig;

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
            {showHeader &&
                <div className={style.toggleSpace}>
                    <button onClick={() => handleAction(valueButton)}>
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
                </div>
            }
        </div>
    )
};

export default RenderContentTitle;