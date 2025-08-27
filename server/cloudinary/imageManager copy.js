// api/cloudinary/imageManager.js
import { uploadImage, deleteImage } from './upload.js';

const KEY_RX = /^([^\[\]]+)(?:\[(\d+)\])?(?:\[(\w+)\])?$/;

const parseIntents = (body) => {
    const intents = {};
    for (const [k, v] of Object.entries(body || {})) {
        const m = KEY_RX.exec(k);
        if (!m) continue;

        const [, field, idxStr, prop] = m;
        const idx = idxStr == null ? null : Number(idxStr);

        intents[field] ??= { single: null, items: new Map() };
        if (!prop) continue;

        if (idx == null) {
            intents[field].single ??= {};
            intents[field].single[prop] = v;
            continue;
        };
        const entry = intents[field].items.get(idx) ?? {};
        entry[prop] = v;
        intents[field].items.set(idx, entry);
    }
    return intents;
};

const findFile = (files, fieldname) => (files || []).find(f => f.fieldname === fieldname);

const handlers = {
    replace: async ({ file, public_id, folder }) => {
        if (!file) return null; // não faz replace sem arquivo
        const uploaded = await uploadImage(file.buffer, folder);
        if (public_id) {
            try { await deleteImage(public_id); } catch { }
        };
        return uploaded;
    },
    add: async ({ file, folder }) => file ? uploadImage(file.buffer, folder) : null,
    delete: async ({ public_id }) => { public_id && await deleteImage(public_id); return null; },
    keep: async ({ url, public_id }) => (url && public_id) ? { url, public_id } : null,
};

const runSingle = async ({ field, cfg, files, folderBase = 'generic' }) => {
    const state = cfg?.state;
    if (!state) return undefined;

    const file = findFile(files, field);
    const folder = `${folderBase}/${field}`;

    return handlers[state]?.({ file, folder, public_id: cfg.public_id, url: cfg.url });
};

const runArray = async ({ field, items, files, folderBase = 'generic' }) => {
    if (!items?.size) return undefined;

    const results = await Promise.all(
        [...items.entries()].map(async ([idx, cfg]) => {
            const state = cfg?.state;
            if (!state) return null;

            const file = findFile(files, `${field}[${idx}]`);
            const folder = `${folderBase}/${field}`;

            return handlers[state]?.({ file, folder, public_id: cfg.public_id, url: cfg.url });
        })
    );
    return results.filter(Boolean);
};

export async function imageManager(body, files, { folderBase = 'generic' } = {}) {
    const intents = parseIntents(body);
    const out = {};

    for (const [field, cfg] of Object.entries(intents)) {
        const v = await runSingle({ field, cfg: cfg.single, files, folderBase });
        if (v !== undefined) out[field] = v;
    };
    for (const [field, cfg] of Object.entries(intents)) {
        const v = await runArray({ field, items: cfg.items, files, folderBase });
        if (v !== undefined) out[field] = v;
    };

    return { data: out };
};