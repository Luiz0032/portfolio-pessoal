import { Section } from '@/components/ui/Section'
import { TagList } from '@/components/ui/TagList'
import { skills } from '@/data/skills'
import { t } from '@/i18n'

export function Skills() {
  return (
    <Section id="habilidades" title={t.skills.title} intro={t.skills.intro}>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.area}>
            <h3 className="mb-3 text-sm font-semibold">{group.area}</h3>
            <TagList items={group.items} label={group.area} />
          </div>
        ))}
      </div>
    </Section>
  )
}
