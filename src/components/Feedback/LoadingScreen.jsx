export default function LoadingScreen({ label = 'Loading…' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__bar">
        <span />
      </div>
      <p>{label}</p>
    </div>
  )
}
