import supabase from "../../clients/supabaseClient.server.js";
import { FETCH_COLUMNS } from "../../util/tablesAndColumns.js";
import { imageManager } from '../../cloudinary/imageManager.js';
import { slugify } from '../../util/slugText.js';

export default async function updateConst(req, res) {
    const { key } = req.query;
    const { id } = req.params;
    const fieldsUpdate = req.body;

    if (!id) return res.status(400).json({ error: 'ID não informado' });

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table, columns } = select;
    if (!table) return res.status(400).json({ error: 'Tabela inválida' });

    const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();

    
    try {
        const { data: imgs } = await imageManager(req.body, files, { folderBase: 'construtoras' });

        let payload = { ...fieldsUpdate, ...imgs };
        if (payload?.name) payload.slug = slugify(payload.name);

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
        console.error('updateConst error: ', err);
        return res.status(500).json({ error: err.message });
    };
};