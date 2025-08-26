
// ==== { Prédefinições de listas } ====
// totalColumns e gridColumns definem como será grid;
// fieldTitles definem o nome aparente título e o valor de cada coluna;

const GRID_TEMPLATES = {
    6: "minmax(40px,60px) minmax(180px,2fr) minmax(160px,1fr) minmax(150px,1fr) minmax(50px,70px) 70px",
    7: "minmax(40px,60px) 110px minmax(180px,2fr) minmax(160px,1fr) minmax(150px,1fr) minmax(50px,70px) 70px",
};

export const ALL_IMOVEIS = {
    totalColumns: 7,
    gridColumns: GRID_TEMPLATES[7],
    fieldTitles: [
        { title: "Tipo", optSort: "type" },
        { title: "Nome do Anúncio", optSort: "name" },
        { title: "Localização", optSort: "local" },
        { title: "A partir de", optSort: "valor" },
    ]
};
export const CONST_CONSTRUTORAS = {
    totalColumns: 6,
    gridColumns: GRID_TEMPLATES[6],
    fieldTitles: [
        { title: "Construtora", optSort: "name" },
        { title: "Região principal", optSort: "local" },
        { title: "Média de R$", optSort: "valor" },
    ]
};
export const CONST_RESIDENCIAIS = {
    totalColumns: 6,
    gridColumns: GRID_TEMPLATES[6],
    fieldTitles: [
        { title: "Empreendimento", optSort: "name" },
        { title: "Localização", optSort: "local" },
        { title: "A partir de", optSort: "valor" },
    ]
};

// casas/fazendas/terrenos estão juntos, posteriormente separá-los (junto das APIs);
export const TYPE_IMOVEIS = {
    totalColumns: 6,
    gridColumns: GRID_TEMPLATES[6],
    casas: {
        the_title: "Casas Registradas",
        fieldTitles: [
            { title: "Casas", optSort: "name" },
            { title: "Localização", optSort: "local" },
            { title: "Valor", optSort: "valor" },
        ]
    },
    terrenos: {
        the_title: "Terrenos Registrados",
        fieldTitles: [
            { title: "Terrenos", optSort: "name" },
            { title: "Localização", optSort: "local" },
            { title: "Valor", optSort: "valor" },
        ]
    },
    fazendas: {
        the_title: "Fazendas Registradas",
        fieldTitles: [
            { title: "Fazendas", optSort: "name" },
            { title: "Localização", optSort: "local" },
            { title: "Valor", optSort: "valor" },
        ]
    }
};

// Define o controle de navegação das listas;
export const VIEW_MODE = {
    the_consts: 'inConsts',         // const lista inicial;
    the_resids: 'inResids',         // resid list ao clicar numa construtora;
    add_const: 'addConst',          // ao clicar "Adicionar Construtora";
    add_resid: 'addResid',          // ao clicar "Adicionar Residencial";
    select_resid: 'selectResid',    // Ao selecionar um residencial;
    select_const: 'selectConst'     // Ao "Editar" uma construtora;
};
export const VIEW_TITLE = {
    [VIEW_MODE?.the_consts]: { showBack: false, showHeader: true, theTitle: "Construtoras Registradas" },
    [VIEW_MODE?.the_resids]: { showBack: true, showHeader: true, theTitle: "" },    // theTitle definido na aplicação;
    [VIEW_MODE?.add_const]:  { showBack: true, showHeader: false, theTitle: "Adicionando Construtora..." },
    [VIEW_MODE?.add_resid]:  { showBack: true, showHeader: false, theTitle: "Adicionando Residencial..." },
    [VIEW_MODE?.select_resid]: { showBack: true, showHeader: false, theTitle: "" }, // theTitle definido na aplicação;
    [VIEW_MODE?.select_const]: { showBack: true, showHeader: false, theTitle: ""}   // theTitle definido na aplicação;
}

export const VIEW_PLACEHOLDER = {
    const: 'Pesquisar construtora...',
    resid: 'Pesquisar residencial...'
};
export const VIEW_BUTTON = {
    const: 'Nova construtora',
    resid: 'Novo residencial'
};