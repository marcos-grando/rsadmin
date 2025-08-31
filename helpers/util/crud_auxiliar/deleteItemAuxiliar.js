import supabase from "../../clients/supabaseClient.server.js";
import { deleteImage } from "../../cloudinary/upload.js";

export function collectPublicIds(root) {
    const out = new Set();
    const seen = new WeakSet();

    const walk = (node) => {
        if (node == null) return;

        if (typeof node === 'string') {
            const s = node.trim();
            if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
                try { walk(JSON.parse(s)); } catch { }
            }
            return;
        }

        if (Array.isArray(node)) {
            for (const item of node) walk(item);
            return;
        }

        if (typeof node === 'object') {
            if (seen.has(node)) return;
            seen.add(node);

            if (typeof node.public_id === 'string' && node.public_id.trim()) out.add(node.public_id.trim());
            for (const v of Object.values(node)) walk(v);
        }
    };

    walk(root);
    return [...out];
};


export async function deleteItemAuxiliar(id, table) {
    if (!id) throw new Error("deleteItemAuxiliar não recebeu ID");
    if (!table) throw new Error("deleteItemAuxiliar não recebeu Table");

    const { data, error } = await supabase.from(table).select('*').eq('id', Number(id)).maybeSingle();

    if (error) throw error;
    if (!data) return { publicIds: [] };

    const publicIds = collectPublicIds(data);
    return { publicIds };
};

export async function deleteItemImages(publicIds = []) {
    if (!publicIds.length) return { requested: 0, deleted: 0, failed: [] };

    const results = await Promise.allSettled(publicIds.map(each => deleteImage(each)));

    let deleted = 0;
    const failed = [];
    results.forEach((r, i) => {
        if (r.status === 'fulfilled') deleted++;
        else failed.push({ public_id: publicIds[i], reason: r.reason?.message || 'unknown' });
    });

    return { requested: publicIds.length, deleted, failed };
};