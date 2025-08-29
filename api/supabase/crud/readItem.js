import supabase from "../../../server/clients/supabaseClient.server.js";
import { readAuxiliar } from "../../../server/util/crud_auxiliar/readItemAuxiliar.js";
import { FETCH_COLUMNS } from "../../../server/util/tablesAndColumns.js";

export default async function readItem(req, res) {
    const { key } = req.query;
    const { id } = req.params;

    if (!key) return res.status(400).json({ error: 'Key inválida' });
    if (!id) return res.status(400).json({ error: 'ID não informado' });

    const select = FETCH_COLUMNS[key];
    if (!select) return res.status(400).json({ error: 'Recurso inválido' });

    const { table } = select;
    if (!table) return res.status(400).json({ error: 'Tabela Inválida' });
    if (!Array.isArray(columns) || columns.length === 0) {
        return res.status(400).json({ error: 'Nenhuma coluna válida' });
    };

    try {
        const { data, error } = await supabase.from(table).select(columns.join(',')).eq('id', Number(id)).maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Registro não encontrado" });

        const payload = readAuxiliar(data, key);

        return res.status(200).json({ data: payload });

    } catch (err) {
        console.error(`${key} error: `, err);
        return res.status(500).json({ error: err.message });
    };
};