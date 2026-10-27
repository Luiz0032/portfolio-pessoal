import { Link } from 'react-router'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/ui/Icons'
import { Section } from '@/components/ui/Section'
import { buttonPrimary, buttonSecondary, textLink } from '@/components/ui/styles'
import { profile } from '@/data/profile'
import { t } from '@/i18n'

export function Contact() {
  return (
    <Section id="contato" title={t.contact.title} intro={t.contact.body}>
      <p className="text-lg font-semibold break-all select-all md:text-2xl">{profile.contacts.email}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${profile.contacts.email}`} className={buttonPrimary}>
          <MailIcon />
          {t.contact.sendEmail}
        </a>
        <ExternalLink href={profile.contacts.linkedin} className={buttonSecondary}>
          <LinkedInIcon />
          LinkedIn
        </ExternalLink>
        <ExternalLink href={profile.contacts.github} className={buttonSecondary}>
          <GitHubIcon />
          GitHub
        </ExternalLink>
      </div>
      <p className="mt-6 text-sm">
        <Link to="/curriculo" className={textLink}>
          {t.contact.resume}
        </Link>
      </p>
    </Section>
  )
}
