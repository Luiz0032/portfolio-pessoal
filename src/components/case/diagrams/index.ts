import type { ComponentType } from 'react'
import { AvaliacaoArchitecture } from './AvaliacaoArchitecture'
import { PrecontratosArchitecture } from './PrecontratosArchitecture'

// Diagrama de arquitetura de cada estudo de caso, pelo slug do projeto.
export const architectureDiagrams: Record<string, { Diagram: ComponentType; caption: string }> = {
  'gestao-precontratos': {
    Diagram: PrecontratosArchitecture,
    caption:
      'O app concentra a interação; o trabalho pesado fica nos fluxos. Eles consultam o CNPJ, montam a minuta no Word Online a partir do modelo, avisam o Teams e gravam cada documento na biblioteca com o ID do pré-contrato.',
  },
  'avaliacao-colaboradores': {
    Diagram: AvaliacaoArchitecture,
    caption:
      'Tudo roda com conectores padrão do Microsoft 365. Site e listas vêm de variáveis de ambiente, por isso a solução muda de ambiente sem editar o app.',
  },
}
