import {
  Cloudy,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react'

const ICONS = {
  clear: Sun,
  'clear-night': Moon,
  'partly-cloudy': CloudSun,
  'partly-cloudy-night': CloudMoon,
  cloudy: Cloudy,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  showers: CloudRainWind,
  snow: CloudSnow,
  thunderstorm: CloudLightning,
  sunrise: Sunrise,
  sunset: Sunset,
}

export default function WeatherIcon({ name, size = 32, title, className = '' }) {
  const Icon = ICONS[name] ?? Cloudy
  const classes = ['wicon', `wicon--${name}`, className].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      title={title}
    >
      <Icon size={size} strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}
