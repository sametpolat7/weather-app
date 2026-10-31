import { Clock, Droplets, Thermometer, Wind } from 'lucide-react'
import { useWeather } from '../../hooks/useWeather'
import { clockFrom, compassFrom, durationFrom, roundTemp } from '../../utils/format'
import WeatherIcon from '../Shared/WeatherIcon'

function humidityNote(humidity) {
  if (humidity >= 70) return 'Humid'
  if (humidity <= 30) return 'Dry'
  return 'Comfortable'
}

export default function DetailCards() {
  const { forecast } = useWeather()
  const { current, daily } = forecast

  const cards = [
    {
      key: 'feels-like',
      label: 'Feels like',
      icon: <Thermometer size={18} aria-hidden="true" />,
      value: roundTemp(current.apparent_temperature),
      note: `Actual ${roundTemp(current.temperature_2m)}`,
    },
    {
      key: 'humidity',
      label: 'Humidity',
      icon: <Droplets size={18} aria-hidden="true" />,
      value: `${current.relative_humidity_2m}%`,
      note: humidityNote(current.relative_humidity_2m),
    },
    {
      key: 'wind',
      label: 'Wind',
      icon: <Wind size={18} aria-hidden="true" />,
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      note: `From ${compassFrom(current.wind_direction_10m)} (${Math.round(current.wind_direction_10m)}°)`,
    },
    {
      key: 'sunrise',
      label: 'Sunrise',
      icon: <WeatherIcon name="sunrise" size={18} />,
      value: clockFrom(daily.sunrise[0]),
      note: 'Local time',
    },
    {
      key: 'sunset',
      label: 'Sunset',
      icon: <WeatherIcon name="sunset" size={18} />,
      value: clockFrom(daily.sunset[0]),
      note: 'Local time',
    },
    {
      key: 'daylight',
      label: 'Daylight',
      icon: <Clock size={18} aria-hidden="true" />,
      value: durationFrom(daily.daylight_duration[0]),
      note: 'Today',
    },
  ]

  return (
    <section className="details" aria-labelledby="details-heading">
      <h2 id="details-heading" className="section-title">
        Details
      </h2>
      <ul className="details__grid">
        {cards.map((card) => (
          <li key={card.key} className="card details__card">
            <span className="details__label">
              {card.icon}
              {card.label}
            </span>
            <strong className="details__value">{card.value}</strong>
            <span className="details__note">{card.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
