
export default function processMediaLocal(data) {

    const result = {};

    for (const item of data) {

        const itemName = item?.name || "Sem nome";
        const localName = item?.local;
        const typeName = item?.tipo?.single;
        const valor = item?.valor || 0;

        if (!localName) continue;

        if (!result[localName]) {
            result[localName] = {
                localName,
                total: 0,
                totalValor: 0,
                media: valor,
                min: valor,
                max: valor,
                minName: itemName,
                maxName: itemName,
                minType: typeName,
                maxType: typeName
            };
        };

        const entry = result[localName];
        entry.total += 1;
        entry.totalValor += valor;
        entry.media = entry.totalValor / entry.total;


        if (valor < entry.min) {
            entry.min = valor;
            entry.minName = itemName;
            entry.minType = typeName;
        };

        if (valor > entry.max) {
            entry.max = valor;
            entry.maxName = itemName;
            entry.maxType = typeName;
        };
    }

    return Object.values(result);
}