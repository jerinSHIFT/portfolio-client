import { Link } from 'react-router-dom'
import './ProjectCard.css'

export default function ProjectCard({ number, title, liveUrl, tags, description, year, slug, imgSrc }) {
  return (
    <Link to={slug} className="project-card">
      <div className="project-card-inner">
        <div className="project-meta-left">
          <span className="project-number">preview {String(number).padStart(2, '0')}</span>
          <div className="project-img-wrap">
            {imgSrc ? (
              <img src={imgSrc} alt={title} />
            ) : (
              <div className="project-img-placeholder" />
            )}
          </div>
        </div>

        <div className="project-info">
          <div className="project-header">
            <span className="project-num-label">{String(number).padStart(2, '0')}</span>
            <h3 className="project-title">{title}</h3>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-live-link"
                onClick={e => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
          </div>
          <div className="project-tags">
            {tags.map(t => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
          <p className="project-desc">{description}</p>
          <span className="project-year">{year} →</span>
        </div>
      </div>
    </Link>
  )
}
