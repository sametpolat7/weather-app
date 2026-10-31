import { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useWeather } from '../../hooks/useWeather'
import { describeWeather } from '../../utils/weather'
import { clockFrom, hourKey, roundTemp } from '../../utils/format'
import WeatherIcon from '../Shared/WeatherIcon'

export default function HourlyForecast() {
  const { forecast } = useWeather()
  const { hourly, daily } = forecast
  const trackRef = useRef(null)

  const sunEvents = useMemo(() => {
    const events = new Map()
    daily.sunrise.forEach((time) => events.set(hourKey(time), { icon: 'sunrise', label: 'Sunrise' }))
    daily.sunset.forEach((time) => events.set(hourKey(time), { icon: 'sunset', label: 'Sunset' }))
    return events
  }, [daily])

  const scrollByPage = (direction) => {
    const track = trackRef.current
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="hourly" aria-labelledby="hourly-heading">
      <h2 id="hourly-heading" className="section-title">
        Next 24 hours
      </h2>
      <div className="hourly__scroller">
        <button
          type="button"
          className="hourly__nav"
          onClick={() => scrollByPage(-1)}
          aria-label="Show earlier hours"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <ol className="hourly__track" ref={trackRef}>
          {hourly.time.map((time, index) => {
            const weather = describeWeather(hourly.weather_code[index], hourly.is_day[index])
            const sunEvent = sunEvents.get(hourKey(time))
            const rain = hourly.precipitation_probability[index] ?? 0
            return (
              <li key={time} className={`hourly__item${index === 0 ? ' is-now' : ''}`}>
                <span className="hourly__time">{index === 0 ? 'Now' : clockFrom(time)}</span>
                <WeatherIcon
                  name={sunEvent?.icon ?? weather.icon}
                  size={30}
                  title={sunEvent ? `${sunEvent.label} · ${weather.label}` : weather.label}
                />
                <span className="hourly__temp">{roundTemp(hourly.temperature_2m[index])}</span>
                <span className="hourly__rain">{rain > 0 ? `${rain}%` : ' '}</span>
              </li>
            )
          })}
        </ol>

        <button
          type="button"
          className="hourly__nav"
          onClick={() => scrollByPage(1)}
          aria-label="Show later hours"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
