import { useEffect } from 'react'
import { useWeather } from '../../hooks/useWeather'
import { describeWeather } from '../../utils/weather'
import { clockFrom, locationLine, roundTemp } from '../../utils/format'
import weatherBackgrounds from '../../assets/weather-background/weatherBackgrounds'
import WeatherIcon from '../Shared/WeatherIcon'

export default function CurrentWeather() {
  const { forecast, forecastCity: city } = useWeather()
  const { current, daily, hourly } = forecast
  const { label, icon, background } = describeWeather(current.weather_code, current.is_day)
  const rainChance = hourly.precipitation_probability[0] ?? 0

  useEffect(() => {
    document.title = `${city.name} · Forecastify`
  }, [city.name])

  return (
    <section
      className="current"
      style={{ backgroundImage: `url(${weatherBackgrounds[background]})` }}
      aria-labelledby="current-heading"
    >
      <div className="current__overlay">
        <div className="current__location">
          <h1 id="current-heading">{city.name}</h1>
          <p>{locationLine(city)}</p>
        </div>

        <div className="current__main">
          <WeatherIcon name={icon} size={72} className="current__icon" />
          <div>
            <p className="current__temp">{roundTemp(current.temperature_2m)}</p>
            <p className="current__condition">{label}</p>
          </div>
        </div>

        <div className="current__footer">
          <dl className="current__stats">
            <div>
              <dt>High</dt>
              <dd>{roundTemp(daily.temperature_2m_max[0])}</dd>
            </div>
            <div>
              <dt>Low</dt>
              <dd>{roundTemp(daily.temperature_2m_min[0])}</dd>
            </div>
            <div>
              <dt>Rain chance</dt>
              <dd>{rainChance}%</dd>
            </div>
          </dl>
          <p className="current__updated">Updated {clockFrom(current.time)} local time</p>
        </div>
      </div>
    </section>
  )
}
