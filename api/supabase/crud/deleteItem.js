import supabase from "../../../server/clients/supabaseClient.server.js";
import { FETCH_COLUMNS } from "../../../server/util/tablesAndColumns.js";

export default async function deleteItem(req, res) {
    const { key } = req.query;
    const { id } = req.params;

    if (!key) return res.status(400).json({ error: 'Key inválida' });
    if (!id) return res.status(400).json({ error: 'ID não informado' });

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table } = select;
    if (!table) return res.status(400).json({ error: 'Tabela Inválida' });

    try {
        const { data, error } = await supabase.from(table).delete().eq('id', Number(id)).select().maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Nenhum registro encontrado" });

        return res.status(200).json({ data });

    } catch (err) {
        console.error('deleteItem error: ', err);
        return res.status(500).json({ error: err.message });
    };
};