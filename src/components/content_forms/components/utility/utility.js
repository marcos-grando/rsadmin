
// recebe um path para atualizar de forma dinamica o valor em formData;
// Dessa forma, seja infos: ou extradb.infos:, ou extradb.outro.info:, sempre será devidamente atualizado em setFormData;
// O argumento fnOrValue define oq será atribuido ao valor, ele recebe um valor direto ou função baseada no valor atual (para manter um array mudando apenas 1 item, por exemplo);
// => exemplo: updateWithPath(setFormData, the_path, arr => [...arr, 'file3.png']);

export function updateWithPath(setFormData, path, fnOrValue) {
    setFormData(prev => {
        const clone = structuredClone(prev);

        const keys = [...path];
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => obj[key] ??= {}, clone);

        target[lastKey] = typeof fnOrValue === 'function' ? fnOrValue(target[lastKey] ?? []) : fnOrValue;
        return clone;
    });
};
