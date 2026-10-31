import { useWeather } from '../../hooks/useWeather'
import { describeWeather } from '../../utils/weather'
import { clockFrom, roundTemp, weekdayFrom } from '../../utils/format'
import WeatherIcon from '../Shared/WeatherIcon'

export default function DailyForecast() {
  const { forecast } = useWeather()
  const { daily } = forecast

  const weekMin = Math.min(...daily.temperature_2m_min)
  const weekMax = Math.max(...daily.temperature_2m_max)
  const span = Math.max(weekMax - weekMin, 1)

  return (
    <section className="daily card" aria-labelledby="daily-heading">
      <h2 id="daily-heading" className="section-title">
        7-day forecast
      </h2>
      <ol className="daily__list">
        {daily.time.map((date, index) => {
          const { label, icon } = describeWeather(daily.weather_code[index])
          const low = daily.temperature_2m_min[index]
          const high = daily.temperature_2m_max[index]
          const rain = daily.precipitation_probability_mean[index] ?? 0
          const rangeStyle = {
            left: `${((low - weekMin) / span) * 100}%`,
            width: `${Math.max(((high - low) / span) * 100, 4)}%`,
          }

          return (
            <li key={date} className="daily__row">
              <span className="daily__day">{index === 0 ? 'Today' : weekdayFrom(date)}</span>
              <span className="daily__icon">
                <WeatherIcon name={icon} size={26} title={label} />
                {rain > 0 && <small>{rain}%</small>}
              </span>
              <span className="daily__low">
                <span className="visually-hidden">Low </span>
                {roundTemp(low)}
              </span>
              <span className="daily__bar" aria-hidden="true">
                <span style={rangeStyle} />
              </span>
              <span className="daily__high">
                <span className="visually-hidden">High </span>
                {roundTemp(high)}
              </span>
              <span className="daily__sun">
                <WeatherIcon name="sunrise" size={16} title="Sunrise" />
                {clockFrom(daily.sunrise[index])}
                <WeatherIcon name="sunset" size={16} title="Sunset" />
                {clockFrom(daily.sunset[index])}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
