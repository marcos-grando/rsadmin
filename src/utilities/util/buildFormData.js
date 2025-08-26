
export const buildLogicFiles = (key, val, fd, name, arr) => {

    if (!val) return false;

    if (typeof val === "object" && "public_id" in val) {
        const { url, public_id, title, desc } = val;

        // Criate file
        if (url instanceof File && !public_id) {
            fd.append(key, url);
            fd.append(`${name}[state]`, "add");
        };

        // Enviar arquivo para alteração de imagem/"url" (excluindo imagem do Clouinary também)
        if (url instanceof File && public_id) {
            fd.append(key, url);
            fd.append(`${name}[public_id]`, public_id);
            fd.append(`${name}[state]`, "replace");
        };

        // Excluindo imagem do Cloudinary
        if (url === undefined) {
            fd.append(`${name}[public_id]`, public_id);
            fd.append(`${name}[state]`, "delete");
            return true;
        };

        // Apenas mantém
        if (typeof url === "string") {
            fd.append(`${name}[url]`, url);
            fd.append(`${name}[public_id]`, public_id);
            fd.append(`${name}[state]`, "keep");
        };

        if (arr) {
            fd.append(`${name}[title]`, title ?? "");
            fd.append(`${name}[desc]`, desc ?? "");
        };
        return true;
    };

    if (val instanceof File) {
        fd.append(key, val);
        fd.append(`${name}[state]`, 'add');
        if (arr) {
            fd.append(`${name}[title]`, '');
            fd.append(`${name}[desc]`, '');
        }
        return true;
    }

    return false;
};


// Constrói o FormData para enviar ao hook -> api;
// aqui vai lidar com as diversas variantes de tipo (file, array, objeto aninhado, etc);
export const buildFormData = (fd, data, root = '') => {

    Object.entries(data).forEach(([key, val]) => {

        if (val == null || val === '') return;
        const name = root ? `${root}[${key}]` : key;

        if (key === 'extradb') {
            fd.append('extradb', JSON.stringify(val));
            return;
        };

        // Array de Files / Array de Object Files
        if (['aptoimg', 'condimg', 'plantimg'].includes(key) && Array.isArray(val)) {
            val.forEach((item, idx) => {
                const itemName = `${name}[${idx}]`;
                const handled = buildLogicFiles(key, item, fd, itemName, true);
                if (handled) return;
            });
            return;
        };

        // File avulso / Object de File avulso
        const handled = buildLogicFiles(key, val, fd, name, false);
        if (handled) return;

        if (Array.isArray(val)) {           // Arrays de strings
            val.forEach(v => fd.append(name, v));
            return;
        };
        if (typeof val === 'object') {      // Objetos genéricos (details)
            buildFormData(fd, val, name);
            return;
        };

        fd.append(name, val); // Primitivos
    });
};

