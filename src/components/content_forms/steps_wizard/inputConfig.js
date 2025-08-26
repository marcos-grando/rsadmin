
// updateFunc é declarada em TypesInputs.jsx, basicamente faz a atualização do estado formData (um objeto) na chave correta com o 'value' do input;

const placeholder = 'Centralize o endereço no Mapa';
export const STEPS_WIZARD_RESID = {
    STEP_1: [
        {
            the_label: 'Nome',
            the_type: 'text',
            the_path: ['name'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.name ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: false,
                placeholder: 'Ex: Mirante das Flores'
            })
        },
        {
            the_label: 'Tipo',
            the_type: 'select',
            the_path: ['type_id'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.type_id ?? '',
                // onChange: e => updateFunc(e.target.value),
                onChange: val => updateFunc(val),
                required: true,
                disabled: true
            })
        },
        {
            the_label: 'Construtora',
            the_type: 'select',
            the_path: ['construtora_id'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.construtora_id ?? '',
                // onChange: e => updateFunc(e.target.value),
                onChange: val => updateFunc(val),
                required: true,
                disabled: true
            })
        },
        {
            the_label: 'Valor',
            the_type: 'text',
            the_path: ['valor'],
            inputProps: (formData, updateFunc) => {
                const raw = String(formData?.valor ?? '');
                const formatted = (parseFloat(raw || 0)).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
                return {
                    value: formatted,
                    onChange: e => {
                        const onlyDigits = e.target.value.replace(/\D/g, '');
                        const asNumber = Number(onlyDigits) / 100;
                        updateFunc(asNumber);
                    },
                    required: false,
                    disabled: false,
                    inputMode: 'numeric',
                    placeholder: 'Ex: 480000.00'
                };
            }
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
    ],
    STEP_2: [
        {
            the_label: 'CEP',
            the_type: 'text',
            the_path: ['cep'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.cep ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        },
        {
            the_label: 'Longitude',
            the_type: 'text',
            the_path: ['longitude'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.longitude ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        },
        {
            the_label: 'Latitude',
            the_type: 'text',
            the_path: ['latitude'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.latitude ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        },
        {
            the_label: 'Rua',
            the_type: 'text',
            the_path: ['rua'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.rua ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        },
        {
            the_label: 'Bairro',
            the_type: 'text',
            the_path: ['bairro'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.bairro ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        },
        {
            the_label: 'Cidade',
            the_type: 'text',
            the_path: ['cidade'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.cidade ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        },
        {
            the_label: 'Estado',
            the_type: 'text',
            the_path: ['estado'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.estado ?? '',
                onChange: e => updateFunc(e.target.value),
                required: true,
                disabled: true,
                placeholder: placeholder
            })
        }
    ],
    STEP_3: [
        {
            the_label: 'Situação',
            the_type: 'select',
            the_path: ['status_id'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.status_id ?? '',
                onChange: val => updateFunc(val),
                required: true,
                disabled: false
            })
        },
        {
            the_label: 'Nº min de dormitórios',
            the_type: 'number',
            the_path: ['extradb', 'details', 'dorms', 'min'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.extradb?.details?.dorms?.min ?? '',
                onChange: e => updateFunc(e.target.value),
                required: false,
                disabled: false,
                placeholder: 'Ex: 1',
                step: 1
            })
        },
        {
            the_label: 'Nº máx de dormitórios',
            the_type: 'number',
            the_path: ['extradb', 'details', 'dorms', 'max'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.extradb?.details?.dorms?.max ?? '',
                onChange: e => updateFunc(e.target.value),
                required: false,
                disabled: false,
                placeholder: 'Ex: 4',
                step: 1
            })
        },
        {
            the_label: 'Nº min de banheiros',
            the_type: 'number',
            the_path: ['extradb', 'details', 'banheiros', 'min'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.extradb?.details?.banheiros?.min ?? '',
                onChange: e => updateFunc(e.target.value),
                required: false,
                disabled: false,
                placeholder: 'Ex: 1',
                step: 1
            })
        },
        {
            the_label: 'Nº máx de banheiros',
            the_type: 'number',
            the_path: ['extradb', 'details', 'banheiros', 'max'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.extradb?.details?.banheiros?.max ?? '',
                onChange: e => updateFunc(e.target.value),
                required: false,
                disabled: false,
                placeholder: 'Ex: 3',
                step: 1
            })
        },
        {
            the_label: 'Nº min de garagens',
            the_type: 'number',
            the_path: ['extradb', 'details', 'garagens', 'min'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.extradb?.details?.garagens?.min ?? '',
                onChange: e => updateFunc(e.target.value),
                required: false,
                disabled: false,
                placeholder: 'Ex: 1',
                step: 1
            })
        },
        {
            the_label: 'Nº máx de garagens',
            the_type: 'number',
            the_path: ['extradb', 'details', 'garagens', 'max'],
            inputProps: (formData, updateFunc) => ({
                value: formData?.extradb?.details?.garagens?.max ?? '',
                onChange: e => updateFunc(e.target.value),
                required: false,
                disabled: false,
                placeholder: 'Ex: 2',
                step: 1
            })
        }
    ],
    STEP_4: {
        tags: {
            the_label: 'Detalhes de apartamento(s)',
            the_placeholder: ' Ex: "Churrasqueira", "Piso cerâmico", etc',
            the_path: ['extradb', 'aptoinfo'],
            isRequired: false,
            isDisable: false
        },
        file: {
            the_label: 'Imagens do interior de apartamento(s)',
            the_placeholder: ' Ex: Selecione uma ou mais imagens dos apartamentos',
            the_path: ['aptoimg'],
            the_pathInfos: ['extradb', 'aptoimg'],
            isRequired: false,
            isDisable: false
        }
    },
    STEP_5: {
        tags: {
            the_label: 'Detalhes do condomínio',
            the_placeholder: ' Ex: "Piscina", "Salão de festas", etc',
            the_path: ['extradb', 'condinfo'],
            isRequired: false,
            isDisable: false
        },
        file: {
            the_label: 'Imagens do condomínio',
            the_placeholder: ' Ex: Selecione uma ou mais imagens do condomínio',
            the_path: ['condimg'],
            the_pathInfos: ['extradb', 'condimg'],
            isRequired: false,
            isDisable: false
        }
    },
    STEP_6: {
        tags: {
            the_label: 'Detalhes das plantas',
            the_placeholder: ' Ex: "2 Plantas Apto c/ 2 dorms", "1 Planta duplex", etc',
            the_path: ['extradb', 'plantinfo'],
            isRequired: false,
            isDisable: false
        },
        file: {
            the_label: 'Imagens das plantas',
            the_placeholder: ' Ex: Selecione uma ou mais imagens das plantas',
            the_path: ['plantimg'],
            the_pathInfos: ['extradb', 'plantimg'],
            isRequired: false,
            isDisable: false
        }
    },
    STEP_7: [
        {
            the_label: 'Envie a imagem da Thumbnail para o anúncio',
            the_type: 'file_unique',
            the_path: ['thumb', 'url'],
            inputProps: (_, updateFunc) => ({
                onChange: e => updateFunc(e.target.files[0]),
                required: true,
                disabled: false,
                placeholder: 'Selecione a imagem principal do anúncio'
            })
        }
    ],
}

export const STEP_1 = [
    {
        the_label: 'Nome',
        the_type: 'text',
        the_path: ['name'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.name ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: false,
            placeholder: 'Ex: Mirante das Flores'
        })
    },
    {
        the_label: 'Tipo',
        the_type: 'select',
        the_path: ['type_id'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.type_id ?? '',
            // onChange: e => updateFunc(e.target.value),
            onChange: val => updateFunc(val),
            required: true,
            disabled: true
        })
    },
    {
        the_label: 'Construtora',
        the_type: 'select',
        the_path: ['construtora_id'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.construtora_id ?? '',
            // onChange: e => updateFunc(e.target.value),
            onChange: val => updateFunc(val),
            required: true,
            disabled: true
        })
    },
    {
        the_label: 'Valor',
        the_type: 'text',
        the_path: ['valor'],
        inputProps: (formData, updateFunc) => {
            const raw = String(formData?.valor ?? '');
            const formatted = (parseFloat(raw || 0)).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            return {
                value: formatted,
                onChange: e => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    const asNumber = Number(onlyDigits) / 100;
                    updateFunc(asNumber);
                },
                required: false,
                disabled: false,
                inputMode: 'numeric',
                placeholder: 'Ex: 480000.00'
            };
        }
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

// const placeholder = 'Centralize o endereço no Mapa';
export const STEP_2 = [
    {
        the_label: 'CEP',
        the_type: 'text',
        the_path: ['cep'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.cep ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    },
    {
        the_label: 'Longitude',
        the_type: 'text',
        the_path: ['longitude'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.longitude ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    },
    {
        the_label: 'Latitude',
        the_type: 'text',
        the_path: ['latitude'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.latitude ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    },
    {
        the_label: 'Rua',
        the_type: 'text',
        the_path: ['rua'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.rua ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    },
    {
        the_label: 'Bairro',
        the_type: 'text',
        the_path: ['bairro'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.bairro ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    },
    {
        the_label: 'Cidade',
        the_type: 'text',
        the_path: ['cidade'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.cidade ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    },
    {
        the_label: 'Estado',
        the_type: 'text',
        the_path: ['estado'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.estado ?? '',
            onChange: e => updateFunc(e.target.value),
            required: true,
            disabled: true,
            placeholder: placeholder
        })
    }
];

export const STEP_3 = [
    {
        the_label: 'Situação',
        the_type: 'select',
        the_path: ['status_id'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.status_id ?? '',
            onChange: val => updateFunc(val),
            required: true,
            disabled: false
        })
    },
    {
        the_label: 'Nº min de dormitórios',
        the_type: 'number',
        the_path: ['extradb', 'details', 'dorms', 'min'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.extradb?.details?.dorms?.min ?? '',
            onChange: e => updateFunc(e.target.value),
            required: false,
            disabled: false,
            placeholder: 'Ex: 1',
            step: 1
        })
    },
    {
        the_label: 'Nº máx de dormitórios',
        the_type: 'number',
        the_path: ['extradb', 'details', 'dorms', 'max'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.extradb?.details?.dorms?.max ?? '',
            onChange: e => updateFunc(e.target.value),
            required: false,
            disabled: false,
            placeholder: 'Ex: 4',
            step: 1
        })
    },
    {
        the_label: 'Nº min de banheiros',
        the_type: 'number',
        the_path: ['extradb', 'details', 'banheiros', 'min'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.extradb?.details?.banheiros?.min ?? '',
            onChange: e => updateFunc(e.target.value),
            required: false,
            disabled: false,
            placeholder: 'Ex: 1',
            step: 1
        })
    },
    {
        the_label: 'Nº máx de banheiros',
        the_type: 'number',
        the_path: ['extradb', 'details', 'banheiros', 'max'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.extradb?.details?.banheiros?.max ?? '',
            onChange: e => updateFunc(e.target.value),
            required: false,
            disabled: false,
            placeholder: 'Ex: 3',
            step: 1
        })
    },
    {
        the_label: 'Nº min de garagens',
        the_type: 'number',
        the_path: ['extradb', 'details', 'garagens', 'min'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.extradb?.details?.garagens?.min ?? '',
            onChange: e => updateFunc(e.target.value),
            required: false,
            disabled: false,
            placeholder: 'Ex: 1',
            step: 1
        })
    },
    {
        the_label: 'Nº máx de garagens',
        the_type: 'number',
        the_path: ['extradb', 'details', 'garagens', 'max'],
        inputProps: (formData, updateFunc) => ({
            value: formData?.extradb?.details?.garagens?.max ?? '',
            onChange: e => updateFunc(e.target.value),
            required: false,
            disabled: false,
            placeholder: 'Ex: 2',
            step: 1
        })
    }
];

export const STEP_4 = {
    tags: {
        the_label: 'Detalhes de apartamento(s)',
        the_placeholder: ' Ex: "Churrasqueira", "Piso cerâmico", etc',
        the_path: ['extradb', 'aptoinfo'],
        isRequired: false,
        isDisable: false
    },
    file: {
        the_label: 'Imagens do interior de apartamento(s)',
        the_placeholder: ' Ex: Selecione uma ou mais imagens dos apartamentos',
        the_path: ['aptoimg'],
        the_pathInfos: ['extradb', 'aptoimg'],
        isRequired: false,
        isDisable: false
    }
};

export const STEP_5 = {
    tags: {
        the_label: 'Detalhes do condomínio',
        the_placeholder: ' Ex: "Piscina", "Salão de festas", etc',
        the_path: ['extradb', 'condinfo'],
        isRequired: false,
        isDisable: false
    },
    file: {
        the_label: 'Imagens do condomínio',
        the_placeholder: ' Ex: Selecione uma ou mais imagens do condomínio',
        the_path: ['condimg'],
        the_pathInfos: ['extradb', 'condimg'],
        isRequired: false,
        isDisable: false
    }
};

export const STEP_6 = {
    tags: {
        the_label: 'Detalhes das plantas',
        the_placeholder: ' Ex: "2 Plantas Apto c/ 2 dorms", "1 Planta duplex", etc',
        the_path: ['extradb', 'plantinfo'],
        isRequired: false,
        isDisable: false
    },
    file: {
        the_label: 'Imagens das plantas',
        the_placeholder: ' Ex: Selecione uma ou mais imagens das plantas',
        the_path: ['plantimg'],
        the_pathInfos: ['extradb', 'plantimg'],
        isRequired: false,
        isDisable: false
    }
};

export const STEP_7 = [
    {
        the_label: 'Envie a imagem da Thumbnail para o anúncio',
        the_type: 'file_unique',
        the_path: ['thumb', 'url'],
        inputProps: (_, updateFunc) => ({
            onChange: e => updateFunc(e.target.files[0]),
            required: true,
            disabled: false,
            placeholder: 'Selecione a imagem principal do anúncio'
        })
    }
];


export const STEP_FETCH = {
    the_status: {
        the_text: 'Revise todas as informações e clique em "Criar Novo Item".',
        the_error: 'Ops, ocorreu um erro...',
        the_error_2: 'Erro ocorrido: ',
        the_error_3: 'Por favor, relate o problema à administração!'
    }
};