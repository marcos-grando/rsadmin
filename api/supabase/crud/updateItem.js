import supabase from "../../clients/supabaseClient.server.js";
import { extratReqBody, organizedFields } from "../../util/crud_auxiliar/createAndUpdateAuxiliar.js";
import { FETCH_COLUMNS } from "../../util/tablesAndColumns.js";

export default async function updateItem(req, res) {
    const { key } = req.query;
    const { id } = req.params;

    if (!key) return res.status(400).json({ error: 'Key inválida' });
    if (!id) return res.status(400).json({ error: 'ID não informado' });

    const { theFields } = extratReqBody(req.body, key);
    if (theFields?.fields) {
        for (const k of Object.keys(theFields.fields)) if (k.includes('[')) delete theFields.fields[k];
    };

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table, columns } = select;
    if (!table) return res.status(400).json({ error: 'Tabela Inválida' });

    const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();

    try {
        let payload = await organizedFields(req.body, theFields, files, key);

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
        console.error('updateItem error: ', err);
        return res.status(500).json({ error: err.message });
    };
};