import supabase from "../../../helpers/clients/supabaseClient.server.js";
import { extratReqBody, organizedFields } from "../../../helpers/util/crud_auxiliar/createAndUpdateAuxiliar.js";
import { FETCH_COLUMNS } from "../../../helpers/util/tablesAndColumns.js";

export default async function createItem(req, res) {
    const { key } = req.query;
    if (!key) return res.status(400).json({ error: 'Key inválida' });

    const { theFields } = extratReqBody(req.body, key);
    if (theFields?.fields) {
        for (const k of Object.keys(theFields.fields)) if (k.includes('[')) delete theFields.fields[k];
    };

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table } = select;
    if (!table) return res.status(400).json({ error: 'Tabela Inválida' });

    const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();

    try {
        const payload = await organizedFields(req.body, theFields, files, key);

        const { data, error } = await supabase.from(table).insert(payload).select();
        if (error) throw error;

        return res.status(201).json({ data });
        
    } catch (err) {
        console.error('createItem error: ', err);
        return res.status(500).json({ error: err.message });
    };
};