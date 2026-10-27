import { Link } from 'react-router'

export function EscolhaDirecao() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 font-sans">
      <h1 className="text-2xl font-semibold">Direções visuais do portfólio</h1>
      <p className="mt-2 text-neutral-600">Página temporária da Fase 1. Abra cada direção e alterne o tema no canto superior.</p>
      <ul className="mt-6 space-y-3">
        <li>
          <Link className="underline" to="/direcao-a">Direção A: Fluxo</Link>
        </li>
        <li>
          <Link className="underline" to="/direcao-b">Direção B: Ficha</Link>
        </li>
      </ul>
    </main>
  )
}
