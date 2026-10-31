import axios from 'axios'

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

const FORECAST_FIELDS = {
  timezone: 'auto',
  forecast_hours: 24,
  current:
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
  hourly: 'temperature_2m,precipitation_probability,weather_code,is_day',
  daily:
    'temperature_2m_max,temperature_2m_min,precipitation_probability_mean,weather_code,sunrise,sunset,daylight_duration',
}

export async function fetchForecast({ lat, lng }, signal) {
  const { data } = await axios.get(FORECAST_URL, {
    params: { latitude: lat, longitude: lng, ...FORECAST_FIELDS },
    signal,
  })
  return data
}

export async function searchCities(query, signal) {
  const { data } = await axios.get(GEOCODING_URL, {
    params: { name: query, count: 6, language: 'en', format: 'json' },
    signal,
  })
  return data.results ?? []
}

export const isCancelled = (error) => axios.isCancel(error)

export function describeError(error) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'You appear to be offline. Check your connection and try again.'
  }
  if (error?.response) {
    return `The weather service responded with an error (HTTP ${error.response.status}).`
  }
  return 'Could not reach the weather service. Please try again in a moment.'
}
