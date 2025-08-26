
export default function processTopImoveis(data) {

    const top10 = data.filter(item => typeof item?.valor === 'number').sort((a, b) => b?.valor - a?.valor).slice(0, 10);

    return top10.map(item => ({
        title: item?.name,
        value: item?.valor,
        tipo: item?.tipo?.single
    }))
}