import { CloudOff, RefreshCw } from 'lucide-react'

export default function ErrorPanel({ message, onRetry, variant = 'panel' }) {
  const isBanner = variant === 'banner'

  return (
    <div className={`error${isBanner ? ' error--banner' : ' card'}`} role="alert">
      {!isBanner && <CloudOff className="error__icon" size={40} aria-hidden="true" />}
      <div className="error__body">
        <h2>{isBanner ? 'Couldn’t refresh the forecast' : 'Couldn’t load the forecast'}</h2>
        <p>{message}</p>
      </div>
      <button type="button" className="btn" onClick={onRetry}>
        <RefreshCw size={16} aria-hidden="true" />
        Try again
      </button>
    </div>
  )
}
