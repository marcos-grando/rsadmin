import supabase from "../../clients/supabaseClient.server.js";
import { imageManager } from "../../cloudinary/imageManager.js";
import { mergeImgArray } from "../../util/mergeImgArray.js";
import { FETCH_COLUMNS } from "../../util/tablesAndColumns.js";

const parseArr = v => (typeof v === 'string' ? JSON.parse(v || '[]') : (Array.isArray(v) ? v : []));
const parseObj = v => (typeof v === 'string' ? JSON.parse(v || '{}') : (v && typeof v === 'object' ? v : {}));

export default async function updateResid(req, res) {
    const { key } = req.query;
    const { id } = req.params;
    const {
        aptoimg: aptoimgRaw,
        condimg: condimgRaw,
        plantimg: plantimgRaw,
        extradb: extradbRaw,
        ...fieldsUpdate
    } = req.body;

    if (!id) return res.status(400).json({ error: 'ID não informado' });
    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });
    const { table, columns } = select;
    if (!table) return res.status(400).json({ error: 'Tabela inválida' });

    const obsExtradb = parseObj(extradbRaw);
    const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();

    try {
        const { data: imgs } = await imageManager(req.body, files, { folderBase: 'residenciais' });

        if (imgs?.logo) fieldsUpdate.logo = imgs.logo;
        if (imgs?.thumb) fieldsUpdate.thumb = imgs.thumb;

        const mergedExtradb = {
            ...obsExtradb,
            aptoimg: mergeImgArray(parseArr(aptoimgRaw), imgs?.aptoimg),
            condimg: mergeImgArray(parseArr(condimgRaw), imgs?.condimg),
            plantimg: mergeImgArray(parseArr(plantimgRaw), imgs?.plantimg),
        };

        if (fieldsUpdate.bairro && fieldsUpdate.cidade) {
            fieldsUpdate.local = `${fieldsUpdate.bairro}, ${fieldsUpdate.cidade}`;
        };

        let payload = { ...fieldsUpdate, extradb: mergedExtradb, };

        for (const k of Object.keys(payload)) {
            if (k.includes('[')) delete payload[k];
        };
        payload = Object.fromEntries(
            Object.entries(payload).filter(([k]) => columns.includes(k))
        );
        if (!columns?.length || !Object.keys(payload).length) {
            return res.status(400).json({ error: 'Nenhuma coluna válida' });
        };


        const { data, error } = await supabase.from(table).update(payload).eq('id', Number(id)).select().maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Registro não encontrado" });

        return res.status(200).json({ data });

    } catch (err) {
        console.error('updateResid error: ', err);
        return res.status(500).json({ error: err.message });
    };
};