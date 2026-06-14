import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './DocFusion.css'

const doctors = [
  { id: 1, name: 'ডা. আনিসুর রহমান', specialty: 'Cardiologist', degree: 'MBBS, FCPS (Cardiology)', exp: 14, fee: 1500, rating: 4.9, hospital: 'Square Hospital, Dhaka', slots: ['09:00 AM','10:30 AM','02:00 PM','04:30 PM'], initials: 'AR' },
  { id: 2, name: 'ডা. ফারজানা হক', specialty: 'Gynecologist', degree: 'MBBS, MS (Gynae & Obs)', exp: 11, fee: 1200, rating: 4.8, hospital: 'United Hospital, Dhaka', slots: ['10:00 AM','11:30 AM','03:00 PM','05:00 PM'], initials: 'FH' },
  { id: 3, name: 'ডা. তানভীর হাসান', specialty: 'Neurologist', degree: 'MBBS, MD (Neurology)', exp: 16, fee: 1800, rating: 4.7, hospital: 'Evercare Hospital, Dhaka', slots: ['08:30 AM','11:00 AM','01:30 PM','04:00 PM'], initials: 'TH' },
  { id: 4, name: 'ডা. নুসরাত জাহান', specialty: 'Dermatologist', degree: 'MBBS, DDV', exp: 9, fee: 1000, rating: 4.9, hospital: 'Labaid Specialized, Dhaka', slots: ['09:30 AM','12:00 PM','02:30 PM','05:30 PM'], initials: 'NJ' },
  { id: 5, name: 'ডা. সাইফুল ইসলাম', specialty: 'Orthopedic Surgeon', degree: 'MBBS, MS (Ortho)', exp: 18, fee: 1400, rating: 4.6, hospital: 'Ibn Sina Hospital, Dhaka', slots: ['08:00 AM','10:00 AM','01:00 PM','03:30 PM'], initials: 'SI' },
  { id: 6, name: 'ডা. রুমানা আক্তার', specialty: 'Pediatrician', degree: 'MBBS, FCPS (Paeds)', exp: 12, fee: 1100, rating: 4.9, hospital: 'Apollo Imperial, Dhaka', slots: ['09:00 AM','11:00 AM','02:00 PM','04:00 PM'], initials: 'RA' },
  { id: 7, name: 'ডা. মাহবুব আলম', specialty: 'ENT Specialist', degree: 'MBBS, DLO, FCPS', exp: 10, fee: 900, rating: 4.5, hospital: 'Popular Diagnostic, Dhaka', slots: ['10:30 AM','12:30 PM','03:30 PM','05:00 PM'], initials: 'MA' },
  { id: 8, name: 'ডা. সাবিনা ইয়াসমিন', specialty: 'Psychiatrist', degree: 'MBBS, MD (Psychiatry)', exp: 13, fee: 1300, rating: 4.8, hospital: 'BSMMU, Dhaka', slots: ['09:30 AM','11:30 AM','02:30 PM','04:30 PM'], initials: 'SY' },
]

const specialties = ['All','Cardiologist','Gynecologist','Neurologist','Dermatologist','Orthopedic Surgeon','Pediatrician','ENT Specialist','Psychiatrist']

const steps = [
  { num:'01', title:'ডাক্তার পছন্দ করুন', desc:'স্পেশালিটি অনুযায়ী ফিল্টার করে আপনার পছন্দের ডাক্তার বাছাই করুন।' },
  { num:'02', title:'সময় নির্বাচন করুন', desc:'ফাঁকা স্লট থেকে সুবিধাজনক সময় বেছে নিন এবং তথ্য দিন।' },
  { num:'03', title:'কনফার্মেশন পান', desc:'তাৎক্ষণিক ইমেইল ও SMS-এ অ্যাপয়েন্টমেন্ট কনফার্মেশন পেয়ে যান।' },
]

export default function DocFusion() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [booking, setBooking] = useState(null) // {doctor, slot}
  const [form, setForm] = useState({ name:'', phone:'', email:'' })
  const [confirmed, setConfirmed] = useState(null)
  const [step, setStep] = useState(1) // 1=slot pick, 2=form, 3=done

  const filtered = doctors.filter(d => {
    const matchSpec = filter === 'All' || d.specialty === filter
    const matchSearch = d.name.includes(search) || d.specialty.toLowerCase().includes(search.toLowerCase())
    return matchSpec && matchSearch
  })

  function startBooking(doctor) {
    setBooking({ doctor, slot: null })
    setStep(1)
    setForm({ name:'', phone:'', email:'' })
    setConfirmed(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function confirmBooking(e) {
    e.preventDefault()
    setConfirmed({ ...booking, ...form, time: new Date().toLocaleString('bn-BD') })
    setStep(3)
  }

  return (
    <>
      <Navbar />
      <main className="df-page">

        {/* MODAL */}
        {booking && (
          <div className="df-modal-overlay" onClick={() => setBooking(null)}>
            <div className="df-modal" onClick={e => e.stopPropagation()}>
              <button className="df-modal-close" onClick={() => setBooking(null)}>✕</button>

              {step === 3 ? (
                <div className="df-confirmed">
                  <div className="df-confirmed-icon">✓</div>
                  <h3>অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে!</h3>
                  <p>{confirmed.doctor.name}</p>
                  <p>{confirmed.slot} · {confirmed.doctor.hospital}</p>
                  <div className="df-confirmed-badges">
                    <span>Email ✓</span>
                    <span>SMS ✓</span>
                    <span>Confirmed ✓</span>
                  </div>
                  <p className="df-confirmed-note">নিশ্চিতকরণ {confirmed.email}-এ পাঠানো হয়েছে।</p>
                  <button className="df-btn-primary" onClick={() => setBooking(null)}>বন্ধ করুন</button>
                </div>
              ) : step === 2 ? (
                <div className="df-modal-form">
                  <h3>{booking.doctor.name}</h3>
                  <p className="df-modal-sub">{booking.slot} · {booking.doctor.hospital}</p>
                  <form onSubmit={confirmBooking}>
                    <div className="df-form-group">
                      <label>আপনার নাম</label>
                      <input required placeholder="নাম লিখুন" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
                    </div>
                    <div className="df-form-group">
                      <label>মোবাইল নম্বর</label>
                      <input required placeholder="01XXXXXXXXX" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
                    </div>
                    <div className="df-form-group">
                      <label>ইমেইল</label>
                      <input required type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} />
                    </div>
                    <div className="df-modal-btns">
                      <button type="button" className="df-btn-secondary" onClick={() => setStep(1)}>← পিছনে</button>
                      <button type="submit" className="df-btn-primary">কনফার্ম করুন →</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="df-slot-picker">
                  <h3>{booking.doctor.name}</h3>
                  <p className="df-modal-sub">{booking.doctor.specialty} · ৳{booking.doctor.fee}</p>
                  <p className="df-slot-label">সময় বেছে নিন</p>
                  <div className="df-slots">
                    {booking.doctor.slots.map(s => (
                      <button
                        key={s}
                        className={`df-slot ${booking.slot === s ? 'active' : ''}`}
                        onClick={() => setBooking(p => ({...p, slot: s}))}
                      >{s}</button>
                    ))}
                  </div>
                  <button
                    className="df-btn-primary"
                    disabled={!booking.slot}
                    onClick={() => setStep(2)}
                  >পরবর্তী →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="df-hero">
          <div className="container">
            <Link to="/" className="df-back">← Back to portfolio</Link>
            <div className="df-hero-badge">২৪/৭ অনলাইন বুকিং</div>
            <h1 className="df-hero-title">ভরসার ডাক্তার,<br /><em>এক ক্লিকেই</em></h1>
            <p className="df-hero-sub">দেশের সেরা ৮+ স্পেশালিস্ট ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট বুক করুন। বুকিং কনফার্ম হওয়ার সাথে সাথেই ইমেইল ও SMS-এ নোটিফিকেশন।</p>
            <div className="df-hero-cta">
              <a href="#doctors" className="df-btn-primary">ডাক্তার দেখুন →</a>
              <a href="#how" className="df-btn-outline">কিভাবে কাজ করে</a>
            </div>
            <div className="df-hero-stats">
              <div><span>8+</span><p>Doctors</p></div>
              <div><span>12K+</span><p>Patients</p></div>
              <div><span>4.8★</span><p>Rating</p></div>
            </div>
            {/* Live preview card */}
            <div className="df-preview-card">
              <div className="df-preview-dot" />
              <div>
                <p className="df-preview-name">ডা. আনিসুর রহমান</p>
                <p className="df-preview-info">Cardiologist · Square Hospital</p>
                <p className="df-preview-time">Today · 04:30 PM</p>
              </div>
              <div className="df-preview-badges">
                <span>Confirmed ✓</span>
                <span>Email ✓</span>
                <span>SMS ✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="df-section" id="how">
          <div className="container">
            <div className="df-eyebrow">§ How it works</div>
            <h2 className="df-section-title">তিনটি ধাপে অ্যাপয়েন্টমেন্ট।</h2>
            <div className="df-steps">
              {steps.map(s => (
                <div key={s.num} className="df-step">
                  <span className="df-step-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCTORS */}
        <section className="df-section" id="doctors">
          <div className="container">
            <div className="df-eyebrow">§ Our doctors</div>
            <h2 className="df-section-title">বিশেষজ্ঞ ডাক্তারগণ।</h2>

            {/* Filter + Search */}
            <div className="df-controls">
              <input
                className="df-search"
                placeholder="ডাক্তার বা স্পেশালিটি খুঁজুন..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="df-filters">
                {specialties.map(s => (
                  <button
                    key={s}
                    className={`df-filter-btn ${filter === s ? 'active' : ''}`}
                    onClick={() => setFilter(s)}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div className="df-doctors-grid">
              {filtered.map(doc => (
                <div key={doc.id} className="df-doctor-card">
                  <div className="df-doctor-avatar">{doc.initials}</div>
                  <div className="df-doctor-info">
                    <h3>{doc.name}</h3>
                    <span className="df-doctor-spec">{doc.specialty}</span>
                    <p className="df-doctor-degree">{doc.degree}</p>
                    <div className="df-doctor-meta">
                      <span>{doc.exp}y Exp</span>
                      <span>৳{doc.fee} Fee</span>
                      <span>{doc.rating}★</span>
                    </div>
                    <p className="df-doctor-hospital">📍 {doc.hospital}</p>
                  </div>
                  <button className="df-book-btn" onClick={() => startBooking(doc)}>
                    অ্যাপয়েন্টমেন্ট নিন →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER STRIP */}
        <div className="df-footer-strip">
          <div className="container">
            <h2>আপনার স্বাস্থ্য, আমাদের দায়িত্ব।</h2>
            <p>যেকোনো সময়, যেকোনো জায়গা থেকে — দেশের সেরা ডাক্তারদের সাথে কানেক্ট হোন।</p>
            <a href="#doctors" className="df-btn-primary">এখনই বুক করুন</a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
