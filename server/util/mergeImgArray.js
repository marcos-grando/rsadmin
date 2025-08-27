
// junta array file com array metadados correspondente em extradb;
export function mergeImgArray(arrayFromFrontend, imgsFromCloudinary = []) {
    const meta = Array.isArray(arrayFromFrontend) ? arrayFromFrontend : [];
    const arr = Array.isArray(imgsFromCloudinary) ? imgsFromCloudinary : [];
    const max = Math.max(meta.length, arr.length);
    const out = [];

    for (let i = 0; i < max; i++) {
        const img = arr[i];
        const metaI = meta[i] || {};

        if (img === null || metaI.state === 'delete') continue;

        if (img?.url && img?.public_id) {
            out.push({
                url: img.url, public_id: img.public_id, title: metaI.title || '', desc: metaI.desc || ''
            });
            continue;
        };

        if ((!img || img == null) && metaI.url && metaI.public_id) {
            out.push({
                url: metaI.url, public_id: metaI.public_id, title: metaI.title || '', desc: metaI.desc || ''
            });
        };
    };

    return out;
};
