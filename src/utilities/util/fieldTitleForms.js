


// ======== { Novo Residencial } ========
// Steps new_resid;
export const FORM_FIELD_STEPS = {
    1: {
        title: 'Informações Básicas:',
        opt_step: { opt: 'Básico', step: 1 },
        is_back: false, is_next: true
    },
    2: {
        title: 'Informações de Endereço:',
        opt_step: { opt: 'Endereço', step: 2 },
        is_back: true, is_next: true
    },
    3: {
        title: 'Detalhes Importantes:',
        opt_step: { opt: 'Detalhes', step: 3 },
        is_back: true, is_next: true
    },
    4: {
        title: 'Informações dos Apartamentos:',
        opt_step: { opt: 'Aptos', step: 4 },
        is_back: true, is_next: true
    },
    5: {
        title: 'Informação do Condomínio:',
        opt_step: { opt: 'Condomínio', step: 5 },
        is_back: true, is_next: true
    },
    6: {
        title: 'Informações das Plantas:',
        opt_step: { opt: 'Plantas', step: 6 },
        is_back: true, is_next: true
    },
    7: {
        title: 'Prévia e objeto do imóvel',
        opt_step: { opt: 'Finalizando', step: 7 },
        is_back: true, is_next: false
    }
};
// build FormData new_resid;
export const FORM_RESID_FORMDATA = {
    // Principal
    type_id: null,
    name: '',
    construtora_id: null, // opção fictícia escolhida no próprio formulário
    valor: '',
    logo: { url: null },

    // localização
    longitude: '',
    latitude: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',

    // Files
    aptoimg: [],  // 'array files'
    condimg: [],  // 'array files'
    plantimg: [], // 'array files'
    extradb: {
        aptoinfo: [], // tags
        condinfo: [], // tags
        plantinfo: [],// tags

        // Detalhes
        details: { dorms: { min: '1', max: '2' }, banheiros: { min: '1', max: '2' }, garagens: { min: '0', max: '2' } },
    },
    status_id: null,

    // Final
    thumb: { url: null }
}
