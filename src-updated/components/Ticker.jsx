import './Ticker.css'

const items = [
  'Bubble.io', 'WordPress', 'Full Stack', 'AI Integration', 'Available',
  'Bubble.io', 'WordPress', 'Full Stack', 'AI Integration', 'Available',
]

export default function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="star">★</span>
          </span>
        ))}
      </div>
    </div>
  )
}
