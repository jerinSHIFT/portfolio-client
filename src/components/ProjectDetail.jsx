import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import './ProjectDetail.css'

export default function ProjectDetail({ title, year, tags, description, sections, liveUrl }) {
  return (
    <>
      <Navbar />
      <main className="project-detail">
        <div className="container">
          <div className="pd-back">
            <Link to="/" className="back-link">← Back to portfolio</Link>
          </div>

          <header className="pd-header">
            <div className="pd-meta">
              <div className="pd-tags">
                {tags.map(t => (
                  <span key={t} className="pd-tag">{t}</span>
                ))}
              </div>
              <span className="pd-year">{year}</span>
            </div>
            <h1 className="pd-title">{title}</h1>
            <p className="pd-lead">{description}</p>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" className="pd-live-btn">
                View Live Project ↗
              </a>
            )}
          </header>

          <div className="pd-divider" />

          <div className="pd-body">
            {sections.map((s, i) => (
              <div key={i} className="pd-section">
                {s.heading && <h2 className="pd-section-heading">{s.heading}</h2>}
                {s.text && <p className="pd-section-text">{s.text}</p>}
                {s.items && (
                  <ul className="pd-list">
                    {s.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
