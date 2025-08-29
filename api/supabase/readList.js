import supabase from '../clients/supabaseClient.server.js';
import { FETCH_COLUMNS } from '../util/tablesAndColumns.js';

export default async function readList(req, res) {
    const { key } = req.query;

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table, columns } = select;

    if (!table) return res.status(400).json({ error: 'Tabela inválida' });
    if (!Array.isArray(columns) || columns.length === 0) {
        return res.status(400).json({ error: 'Nenhuma coluna válida' });
    };

    try {
        const { data, error } = await supabase.from(table).select(columns.join(','));
        if (error) throw error;
        res.status(200).json({ data });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    };
};