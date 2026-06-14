import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import './Home.css'

const projects = [
  {
    number: 1,
    title: 'DocFusion',
    liveUrl: null,
    tags: ['Full Stack', 'Doctor Appointment System'],
    description: 'A complete doctor appointment management system featuring Bangali specialists, real-time search & filtering, an animated booking flow, and automated email & SMS confirmation for every patient appointment.',
    year: '2026',
    slug: '/doctor-appointment',
    imgSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  },
  {
    number: 2,
    title: 'VLSI Chip Design',
    liveUrl: null,
    tags: ['Hardware', 'Academic'],
    description: 'CMOS chip layouts designed in DSCH3 & Microwind; simulated and analyzed digital circuits end-to-end.',
    year: '2025',
    slug: '/vlsi-chip-design',
    imgSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
  {
    number: 4,
    title: 'Smart Glass for Blind',
    liveUrl: null,
    tags: ['Hardware', 'Assistive Tech'],
    description: 'Wearable with ultrasonic obstacle detection, voice alerts, GPS, and SOS — built to help visually impaired users navigate safely.',
    year: '2025',
    slug: '/smart-glass',
    imgSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    number: 3,
    title: 'Online Book Ordering',
    liveUrl: null,
    tags: ['Web Application', 'Academic'],
    description: 'A clean editorial bookstore with category filtering, real-time search, animated cart drawer, and a full checkout flow.',
    year: '2024',
    slug: '/book-ordering',
    imgSrc: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
  },
  {
    number: 5,
    title: 'ERP System',
    liveUrl: null,
    tags: ['Full Stack', 'Enterprise Software'],
    description: 'A unified ERP dashboard managing inventory, purchase orders, HR & payroll, and revenue analytics — with live restocking, low-stock alerts, and financial charts.',
    year: '2026',
    slug: '/erp-system',
    imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    number: 6,
    title: 'CRM System',
    liveUrl: null,
    tags: ['Full Stack', 'Sales & CRM'],
    description: 'A visual CRM with a drag-and-drop sales pipeline, contact management, deal tracking, and an activity feed — built to manage leads from first contact to closed deal.',
    year: '2026',
    slug: '/crm-system',
    imgSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
]

const stack = [
  { label: 'HTML', num: '01' },
  { label: 'CSS', num: '02' },
  { label: 'JavaScript', num: '03' },
  { label: 'Node.js', num: '04' },
  { label: 'MySQL', num: '05' },
  { label: 'Bubble.io', num: '06' },
  { label: 'WordPress', num: '07' },
  { label: 'Plugins', num: '08' },
  { label: 'DSCH3', num: '09' },
  { label: 'Microwind', num: '10' },
  { label: 'MS Excel', num: '11' },
  { label: 'Documentation', num: '12' },
]

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">Portfolio · Est. 2026</div>
            <h1 className="hero-title">
              Jerin <br />Kabir
            </h1>
            <p className="hero-subtitle">
              CSE graduate from Mymensingh Engineering College. Bubble.io &amp; WordPress hands-on,
              currently leveling up in Full Stack Development with AI Integration.
              I build, I don't just study.
            </p>
            <div className="hero-cta-row">
              <a href="#work" className="cta-primary">See selected work →</a>
              <a href="mailto:jerinkabir54@gmail.com" className="cta-email">jerinkabir54@gmail.com</a>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="hero-portrait-wrap">
              <img
                src="/jerin-portrait.jpg"
                alt="Portrait of Jerin Kabir"
              />
            </div>
            <p className="hero-fig-caption">Fig. 01 — Dhaka, BD · Available for work</p>
          </div>
        </div>
      </section>

      <Ticker />

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-eyebrow">§ Experience</div>
          <h2 className="section-title">Where I've worked.</h2>
          <div className="exp-item">
            <div className="exp-date">Oct 2025 — Jan 2026</div>
            <div className="exp-content">
              <h3 className="exp-role">Product Developer Intern</h3>
              <div className="exp-company">BrandSquare LLC · Kishorganj, Bangladesh</div>
              <ul className="exp-list">
                <li>Built product workflows on Bubble.io and customized WordPress solutions: theme setup, plugin management, content structuring.</li>
                <li>Managed digital documentation, data structuring, and form-based system configuration with strict data integrity.</li>
                <li>Collaborated cross-functionally to streamline task tracking, reporting accuracy, and operational efficiency.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-eyebrow">§ Selected Projects</div>
          <h2 className="section-title">Things I've built.</h2>
          <div className="projects-date-label">2024 — 2025</div>
          <div className="projects-list">
            {projects.map(p => (
              <ProjectCard key={p.number} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* WORKSPACE IMAGE */}
      <div className="workspace-img-wrap">
        <div className="container">
          <img
            src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80"
            alt="Jerin's workspace"
            className="workspace-img"
          />
          <p className="fig-caption">Fig. 02 — Where the work happens</p>
        </div>
      </div>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container about-grid">
          <div>
            <div className="section-eyebrow">§ About</div>
            <h2 className="section-title">Builds, doesn't <br />just study.</h2>
            <p className="about-body">
              I'm Jerin — a Computer Science &amp; Engineering graduate from Mymensingh Engineering
              College (CGPA 3.42). My internship at BrandSquare gave me real product-development
              reps in Bubble.io, WordPress, and data operations.
            </p>
            <p className="about-body">
              Right now I'm advancing through Ostad's Full Stack Development with AI Integration
              program. I adapt fast, own my work, and slot into any team — ready to contribute
              from day one.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-label">Based</span>
                <span className="stat-value">Dhaka, BD</span>
              </div>
              <div className="stat">
                <span className="stat-label">Degree</span>
                <span className="stat-value">B.Sc. CSE · 3.42</span>
              </div>
              <div className="stat">
                <span className="stat-label">Status</span>
                <span className="stat-value stat-available">Open to work</span>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <div className="section-eyebrow">§ Education</div>
            <h2 className="section-title">Studied at.</h2>
            <div className="edu-list">
              <div className="edu-item">
                <span className="edu-date">2020 — 2025</span>
                <div>
                  <h3 className="edu-degree">B.Sc. in Computer Science &amp; Engineering</h3>
                  <p className="edu-school">Mymensingh Engineering College</p>
                  <p className="edu-gpa">CGPA 3.42</p>
                </div>
              </div>
              <div className="edu-item">
                <span className="edu-date">2018 — 2019</span>
                <div>
                  <h3 className="edu-degree">Higher Secondary Certificate (HSC)</h3>
                  <p className="edu-school">Central Women's College, Dhaka</p>
                  <p className="edu-gpa">GPA 4.33</p>
                </div>
              </div>
              <div className="edu-item">
                <span className="edu-date">2016 — 2017</span>
                <div>
                  <h3 className="edu-degree">Secondary School Certificate (SSC)</h3>
                  <p className="edu-school">Motijheel Model School &amp; College, Dhaka</p>
                  <p className="edu-gpa">GPA 5.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="section" id="stack">
        <div className="container">
          <div className="section-eyebrow">§ Toolkit</div>
          <h2 className="section-title">What I reach for.</h2>
          <div className="stack-grid">
            {stack.map(s => (
              <div className="stack-item" key={s.num}>
                <span className="stack-num">{s.num}</span>
                <span className="stack-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container contact-layout">
          <div>
            <div className="section-eyebrow">§ Contact</div>
            <h2 className="section-title">Let's make something<br />together.</h2>
            <div className="contact-info">
              <div>
                <p className="contact-info-label">Email</p>
                <a href="mailto:jerinkabir54@gmail.com" className="contact-email">jerinkabir54@gmail.com</a>
                <a href="tel:+8801918733835" className="contact-phone">+880 1918 733835</a>
              </div>
              <div>
                <p className="contact-info-label">Socials</p>
                <div className="contact-socials">
                  <a href="https://www.linkedin.com/in/jerin-kabir-4b5a61201" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                  <a href="https://github.com/jerinSHIFT" target="_blank" rel="noreferrer">GitHub ↗</a>
                </div>
              </div>
              <div>
                <p className="contact-info-label">Currently</p>
                <p className="contact-available">Open to full-time, internship &amp; freelance roles. Reply within 24h.</p>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
