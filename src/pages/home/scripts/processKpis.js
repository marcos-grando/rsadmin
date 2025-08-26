
export default function processkpis(data) {

    const total = data.length;

    const constContador = {};
    const typeContador = {};
    const cityContador = {};

    let topConst = "", topConstItems = 0;
    let topType = "", topTypeItems = 0;
    let topCity = "", topCityItems = 0;

    let maxValue = null;
    let minValue = null;

    for (const item of data) {

        const { valor, name, construtora, tipo, local } = item;

        if (!maxValue || valor > maxValue?.valor) {
            maxValue = { valor: valor, constName: construtora?.name, itemName: name };
        }
        if (valor > 0 && (!minValue || valor < minValue?.valor)) {
            minValue = { valor: valor, constName: construtora?.name, itemName: name };
        }

        const constName = construtora?.name;
        if (constName) {
            constContador[constName] = (constContador[constName] || 0) + 1;
            if (constContador[constName] > topConstItems) {
                topConst = constName;
                topConstItems = constContador[constName];
            }
        }

        const typeName = tipo?.name;
        if (typeName) {
            typeContador[typeName] = (typeContador[typeName] || 0) + 1;
            if (typeContador[typeName] > topTypeItems) {
                topType = typeName;
                topTypeItems = typeContador[typeName];
            }
        }

        if (local) {
            cityContador[local] = (cityContador[local] || 0) + 1;
            if (cityContador[local] > topCityItems) {
                topCity = local;
                topCityItems = cityContador[local];
            }
        }
    };

    const brlFormat = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };

    const result = [
        {
            title: "Total de Imóveis",
            primary: `${total} Registros`,
            secondary: `${topTypeItems} são ${topType}`
        },
        {
            title: "Total de Construtoras",
            primary: `${Object.keys(constContador).length} Construtoras`,
            secondary: `${topConst} (${topConstItems} imóveis)`
        },
        {
            title: "Total de Cidades",
            primary: `${Object.keys(cityContador).length} Cidades`,
            secondary: `${topCity} (${topCityItems} imóveis)`
        },
        {
            title: "Maior Preço",
            primary: `${brlFormat(maxValue?.valor)}`,
            secondary: `${maxValue?.itemName}`
        },
        {
            title: "Menor Preço",
            primary: `${brlFormat(minValue?.valor)}`,
            secondary: `${minValue?.itemName}`
        },
    ]

    return result;
}