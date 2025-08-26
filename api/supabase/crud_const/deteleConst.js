import supabase from "../../clients/supabaseClient.server.js";

export default async function deteleConst(req, res) {

    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "id é obrigatório" });

    try {
        const { data, error } = await supabase.from("construtoras").delete().eq('id', Number(id)).select().maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Registro não encontrado" });

        return res.status(200).json({ data });

    } catch (err) {
        console.error('deleteConst error: ', err);
        return res.status(500).json({ error: err.message });
    };
};