import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './WordPress.css'

const features = [
  { title: 'Custom Theme', desc: 'Hand-built WordPress theme designed to match brand guidelines pixel by pixel.' },
  { title: 'Responsive Design', desc: 'Fully responsive layout — looks and works great on mobile, tablet, and desktop.' },
  { title: 'SEO Optimized', desc: 'Clean semantic structure and fast load times for better search rankings.' },
  { title: 'Easy Content Management', desc: 'Client can update pages, posts, and media anytime from the WordPress admin dashboard.' },
]

const techStack = ['WordPress', 'PHP', 'MySQL', 'WooCommerce', 'HTML/CSS']

export default function WordPress() {
  return (
    <>
      <Navbar />
      <main className="wp-page">
        <div className="container">
          <Link to="/" className="wp-back">← Back to portfolio</Link>

          <header className="wp-hero">
            <div className="wp-badge">WordPress · Business Website</div>
            <h1 className="wp-title">Oribuild</h1>
            <p className="wp-lead">
              A fully custom WordPress website built for Oribuild — covering theme design,
              responsive layout, and an easy-to-manage admin panel.
            </p>
            <a
              href="https://oribuild.com/"
              target="_blank"
              rel="noreferrer"
              className="wp-live-btn"
            >
              View Live Site ↗
            </a>
          </header>

          <div className="wp-divider" />

          <section className="wp-section">
            <h2 className="wp-section-title">Key Features</h2>
            <div className="wp-features-grid">
              {features.map(f => (
                <div key={f.title} className="wp-feature-card">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wp-section">
            <h2 className="wp-section-title">Tech Stack</h2>
            <div className="wp-tags">
              {techStack.map(t => (
                <span key={t} className="wp-tag">{t}</span>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
