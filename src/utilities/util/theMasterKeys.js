
// ==> MANTER SINCRONIZADO COM "api/util/tablesAndColumns.js"; <==

// Talvez sincronizar com "src/utilities/util/fieldTitleLists.js";
export const KEYS_LIST = {
    KEY_GERAL: 'geral_types',
    KEY_HOME: 'home_infos',
    KEY_ALL_ITEMS: 'all_items',
    KEY_ALL_CONST: 'all_consts',
    KEY_WITH_TYPES: 'geral_types',
    KEY_SELECT_CONST: 'select_const',
    KEY_UPDATE_CONST: 'update_const',
    KEY_SELECT_RESID: 'select_resid',
    KEY_UPDATE_RESID: 'update_resid',
};


/*
    Essas chaves direcionam ao database correto, retornando na API table/columns;
    De forma secundária, keys são usadas por HOOKS (useReadList.jsx como BUS centralizador);
    CUD's devem apenas chamar o BUS de acordo, mas não confundir no uso principal da 'key';
*/