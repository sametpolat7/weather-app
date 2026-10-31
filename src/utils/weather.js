const CONDITIONS = [
  { codes: [0], label: 'Clear sky', icon: 'clear', background: 'sunny' },
  { codes: [1], label: 'Mainly clear', icon: 'partly-cloudy', background: 'sunny' },
  { codes: [2], label: 'Partly cloudy', icon: 'partly-cloudy', background: 'cloudy' },
  { codes: [3], label: 'Overcast', icon: 'cloudy', background: 'cloudy' },
  { codes: [45, 48], label: 'Fog', icon: 'fog', background: 'fog' },
  { codes: [51], label: 'Light drizzle', icon: 'drizzle', background: 'rainy' },
  { codes: [53], label: 'Drizzle', icon: 'drizzle', background: 'rainy' },
  { codes: [55], label: 'Dense drizzle', icon: 'drizzle', background: 'rainy' },
  { codes: [56, 57], label: 'Freezing drizzle', icon: 'drizzle', background: 'rainy' },
  { codes: [61], label: 'Light rain', icon: 'rain', background: 'rainy' },
  { codes: [63], label: 'Rain', icon: 'rain', background: 'rainy' },
  { codes: [65], label: 'Heavy rain', icon: 'rain', background: 'rainy' },
  { codes: [66, 67], label: 'Freezing rain', icon: 'rain', background: 'rainy' },
  { codes: [71], label: 'Light snow', icon: 'snow', background: 'snowy' },
  { codes: [73], label: 'Snow', icon: 'snow', background: 'snowy' },
  { codes: [75], label: 'Heavy snow', icon: 'snow', background: 'snowy' },
  { codes: [77], label: 'Snow grains', icon: 'snow', background: 'snowy' },
  { codes: [80], label: 'Light showers', icon: 'showers', background: 'rainy' },
  { codes: [81], label: 'Showers', icon: 'showers', background: 'rainy' },
  { codes: [82], label: 'Heavy showers', icon: 'showers', background: 'rainy' },
  { codes: [85, 86], label: 'Snow showers', icon: 'snow', background: 'snowy' },
  { codes: [95], label: 'Thunderstorm', icon: 'thunderstorm', background: 'thunderstorm' },
  { codes: [96, 99], label: 'Thunderstorm with hail', icon: 'thunderstorm', background: 'thunderstorm' },
]

const UNKNOWN = { label: 'Unknown', icon: 'cloudy', background: 'cloudy' }

const BY_CODE = new Map(
  CONDITIONS.flatMap((condition) => condition.codes.map((code) => [code, condition])),
)

const NIGHT_ICONS = { clear: 'clear-night', 'partly-cloudy': 'partly-cloudy-night' }
const CALM_ICONS = new Set(['clear', 'partly-cloudy', 'cloudy', 'fog'])

export function describeWeather(code, isDay = 1) {
  const { label, icon, background } = BY_CODE.get(code) ?? UNKNOWN
  if (isDay === 0) {
    return {
      label,
      icon: NIGHT_ICONS[icon] ?? icon,
      background: CALM_ICONS.has(icon) ? 'night' : background,
    }
  }
  return { label, icon, background }
}
