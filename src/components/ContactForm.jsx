import { useState } from 'react'
import axios from 'axios'
import './ContactForm.css'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you working on?"
          value={form.message}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
        />
      </div>

      {status === 'success' && (
        <div className="form-success">Message sent! I'll reply within 24h.</div>
      )}
      {status === 'error' && (
        <div className="form-error">{errorMsg}</div>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
