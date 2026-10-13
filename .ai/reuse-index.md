# Recursos reutilizáveis

- `src/utilities/hooks/useObjectURL.js`: prévia de Blob/File com criação e revogação do endereço local. Consumidores: FileUnique, FilePreviewItem, CardExample e Simulator.
- `src/utilities/util/simulatorModel.js`: validação de imagens e etapas, montagem do objeto em memória e serialização dos arquivos como metadados. Consumidores: formulário, seletores de arquivo e resultado; testes em tests/simulator.test.js.
- `src/components/content_forms/components/utility/utility.js`: atualização imutável de um caminho no objeto do formulário.
- `src/components/content_forms/steps_wizard/FormStepWizard.jsx`: fluxo de sete etapas a partir de inputConfig.js; responsável pela validação e navegação.
- `src/utilities/contexts/ContextMessage.jsx`: avisos temporários para validação, limites e resultado da cópia.
