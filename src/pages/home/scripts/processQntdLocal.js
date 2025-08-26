
export default function processQntdConst(data) {

    const result = {};

    for (const item of data) {

        const localName = item?.local;

        if (!localName) continue;

        if (!result[localName]) {
            result[localName] = {
                title: localName,
                total: 0
            };
        };

        const entry = result[localName];
        entry.total += 1;
    }

    return Object.values(result);
}