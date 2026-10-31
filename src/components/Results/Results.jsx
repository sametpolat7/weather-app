import { useWeather } from '../../hooks/useWeather'
import CurrentWeather from '../CurrentWeather/CurrentWeather'
import HourlyForecast from '../HourlyForecast/HourlyForecast'
import DailyForecast from '../DailyForecast/DailyForecast'
import DetailCards from '../DetailCards/DetailCards'
import LoadingScreen from '../Feedback/LoadingScreen'
import ErrorPanel from '../Feedback/ErrorPanel'

export default function Results() {
  const { city, forecast, status, error, retry } = useWeather()

  if (!forecast) {
    return status === 'error' ? (
      <ErrorPanel message={error} onRetry={retry} />
    ) : (
      <LoadingScreen label={`Loading the forecast for ${city.name}…`} />
    )
  }

  const isRefreshing = status === 'loading'

  return (
    <div className={`results${isRefreshing ? ' is-refreshing' : ''}`} aria-busy={isRefreshing}>
      {status === 'error' && <ErrorPanel message={error} onRetry={retry} variant="banner" />}
      <CurrentWeather />
      <HourlyForecast />
      <div className="results__grid">
        <DailyForecast />
        <DetailCards />
      </div>
    </div>
  )
}
