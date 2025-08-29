import { uploadImage, deleteImage } from './upload.js';

const KEY_RX = /^([^\[\]]+)(?:\[(\d+)\])?(?:\[(\w+)\])?$/;

const parseIntents = (body) => {
    const intents = {};

    // 1) Suporta formato com colchetes: logo[0][state], logo[state], etc.
    for (const [k, v] of Object.entries(body || {})) {
        const m = KEY_RX.exec(k);
        if (!m) {
            console.log(`imageManager.js, parseIntents, !m; k: `, k);
            continue;
        }

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
    };

    // 2) Suporta formato ANINHADO: body.logo = { state, public_id, url } ou array de objetos
    for (const [field, val] of Object.entries(body || {})) {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
            const maybe = {};
            if ('state' in val) maybe.state = val.state;
            if ('public_id' in val) maybe.public_id = val.public_id;
            if ('url' in val) maybe.url = val.url;
            if (Object.keys(maybe).length) {
                intents[field] ??= { single: null, items: new Map() };
                intents[field].single = { ...(intents[field].single || {}), ...maybe };
            };
        };
        if (Array.isArray(val)) {
            val.forEach((item, idx) => {
                if (item && typeof item === 'object') {
                    const maybe = {};
                    if ('state' in item) maybe.state = item.state;
                    if ('public_id' in item) maybe.public_id = item.public_id;
                    if ('url' in item) maybe.url = item.url;
                    if (Object.keys(maybe).length) {
                        intents[field] ??= { single: null, items: new Map() };
                        const prev = intents[field].items.get(idx) || {};
                        intents[field].items.set(idx, { ...prev, ...maybe });
                    };
                };
            });
        };
    };

    return intents;
};

const findFile = (files, field, idx = null) => {
    const candidates = (files || []).filter(f => f.fieldname === field);
    return idx == null ? (candidates[0] || null) : (candidates[idx] || null);
};
const handlers = {
    replace:
        async ({ file, public_id, folder }) => {
            
            if (!file) return null; // não faz replace sem arquivo
            const uploaded = await uploadImage(file.buffer, folder);

            if (public_id) {
                try {
                    await deleteImage(public_id);
                } catch (err) {
                    console.log('imageManager.js, handlers, deleteImage failed, err: ', err)
                };
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

    const needsFile = state === 'add' || state === 'replace';
    const file = needsFile ? findFile(files, field) : null;
    if (needsFile && !file) console.log("imageManager.js, runSingle, !file");

    const folder = `${folderBase}/${field}`;

    return handlers[state]?.({ file, folder, public_id: cfg.public_id, url: cfg.url });
};

const runArray = async ({ field, items, files, folderBase = 'generic' }) => {
    if (!items?.size) return undefined;

    const candidates = (files || []).filter(f => f.fieldname === field);
    let cursor = 0;

    const results = await Promise.all(
        [...items.entries()].sort(([a], [b]) => a - b).map(async ([idx, cfg]) => {
            const state = cfg?.state;
            if (!state) return null;

            const needsFile = state === 'add' || state === 'replace';
            const file = needsFile && candidates[cursor] ? candidates[cursor++] : null;
            if (needsFile && !file) console.log("imageManager.js, runArray, !file");

            const folder = `${folderBase}/${field}`;
            return handlers[state]?.({ file, folder, public_id: cfg.public_id, url: cfg.url });
        })
    );
    return results;
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