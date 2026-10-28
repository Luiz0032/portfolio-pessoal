import { profile } from '@/data/profile'
import { t } from '@/i18n'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/ui/Icons'

const linkClass = 'inline-flex items-center gap-2 text-muted transition-colors hover:text-accent'

export function Footer() {
  return (
    <footer className="mt-section border-t border-line print:hidden">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{profile.name}</span>
          <br />
          {t.footer.location}
        </p>

        <nav aria-label={t.footer.contactsLabel}>
          <ul className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
            <li>
              <ExternalLink href={profile.contacts.github} className={linkClass}>
                <GitHubIcon />
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.contacts.linkedin} className={linkClass}>
                <LinkedInIcon />
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <a href={`mailto:${profile.contacts.email}`} className={linkClass}>
                <MailIcon />
                {profile.contacts.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
