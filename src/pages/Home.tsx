import { About } from '@/components/home/About'
import { Contact } from '@/components/home/Contact'
import { Hero } from '@/components/home/Hero'
import { OtherProjects } from '@/components/home/OtherProjects'
import { PowerPlatform } from '@/components/home/PowerPlatform'
import { Skills } from '@/components/home/Skills'
import { WebProjects } from '@/components/home/WebProjects'
import { t } from '@/i18n'
import { pageMeta } from '@/seo/meta'
import { personSchema } from '@/seo/schema'

export const meta = () =>
  pageMeta({ title: t.meta.homeTitle, description: t.meta.homeDescription, path: '/', type: 'profile', jsonLd: [personSchema()] })

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <PowerPlatform />
      <WebProjects />
      <Skills />
      <OtherProjects />
      <Contact />
    </>
  )
}
