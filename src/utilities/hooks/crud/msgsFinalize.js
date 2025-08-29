import { KEY_DELETE_CONST, KEY_DELETE_RESID, KEY_UPDATE_RESID } from "../../../../shared/theMasterKeys";

export const msgFinale = {
    title: "Fazer as Alterações?",
    text: [`Os dados serão alterados permanentemente.`],
    alert: "Essa ação NÃO poderá ser desfeita.",
    not: "Não, cancelar",
    yes: "Fazer Alterações",
};

export const msgFinaleDelete = (key, name, count) => {

    let msgFinale;
    if (key === KEY_DELETE_CONST) {
        msgFinale = {
            title: `Excluir Construtora?`,
            text: [
                `"${name}" será excluída permanentemente.`,
                count === 0
                    ? `Info: Construtora não possui imóvel registrado.`
                    : count > 1
                        ? `Info: ${count} imóveis serão movidos para "Sem Construtora".`
                        : `Info: ${count} imóvel será movido para "Sem Construtora".`,
                // "Outros textos..."
            ],
            alert: "Essa ação NÃO poderá ser desfeita.",
            not: "Não, cancelar",
            yes: "Sim, excluir",
        };
    };
    if (key === KEY_UPDATE_RESID) {
        msgFinale = {
            title: "Excluir Residencial?",
            text: [`"${name}" será excluído permanentemente.`],
            alert: "Essa ação NÃO poderá ser desfeita.",
            yes: "Excluir", not: "Cancelar"
        };
    };

    return msgFinale
};