import logo from '../../assets/brand-logo/forecastify-logo.png'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../Shared/SocialIcons'

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/sametpolat7/', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://www.instagram.com/sametpolat7/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://github.com/sametpolat7', label: 'GitHub', Icon: GithubIcon },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="Forecastify" />
          <span>© {new Date().getFullYear()} Forecastify</span>
        </div>
        <p className="footer__credit">
          Weather data by{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo
          </a>
        </p>
        <nav className="footer__links" aria-label="Social links">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
              <Icon />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
