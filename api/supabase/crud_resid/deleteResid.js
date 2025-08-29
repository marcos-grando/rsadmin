import supabase from "../../clients/supabaseClient.server.js";

export default async function deleteResid(req, res) {
    
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "id é obrigatório" });

        const { data, error } = await supabase.from("items").delete().eq('id', Number(id)).select().maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Nenhum registro encontrado" });

        return res.status(200).json({ data });

    } catch (err) {
        console.error('deleteResid error: ', err);
        return res.status(500).json({ error: err.message });
    };
};