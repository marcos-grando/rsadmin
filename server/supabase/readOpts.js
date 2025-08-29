import supabase from '../../helpers/clients/supabaseClient.server.js';

export default async function listSelectOpts(req, res) {
    try {
        const [typesRes, construtorasRes, statusRes] = await Promise.all([
            supabase.from('types').select('id, name').order('id', { ascending: true }),
            supabase.from('construtoras').select('id, name').order('id', { ascending: true }),
            supabase.from('status').select('id, name').order('id', { ascending: true })
        ]);

        const types = typesRes.data;
        const errorTypes = typesRes.error;

        const construtoras = construtorasRes.data;
        const errorConstrutoras = construtorasRes.error;

        const status = statusRes.data;
        const errorStatus = statusRes.error;

        if (errorTypes || errorConstrutoras || errorStatus) {
            return res.status(500).json({
                error: 'Erro ao buscar dados',
                detail: errorTypes?.message || errorConstrutoras?.message || errorStatus?.message
            });
        }

        res.status(200).json({ types, construtoras, status });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro inesperado', detail: err.message });
    }
}
