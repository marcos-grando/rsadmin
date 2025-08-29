import supabase from "../clients/supabaseClient.server.js";
import { FETCH_COLUMNS } from "../util/tablesAndColumns.js";

export default async function readTypeList(req, res) {
    const { key } = req.query;
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table, columns } = select;

    if (!table) return res.status(400).json({ error: 'Tabela inválida' });
    if (!Array.isArray(columns) || columns.length === 0) {
        return res.status(400).json({ error: 'Nenhuma coluna válida' });
    };


    try {
        const { data, error } = await supabase.from(table).select(columns.join(',')).eq('type_id', Number(id));

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Registro não encontrado" });

        return res.status(200).json({ data });
    } catch (err) {
        console.error('readTypeList error: ', err);
        return res.status(500).json({ error: err.message });
    };
};