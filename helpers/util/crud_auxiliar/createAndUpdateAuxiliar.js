import { KEY_CREATE_CONST, KEY_CREATE_RESID, KEY_UPDATE_CONST, KEY_UPDATE_RESID } from "../../../shared/theMasterKeys.js";
import { imageManager } from "../../cloudinary/imageManager.js";
import { mergeImgArray } from "../mergeImgArray.js";
import { slugify } from "../slugText.js";

const parseArr = v => (typeof v === 'string' ? JSON.parse(v || '[]') : (Array.isArray(v) ? v : []));
const parseObj = v => (typeof v === 'string' ? JSON.parse(v || '{}') : (v && typeof v === 'object' ? v : {}));

// Retorna a desestruturação correta do req.body para cada tipo 
export function extratReqBody(reqBody, key) {

    if (key === KEY_CREATE_RESID || key === KEY_UPDATE_RESID) { //'create/update_resid'
        const {
            aptoimg: aptoimgRaw,
            condimg: condimgRaw,
            plantimg: plantimgRaw,
            extradb: extradbRaw,
            ...fields
        } = reqBody;

        return { theFields: { fields, aptoimgRaw, condimgRaw, plantimgRaw, extradbRaw } };
    };

    if (key === KEY_CREATE_CONST || key === KEY_UPDATE_CONST) { //'create/update_const'
        const { ...fields } = reqBody;
        return { theFields: { fields } };
    };

    throw new Error("Key inválida");
};

// Retorna o payload com a estrutura correta para insert de cada tipo
export async function organizedFields(reqBody, theFields, files, key) {

    if (key === KEY_CREATE_RESID || key === KEY_UPDATE_RESID) { //'create/update_resid'
        const obsExtradb = parseObj(theFields?.extradbRaw);

        const theFolderBase = theFields?.fields?.name ? `residenciais/${theFields.fields.name}` : 'residenciais';
        const { data: imgs } = await imageManager(reqBody, files, { folderBase: theFolderBase });

        // if (imgs?.logo) theFields.fields.logo = imgs.logo;
        if ('logo' in imgs) { theFields.fields.logo = imgs.logo ?? null; };
        if ('thumb' in imgs) { theFields.fields.thumb = imgs.thumb ?? null; };

        const mergedExtradb = {
            ...obsExtradb,
            aptoimg: mergeImgArray(parseArr(theFields?.aptoimgRaw), imgs?.aptoimg),
            condimg: mergeImgArray(parseArr(theFields?.condimgRaw), imgs?.condimg),
            plantimg: mergeImgArray(parseArr(theFields?.plantimgRaw), imgs?.plantimg),
        };

        const payload = { ...theFields?.fields, extradb: mergedExtradb };
        if (payload?.bairro && payload?.cidade) {
            payload.local = `${payload?.bairro}, ${payload?.cidade}`;
        };

        return payload;
    };

    if (key === KEY_CREATE_CONST || key === KEY_UPDATE_CONST) { //'create/update_const'

        const theFolderBase = theFields?.fields?.name ? `construtoras/${theFields.fields.name}` : 'construtoras';
        const { data: imgs } = await imageManager(reqBody, files, { folderBase: theFolderBase });

        if (imgs?.logo) theFields.fields.logo = imgs.logo;

        const payload = { ...theFields?.fields };
        if (payload?.name) payload.slug = slugify(payload.name);

        return payload;
    };

    throw new Error("Key inválida");
};