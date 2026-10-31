export const clockFrom = (isoLocal) => isoLocal.slice(11, 16)

export const hourKey = (isoLocal) => isoLocal.slice(0, 13)

export function weekdayFrom(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'short' })
}

export function durationFrom(seconds) {
  const minutes = Math.round(seconds / 60)
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

export function compassFrom(degrees) {
  const points = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return points[Math.round(degrees / 45) % points.length]
}

export const roundTemp = (value) => `${Math.round(value)}°`

export function locationLine({ name, region, country }) {
  const parts = []
  if (region && region.localeCompare(name, undefined, { sensitivity: 'base' }) !== 0) {
    parts.push(region)
  }
  if (country) parts.push(country)
  return parts.join(', ')
}
