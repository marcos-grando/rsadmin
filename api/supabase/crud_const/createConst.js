import supabase from '../../clients/supabaseClient.server.js';
import { uploadImage } from '../../cloudinary/upload.js';
import { slugify } from '../../util/slugText.js';

export default async function createConst(req, res) {

    const { ...fields } = req.body;

    for (const k of Object.keys(fields)) if (k.includes('[')) delete fields[k];

    try {
        if (req.files.logo?.[0]) {
            const logo = await uploadImage(req.files.logo[0].buffer, 'construtoras/logo');
            fields.logo = logo;
        };

        const fieldsWithSlug = { ...fields, slug: slugify(fields?.name) };

        const { data, error } = await supabase.from("construtoras").insert([{ ...fieldsWithSlug }]);
        if (error) throw error;

        return res.status(201).json({ data });
    } catch (err) {

        console.error('createConst error: ', err);
        return res.status(500).json({ error: err.message });
    };
};