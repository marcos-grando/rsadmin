
export const getValueByPath = (obj, path) => path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

export const setValueByPath = (obj, [key, ...rest], value) => {
    const clone = Array.isArray(obj) ? [...obj] : { ...obj };
    clone[key] = rest.length
        ? setValueByPath(clone[key] ?? {}, rest, value)
        : value;
    return clone;
};