import { useEffect, useId, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { isCancelled, searchCities } from '../../services/openMeteo'
import { useWeather } from '../../hooks/useWeather'
import { locationLine } from '../../utils/format'

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 350

function toCity(place) {
  return {
    name: place.name,
    region: place.admin1 ?? '',
    country: place.country ?? '',
    countryCode: place.country_code ?? '',
    coords: { lat: place.latitude, lng: place.longitude },
  }
}

export default function SearchBar() {
  const { selectCity } = useWeather()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [results, setResults] = useState({ query: '', items: [] })
  const [failedQuery, setFailedQuery] = useState(null)
  const inputRef = useRef(null)
  const baseId = useId()

  const trimmed = query.trim()
  const canSearch = trimmed.length >= MIN_QUERY_LENGTH

  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) return undefined

    const controller = new AbortController()
    const timer = setTimeout(() => {
      searchCities(trimmed, controller.signal)
        .then((items) => {
          setResults({ query: trimmed, items })
          setFailedQuery(null)
        })
        .catch((err) => {
          if (!isCancelled(err)) setFailedQuery(trimmed)
        })
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [trimmed])

  const items = canSearch ? results.items : []
  const isCurrent = results.query === trimmed
  const hasFailed = failedQuery === trimmed
  const isSearching = canSearch && !isCurrent && !hasFailed
  const showDropdown = isOpen && canSearch
  const highlighted = Math.min(activeIndex, items.length - 1)

  const inputId = `${baseId}-input`
  const listboxId = `${baseId}-listbox`
  const optionId = (index) => `${baseId}-option-${index}`

  const reset = () => {
    setQuery('')
    setActiveIndex(-1)
  }

  const handleSelect = (place) => {
    selectCity(toCity(place))
    reset()
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
    setActiveIndex(-1)
    setIsOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const target = items[highlighted] ?? items[0]
    if (target) handleSelect(target)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (items.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((index) => (index + 1) % items.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((index) => (index <= 0 ? items.length - 1 : index - 1))
    }
  }

  let hint = `No places found for “${trimmed}”.`
  if (hasFailed) hint = 'Search is unavailable right now. Please try again.'
  else if (isSearching) hint = 'Searching…'

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <div className="search__field">
        <Search className="search__icon" size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          id={inputId}
          className="search__input"
          type="text"
          placeholder="Search for a city"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-activedescendant={showDropdown && highlighted >= 0 ? optionId(highlighted) : undefined}
        />
        <label className="search__label" htmlFor={inputId}>
          Search for a city
        </label>
        {query && (
          <button
            type="button"
            className="search__clear"
            aria-label="Clear search"
            onClick={() => {
              reset()
              inputRef.current?.focus()
            }}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          className={`search__dropdown${isSearching ? ' is-stale' : ''}`}
          onMouseDown={(event) => event.preventDefault()}
        >
          {items.length > 0 ? (
            <ul id={listboxId} role="listbox" aria-label="Matching places">
              {items.map((place, index) => (
                <li
                  key={place.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === highlighted}
                  className={`search__option${index === highlighted ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelect(place)}
                >
                  <span className="search__place">{place.name}</span>
                  <span className="search__meta">{locationLine(toCity(place))}</span>
                  <span className="search__coords">
                    {place.latitude.toFixed(2)}°, {place.longitude.toFixed(2)}°
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search__hint" role="status">
              {hint}
            </p>
          )}
        </div>
      )}
    </form>
  )
}
