// MANTER SINCRONIZADO COM "src/utilities/util/theMasterKeys.js";
// 'crud' precisa estar sincronizado com formData's respectivos;
export const FETCH_COLUMNS = {
    // Infos do Dashboard
    home_infos: {
        table: 'items',
        columns: ['id', 'name', 'valor', 'bairro', 'cidade', 'tipo:types (id, name, single)', 'construtora:construtoras (id, name)']
    },
    // listas de imóveis
    all_items: {
        table: 'view_all_items_withypes',
        columns: ['id', 'name', 'tipo', 'local', 'valor']
    },
    all_consts: {
        table: 'view_construtoras_content',
        columns: ['*']
    },
    geral_types: {
        table: 'view_all_items_withypes',
        columns: ['*']
    },

    // dados de imóvel único
    select_resid: {
        table: 'items',
        columns: ['*', 'tipo:types (id, name)', 'construtora:construtoras (id, name)']
    },
    update_resid: {
        table: 'items',
        columns: ['type_id', 'name', 'construtora_id', 'valor', 'logo', 'local', 'longitude', 'latitude', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'extradb', 'status_id', 'thumb']
    },

    select_const: {
        table: 'construtoras',
        columns: ['id', 'name', 'logo', 'items_count']
    },
    update_const: {
        table: 'construtoras',
        columns: ['id', 'name', 'slug', 'logo']
    },
}