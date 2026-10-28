export function TagList({ items, label = 'Tecnologias' }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-chip bg-accent-soft px-2 py-0.5 text-xs text-ink">
          {item}
        </li>
      ))}
    </ul>
  )
}
