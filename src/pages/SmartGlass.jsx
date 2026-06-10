import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './SmartGlass.css'

const features = [
  { icon:'📡', title:'Ultrasonic Detection', desc:'HC-SR04 sensor detects obstacles 2cm–400cm. Vibration alerts in real-time at 3 severity levels.', color:'#a8ff78' },
  { icon:'🔊', title:'Voice Alerts (Bangla)', desc:'DFPlayer Mini delivers voice guidance in Bangla — front, left, right, stop — for intuitive navigation.', color:'#4a9eff' },
  { icon:'📍', title:'GPS Tracking', desc:'NEO-6M GPS sends live coordinates. Caretaker receives real-time location via GSM module.', color:'#ff9f4a' },
  { icon:'🆘', title:'SOS Button', desc:'One-press sends emergency SMS with GPS coordinates to 3 pre-saved contacts within 5 seconds.', color:'#f472b6' },
  { icon:'🔋', title:'8hr Battery Life', desc:'2000mAh Li-Po with USB-C charging. Low-battery voice alert at 20% remaining.', color:'#c084fc' },
  { icon:'👓', title:'Lightweight Frame', desc:'Full device weight: 68g. Fits standard glasses frame, comfortable for all-day wear.', color:'#34d399' },
]

const components = [
  { name:'Arduino Nano', role:'Main Microcontroller', qty:'1x', power:'19mA' },
  { name:'HC-SR04', role:'Ultrasonic Distance Sensor', qty:'2x', power:'15mA' },
  { name:'NEO-6M', role:'GPS Module', qty:'1x', power:'45mA' },
  { name:'SIM800L', role:'GSM/SMS Module', qty:'1x', power:'700mA peak' },
  { name:'DFPlayer Mini', role:'MP3 Audio Module', qty:'1x', power:'24mA' },
  { name:'Vibration Motor', role:'Haptic Feedback', qty:'2x', power:'60mA' },
  { name:'Li-Po 2000mAh', role:'Rechargeable Battery', qty:'1x', power:'Supply' },
  { name:'Mini Speaker 8Ω', role:'Voice Output', qty:'1x', power:'200mW' },
]

const SAFE_DIST = 150

export default function SmartGlass() {
  const [dist, setDist] = useState(200)
  const [simRunning, setSimRunning] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (!simRunning) return
    const id = setInterval(() => {
      setDist(prev => {
        const next = prev - Math.floor(Math.random() * 15 + 5)
        if (next <= 0) { setSimRunning(false); setAlert(null); return 200 }
        if (next < 30) setAlert({ level:'danger', msg:'🔴 DANGER! Stop immediately!' })
        else if (next < 80) setAlert({ level:'warning', msg:'🟡 Obstacle nearby — slow down' })
        else if (next < 140) setAlert({ level:'caution', msg:'🟢 Obstacle detected ahead' })
        else setAlert(null)
        return next
      })
    }, 400)
    return () => clearInterval(id)
  }, [simRunning])

  const pct = Math.min(100, Math.max(0, (dist / 300) * 100))
  const barColor = dist < 30 ? '#ff4444' : dist < 80 ? '#ffaa00' : dist < 140 ? '#ffdd00' : '#a8ff78'

  return (
    <>
      <Navbar />
      <main className="sg-page">
        <div className="container">
          <Link to="/" className="sg-back">← Back to portfolio</Link>

          {/* HERO */}
          <header className="sg-hero">
            <div className="sg-hero-text">
              <div className="sg-badge">Assistive Technology · Hardware · IoT</div>
              <h1 className="sg-title">Smart Glass<br /><em>for the Blind</em></h1>
              <p className="sg-lead">
                A wearable assistive device combining ultrasonic obstacle detection, Bangla voice alerts,
                GPS tracking, and one-press SOS — engineered to give visually impaired users
                the freedom to navigate safely and independently.
              </p>
              <div className="sg-stats">
                <div><span>68g</span><p>Device Weight</p></div>
                <div><span>8h+</span><p>Battery Life</p></div>
                <div><span>400cm</span><p>Detection Range</p></div>
                <div><span>5s</span><p>SOS Response</p></div>
              </div>
            </div>

            {/* LIVE SENSOR SIMULATOR */}
            <div className="sg-simulator">
              <div className="sg-sim-header">
                <span className={`sg-sim-dot ${simRunning ? 'active' : ''}`} />
                <span>Live Sensor Simulator</span>
              </div>
              <div className="sg-sensor-display">
                <div className="sg-sensor-ring" style={{'--fill': pct + '%', '--color': barColor}}>
                  <div className="sg-sensor-value">
                    <span style={{color: barColor}}>{dist}</span>
                    <small>cm</small>
                  </div>
                </div>
                <div className="sg-sensor-bar-wrap">
                  <div className="sg-sensor-bar" style={{width: pct+'%', background: barColor}} />
                </div>
                <div className="sg-zone-labels">
                  <span style={{color:'#ff4444'}}>DANGER</span>
                  <span style={{color:'#ffaa00'}}>WARN</span>
                  <span style={{color:'#a8ff78'}}>SAFE</span>
                </div>
              </div>
              {alert && (
                <div className={`sg-alert-box ${alert.level}`}>{alert.msg}</div>
              )}
              <div className="sg-sim-btns">
                <button
                  className={`sg-sim-btn ${simRunning ? 'stop' : 'start'}`}
                  onClick={() => { setSimRunning(!simRunning); if(simRunning){setDist(200);setAlert(null)} }}
                >
                  {simRunning ? '⏹ Stop Simulation' : '▶ Run Simulation'}
                </button>
              </div>
              <p className="sg-sim-note">Simulates an obstacle approaching the user</p>
            </div>
          </header>

          {/* FEATURES */}
          <section className="sg-section">
            <div className="sg-eyebrow">§ Features</div>
            <h2 className="sg-section-title">What it can do.</h2>
            <div className="sg-features">
              {features.map(f => (
                <div key={f.title} className="sg-feature-card" style={{'--fc': f.color}}>
                  <div className="sg-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="sg-section">
            <div className="sg-eyebrow">§ System Flow</div>
            <h2 className="sg-section-title">How it works.</h2>
            <div className="sg-flow">
              {[
                { n:'01', t:'Sense', d:'Ultrasonic pulses measure distance to obstacles 50 times per second.' },
                { n:'02', t:'Process', d:'Arduino Nano calculates distance, determines alert level, triggers appropriate response.' },
                { n:'03', t:'Alert', d:'Vibration motor + Bangla voice output guides user instantly.' },
                { n:'04', t:'Track', d:'GPS coordinates logged and sent to caretaker every 30 seconds.' },
                { n:'05', t:'SOS', d:'Emergency button triggers SMS with live GPS to 3 contacts within 5 seconds.' },
              ].map(s => (
                <div key={s.n} className="sg-flow-step">
                  <span className="sg-flow-num">{s.n}</span>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COMPONENTS */}
          <section className="sg-section">
            <div className="sg-eyebrow">§ Hardware</div>
            <h2 className="sg-section-title">Components used.</h2>
            <div className="sg-components">
              <div className="sg-comp-header">
                <span>Component</span><span>Role</span><span>Qty</span><span>Power</span>
              </div>
              {components.map(c => (
                <div key={c.name} className="sg-comp-row">
                  <span className="sg-comp-name">{c.name}</span>
                  <span>{c.role}</span>
                  <span>{c.qty}</span>
                  <span className="sg-comp-power">{c.power}</span>
                </div>
              ))}
            </div>
          </section>

          {/* IMPACT */}
          <section className="sg-section sg-impact">
            <div className="sg-eyebrow">§ Impact</div>
            <h2 className="sg-section-title">Built for independence.</h2>
            <div className="sg-impact-grid">
              <div className="sg-impact-stat">
                <span>285M+</span>
                <p>People worldwide with visual impairment</p>
              </div>
              <div className="sg-impact-stat">
                <span>~40%</span>
                <p>Are in South Asia including Bangladesh</p>
              </div>
              <div className="sg-impact-stat">
                <span>&lt;৳3,500</span>
                <p>Total component cost — accessible pricing</p>
              </div>
            </div>
            <p className="sg-impact-note">
              This project was designed with accessibility-first principles. Every decision —
              Bangla voice output, one-button SOS, lightweight frame — was made to serve
              the real needs of visually impaired users in Bangladesh.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
