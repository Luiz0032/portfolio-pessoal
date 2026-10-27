import { Arrow, ArrowMarker, Box, Label } from './primitives'

const M = 'av-arrow'

const avaliacaoArchitectureLabel =
  'Arquitetura do app de avaliação: administrador, colaborador e gestor usam o app no Power Apps, que lê e grava em 9 listas do SharePoint definidas por variáveis de ambiente. O app aciona dois fluxos do Power Automate: um envia o convite pelo Outlook depois de ler o ciclo, outro exclui em cascata os dados de um ciclo.'

export function AvaliacaoArchitecture() {
  return (
    <svg viewBox="0 0 920 330" role="img" aria-label={avaliacaoArchitectureLabel} className="h-auto w-full min-w-[720px]">
      <defs>
        <ArrowMarker id={M} />
      </defs>

      <Box x={10} y={70} w={140} h={96} title="Usuários" lines={['administrador', 'colaborador', 'gestor']} />
      <Arrow d="M150 118 H194" id={M} />
      <Label x={172} y={110}>usam</Label>

      <Box x={200} y={78} w={170} h={80} title="Power Apps" lines={['app Canvas', '8 telas, 3 componentes']} accent />

      {/* Barramento: o app aciona os dois fluxos */}
      <text x={530} y={24} textAnchor="middle" className="fill-ink text-[12px] font-semibold">
        Power Automate (2 fluxos)
      </text>
      <path d="M370 118 H412 M412 66 V170" className="fill-none stroke-muted" strokeWidth={1.25} />
      <Label x={390} y={110}>aciona</Label>
      <Arrow d="M412 66 H424" id={M} />
      <Box x={430} y={40} w={200} h={52} title="Convite por e-mail" />
      <Arrow d="M412 170 H424" id={M} />
      <Box x={430} y={144} w={200} h={52} title="Excluir ciclo" />

      <Box x={700} y={40} w={200} h={52} title="Outlook" lines={['convite em cópia oculta']} />
      <Arrow d="M630 66 H694" id={M} />
      <Label x={662} y={58}>envia</Label>

      <Box x={200} y={250} w={700} h={56} title="SharePoint" lines={['9 listas: ciclos, itens, metas, respostas, colaboradores, cargos…']} store />
      <Arrow d="M285 164 V244" id={M} both />
      <Label x={292} y={210} anchor="start">lê e grava</Label>
      <Arrow d="M530 196 V244" id={M} />
      <Label x={537} y={224} anchor="start">exclui em cascata</Label>
      <Arrow d="M630 80 H665 V244" id={M} />
      <Label x={672} y={170} anchor="start">lê o ciclo</Label>

      <Box x={10} y={250} w={150} h={56} title="Variáveis de ambiente" lines={['site e listas']} />
      <Arrow d="M160 278 H194" id={M} dashed />
    </svg>
  )
}
