
export const FORM_SUBMIT = {
    new_const: { title: "Registrar Construtora", loading: "Registrando..." },
    new_resid: { title: "Registrar Residencial", loading: "Registrando..." },
    alter_const: { title: "Salvar Alterações", loading: "Salvando..." },
    alter_resid: { title: "Salvar Alterações", loading: "Salvando..." }
};

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
        title: 'Vamos finalizar o Anúncio?',
        opt_step: { opt: 'Finalizando', step: 7 },
        is_back: true, is_next: false
    }
};
// build FormData new_resid;
export const FORM_RESID_FORMDATA = {
    // Principal
    type_id: 1, // Futuramente deverá herdar da página carregada (casas, terrenos, etc...)
    name: '',
    construtora_id: null, // herda da lista (da construtora clicada)
    valor: '',
    logo: { url: null, public_id: null },

    // Junta bairro + cidade na api (não tem input);
    local: '',

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
        aptoimg: [],  // "title" / "desc"
        condimg: [],  // "title" / "desc"
        plantimg: [], // "title" / "desc"

        // Detalhes
        details: { dorms: { min: '1', max: '2' }, banheiros: { min: '1', max: '2' }, garagens: { min: '0', max: '2' } },
    },
    status_id: null,

    // Final
    thumb: { url: null, public_id: null }
}

// ======== { Nova Construtora } ========
// Step new_const;
export const FORM_STEP_UNIQUE = [
    {
        the_label: 'Construtora',
        the_type: 'text',
        the_path: ['name'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.name ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: false,
            placeholder: 'Ex: "AMC", "RDO", etc...'
        })
    },
    {
        the_label: 'Logotipo',
        the_type: 'file_unique',
        the_path: ['logo', 'url'],
        inputProps: (_, updateFunc) => ({
            onChange: e => updateFunc(e.target.files[0]),
            required: false,
            disabled: false,
            placeholder: 'Selecione a imagem do logo'
        })
    }
];
// build FormData new_const;
export const FORM_CONST_FORMDATA = {
    name: '',
    logo: { url: null, public_id: null },
};


// Ok, mas olha, veja se minha idéia está errada ou se a aplicação dela, com o buildFormData, está errado:

// No frontend, enquanto o "useState formData" é preenchido a estrutura deverá ficar algo assim:

// formData = {
//     // Files
//     aptoimg: [File, File, ...],  // 'array files'
//     condimg: [File, File, ...],  // 'array files'
//     plantimg: [File, ...], // 'array files'
//     extradb: {
//         aptoinfo: [], // tags
//         condinfo: [], // tags
//         plantinfo: [],// tags
//         aptoimg: [{ title: "", desc: "" }, { title: "", desc: "" }, ...],  // "title" / "desc"
//         condimg: [{ title: "", desc: "" }, { title: "", desc: "" }, ...],  // "title" / "desc"
//         plantimg: [{ title: "", desc: "" }, ...], // "title" / "desc"
//     },
//     ...,
// };

// Daí, o backend vai receber, enviar para o Cloudinary, e transforma cada File em um objeto com { url: "", public_id: "", title: "", desc: "" } para enviar para o Supabase, com a seguinte estrutura:
// formData = {
//     // Files
//     extradb: {
//         aptoinfo: [], // tags
//         condinfo: [], // tags
//         plantinfo: [],// tags
//         aptoimg: [{ url: "", public_id: "", title: "", desc: "" }, { url: "", public_id: "", title: "", desc: "" }, ...],  // 'array files'
//         condimg: [{ url: "", public_id: "", title: "", desc: "" }, { url: "", public_id: "", title: "", desc: "" }, ...],  // 'array files'
//         plantimg: [{ url: "", public_id: "", title: "", desc: "" }, ...], // 'array files'
//     },
//     ...,
// };

// E com o buildFormData, a ideia foi préconstruir o que deveria chegar no backend. Ou seja, enviando








// Essa é a intenção da API de criação. Porém, na parte de "update", ou seja, alteração, a ideia seria ler esses dados, recebendo o objeto direto do Supabase e populando o useState formData, porém acaba ficando assim: