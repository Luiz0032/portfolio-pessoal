import { Arrow, ArrowMarker, Box, Label } from './primitives'

const M = 'pc-arrow'

// Colunas: pessoas | app e dados | fluxos do Power Automate | serviços e documentos.
const flows = [
  { title: 'Consultar CNPJ', y: 40 },
  { title: 'Gerar prévia em PDF', y: 102 },
  { title: 'Gerar minuta jurídica', y: 164 },
  { title: 'Notificar no Teams', y: 226 },
  { title: 'Salvar anexos', y: 288 },
  { title: 'Finalizar contrato', y: 350 },
]

const precontratosArchitectureLabel =
  'Arquitetura do app de pré-contratos: Comercial e Jurídico usam o app no Power Apps, que lê e grava em 5 listas do SharePoint e no Dataverse e aciona 6 fluxos do Power Automate. Os fluxos consultam a API CNPJa, geram minuta e prévia no Word Online a partir da biblioteca ModelosContrato, postam no canal do Teams da obra e gravam documentos na biblioteca DocumentosPreContratos.'

export function PrecontratosArchitecture() {
  return (
    <svg viewBox="0 0 980 410" role="img" aria-label={precontratosArchitectureLabel} className="h-auto w-full min-w-[760px]">
      <defs>
        <ArrowMarker id={M} />
      </defs>

      <Box x={10} y={180} w={130} h={80} title="Usuários" lines={['Comercial', 'Jurídico']} />
      <Arrow d="M140 220 H184" id={M} />
      <Label x={162} y={212}>usam</Label>

      <Box x={190} y={40} w={170} h={70} title="SharePoint" lines={['5 listas', 'pré-contratos, cláusulas…']} store />
      <Box x={190} y={170} w={170} h={100} title="Power Apps" lines={['app Canvas', '9 telas, 3 componentes']} accent />
      <Box x={190} y={330} w={170} h={64} title="Dataverse" lines={['clientes e fornecedores']} store />
      <Arrow d="M275 116 V164" id={M} both />
      <Label x={282} y={144} anchor="start">lê e grava</Label>
      <Arrow d="M275 276 V324" id={M} both />
      <Label x={282} y={304} anchor="start">lê e grava</Label>

      {/* Barramento: o app aciona cada fluxo */}
      <text x={530} y={24} textAnchor="middle" className="fill-ink text-[12px] font-semibold">
        Power Automate (6 fluxos)
      </text>
      <path d="M360 220 H405 M405 62 V372" className="fill-none stroke-muted" strokeWidth={1.25} />
      <Label x={382} y={212}>aciona</Label>
      {flows.map((flow) => (
        <g key={flow.title}>
          <Arrow d={`M405 ${flow.y + 22} H424`} id={M} />
          <Box x={430} y={flow.y} w={200} h={44} title={flow.title} />
        </g>
      ))}

      <Box x={700} y={40} w={200} h={44} title="API CNPJa" />
      <Arrow d="M630 62 H694" id={M} />
      <Label x={662} y={55}>consulta</Label>

      <Box x={700} y={102} w={200} h={106} title="Word Online" lines={['modelo em ModelosContrato', 'gera minuta e PDF']} />
      <Arrow d="M630 124 H694" id={M} />
      <Arrow d="M630 186 H694" id={M} />

      <Box x={700} y={226} w={200} h={44} title="Teams" lines={['canal da obra']} />
      <Arrow d="M630 248 H694" id={M} />
      <Label x={662} y={241}>posta</Label>

      <Box x={700} y={288} w={200} h={106} title="DocumentosPreContratos" lines={['biblioteca', 'arquivos com o ID do registro']} store />
      <Arrow d="M630 310 H694" id={M} />
      <Arrow d="M630 372 H694" id={M} />
      <Arrow d="M900 155 H935 V341 H906" id={M} />
      <Label x={950} y={248} rotate={90}>grava minuta e PDF</Label>
    </svg>
  )
}
