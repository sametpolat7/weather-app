import logo from '../../assets/brand-logo/forecastify-logo.png'
import SearchBar from '../SearchBar/SearchBar'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="/" aria-label="Forecastify – home">
          <img src={logo} alt="Forecastify" />
        </a>
        <SearchBar />
      </div>
    </header>
  )
}
