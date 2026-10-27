import { Link } from 'react-router'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles'
import { profile } from '@/data/profile'
import { t } from '@/i18n'
import { HeroFlow } from './HeroFlow'

const social = 'inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page">
      <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-24">
        <div>
          <h1 id="hero-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-accent">{profile.role}</p>
          <p className="mt-5 max-w-[34rem] text-muted">{t.hero.lede}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={{ hash: '#projetos' }} className={buttonPrimary}>
              {t.hero.primaryCta}
            </Link>
            <Link to={{ hash: '#contato' }} className={buttonSecondary}>
              {t.hero.secondaryCta}
            </Link>
          </div>

          <ul className="mt-6 flex gap-6">
            <li>
              <ExternalLink href={profile.contacts.github} className={social}>
                <GitHubIcon />
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.contacts.linkedin} className={social}>
                <LinkedInIcon />
                LinkedIn
              </ExternalLink>
            </li>
          </ul>
        </div>

        <HeroFlow />
      </div>
    </section>
  )
}
