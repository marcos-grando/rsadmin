// MANTER SINCRONIZADO COM "src/utilities/util/theMasterKeys.js";

import { KEY_CREATE_CONST, KEY_CREATE_RESID, KEY_DELETE_CONST, KEY_DELETE_RESID, KEY_SELECT_CONST, KEY_SELECT_RESID, KEY_UPDATE_CONST, KEY_UPDATE_RESID } from "../../shared/theMasterKeys.js";

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


    
    [KEY_DELETE_RESID]: {
        table: 'items'
    },
    [KEY_CREATE_RESID]: {
        table: 'items'
    },
    [KEY_SELECT_RESID]: {
        table: 'items',
        columns: ['*', 'tipo:types (id, name)', 'construtora:construtoras (id, name)']
    },
    [KEY_UPDATE_RESID]: {
        table: 'items',
        columns: ['type_id', 'name', 'construtora_id', 'valor', 'logo', 'local', 'longitude', 'latitude', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'extradb', 'status_id', 'thumb']
    },


    [KEY_DELETE_CONST]: {
        table: 'construtoras'
    },
    [KEY_CREATE_CONST]: {
        table: 'construtoras'
    },
    [KEY_SELECT_CONST]: {
        table: 'construtoras',
        columns: ['id', 'name', 'logo', 'items_count']
    },
    [KEY_UPDATE_CONST]: {
        table: 'construtoras',
        columns: ['id', 'name', 'slug', 'logo']
    },
}