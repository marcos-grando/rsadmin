const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Ao mover o mapa retorna (lng, lat), encontrando o CEP via geocoding;
// Valor do CEP é enviado para fetchAddressByCep();
export async function reverseGeocode(lng, lat) {

    const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    if (!res.ok) throw new Error('Erro ao fazer reverse geocode');
    const data = await res.json();

    const address = {
        cep: '',
        // bairro: '',
        // cidade: '',
        // estado: ''
    };

    // Retornar apenas CEP para evitar conflitos com os dados do ViaCep;
    // Exemplo de conflitos: region =/= uf;
    data.features?.forEach(f => {
        if (f.place_type.includes('postcode')) address.cep = f.text;
        // if (f.place_type.includes('neighborhood')) address.bairro = f.text;
        // if (f.place_type.includes('place')) address.cidade = f.text;
        // if (f.place_type.includes('region')) address.estado = f.text;
    });

    return address;
}

// Recebe o valor do CEP e retorna dados do endereço através do ViaCep;
// Por fim, seus valores são usados no formData;
export async function fetchAddressByCep(cep) {

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!res.ok) throw new Error('Erro ao buscar CEP via ViaCEP');
    const data = await res.json();

    if (data.erro) throw new Error('CEP inválido');

    return {
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
    };
}