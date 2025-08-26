import supabase from '../../clients/supabaseClient.server.js';
import { imageManager } from '../../cloudinary/imageManager.js';
import { mergeImgArray } from '../../util/mergeImgArray.js';

const parseArr = v => (typeof v === 'string' ? JSON.parse(v || '[]') : (Array.isArray(v) ? v : []));
const parseObj = v => (typeof v === 'string' ? JSON.parse(v || '{}') : (v && typeof v === 'object' ? v : {}));

export default async function createResid(req, res) {
    const {
        aptoimg: aptoimgRaw,
        condimg: condimgRaw,
        plantimg: plantimgRaw,
        extradb: extradbRaw,
        ...fields
    } = req.body;

    const obsExtradb = parseObj(extradbRaw);
    const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();

    try {
        const { data: imgs } = await imageManager(req.body, files, { folderBase: `residenciais` });

        if (imgs?.logo) fields.logo = imgs.logo;
        if (imgs?.thumb) fields.thumb = imgs.thumb;

        const mergedExtradb = {
            ...obsExtradb,
            aptoimg: mergeImgArray(parseArr(aptoimgRaw), imgs?.aptoimg),
            condimg: mergeImgArray(parseArr(condimgRaw), imgs?.condimg),
            plantimg: mergeImgArray(parseArr(plantimgRaw), imgs?.plantimg),
        };

        if (fields.bairro && fields.cidade) {
            fields.local = `${fields.bairro}, ${fields.cidade}`;
        };

        const payload = { ...fields, extradb: mergedExtradb, };


        const { data, error } = await supabase.from('items').insert([payload]).select();
        if (error) throw error;

        return res.status(201).json({ data });

    } catch (err) {
        console.error('createResid error:', err);
        return res.status(500).json({ error: err.message });
    };
};
