
export default function processQntdConst(data) {

    const result = {};

    for (const item of data) {

        const constName = item?.construtora?.name;

        if (!constName) continue;

        if (!result[constName]) {
            result[constName] = {
                title: constName,
                total: 0
            };
        };

        const entry = result[constName];
        entry.total += 1;
    }

    return Object.values(result);
}