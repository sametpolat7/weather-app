import { useCallback, useEffect, useMemo, useState } from 'react'
import { WeatherContext } from './WeatherContext'
import { describeError, fetchForecast, isCancelled } from '../services/openMeteo'

const STORAGE_KEY = 'forecastify:city'

const DEFAULT_CITY = {
  name: 'Çanakkale',
  region: 'Çanakkale',
  country: 'Türkiye',
  countryCode: 'TR',
  coords: { lat: 40.1555, lng: 26.4127 },
}

const storage = {
  read() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY))
    } catch {
      return null
    }
  },
  write(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      return false
    }
    return true
  },
}

function loadSavedCity() {
  const saved = storage.read()
  if (saved?.name && Number.isFinite(saved.coords?.lat) && Number.isFinite(saved.coords?.lng)) {
    return saved
  }
  return DEFAULT_CITY
}

export default function WeatherProvider({ children }) {
  const [city, setCity] = useState(loadSavedCity)
  const [forecast, setForecast] = useState(null)
  const [forecastCity, setForecastCity] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchForecast(city.coords, controller.signal)
      .then((result) => {
        setForecast(result)
        setForecastCity(city)
        setError(null)
        setStatus('success')
      })
      .catch((err) => {
        if (isCancelled(err)) return
        setError(describeError(err))
        setStatus('error')
      })

    return () => controller.abort()
  }, [city, attempt])

  useEffect(() => {
    storage.write(city)
  }, [city])

  const selectCity = useCallback((nextCity) => {
    setStatus('loading')
    setCity(nextCity)
  }, [])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((count) => count + 1)
  }, [])

  const value = useMemo(
    () => ({ city, forecast, forecastCity, status, error, selectCity, retry }),
    [city, forecast, forecastCity, status, error, selectCity, retry],
  )

  return <WeatherContext value={value}>{children}</WeatherContext>
}
