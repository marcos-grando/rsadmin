
export default function processMediaConst(data) {

    const result = {};

    for (const item of data) {
        
        const itemName = item?.name || "Sem nome";
        const constName = item?.construtora?.name;
        const typeName = item?.tipo?.single;
        const valor = item?.valor || 0;

        if (!constName) continue;

        if (!result[constName]) {
            result[constName] = {
                constName,
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

        const entry = result[constName];
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
