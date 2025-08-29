
export function readAuxiliar(item, key) {

    let payload;
    if (key === 'select_resid') {
        const extradb = item.extradb || {};
        payload = {
            ...item,
            aptoimg: Array.isArray(extradb.aptoimg) ? extradb.aptoimg : [],
            condimg: Array.isArray(extradb.condimg) ? extradb.condimg : [],
            plantimg: Array.isArray(extradb.plantimg) ? extradb.plantimg : [],
            extradb: {
                ...extradb,
                aptoimg: [],
                condimg: [],
                plantimg: [],
            },
        };

        return payload;
    };

    return item;
};