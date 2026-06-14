import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './CRMSystem.css'

const initialLeads = [
  { id:1, name:'Karim Traders', contact:'Abdul Karim', email:'karim@traders.com', phone:'01711-223344', stage:'New', value:250000, source:'Website' },
  { id:2, name:'Nova Tech Ltd', contact:'Sadia Rahman', email:'sadia@novatech.com', phone:'01822-334455', stage:'Contacted', value:480000, source:'Referral' },
  { id:3, name:'Green Valley Foods', contact:'Mizanur Rahman', email:'mizan@gvfoods.com', phone:'01933-445566', stage:'Proposal', value:320000, source:'LinkedIn' },
  { id:4, name:'Bright Future School', contact:'Farhana Yasmin', email:'farhana@bfschool.edu', phone:'01644-556677', stage:'Negotiation', value:150000, source:'Cold Call' },
  { id:5, name:'Apex Builders', contact:'Tarek Hasan', email:'tarek@apexbd.com', phone:'01555-667788', stage:'New', value:890000, source:'Website' },
  { id:6, name:'Crystal Hospital', contact:'Dr. Anika Islam', email:'anika@crystalhosp.com', phone:'01766-778899', stage:'Won', value:620000, source:'Referral' },
  { id:7, name:'Skyline Apparels', contact:'Robiul Hossain', email:'robiul@skyline.com', phone:'01877-889900', stage:'Contacted', value:410000, source:'Exhibition' },
  { id:8, name:'Metro Logistics', contact:'Shamim Reza', email:'shamim@metrolog.com', phone:'01988-990011', stage:'Lost', value:280000, source:'Cold Call' },
  { id:9, name:'Pure Dairy Co.', contact:'Lima Akter', email:'lima@puredairy.com', phone:'01699-001122', stage:'Proposal', value:530000, source:'Website' },
  { id:10, name:'Golden Textile', contact:'Jasim Uddin', email:'jasim@goldentex.com', phone:'01511-112233', stage:'Negotiation', value:710000, source:'LinkedIn' },
]

const stages = ['New','Contacted','Proposal','Negotiation','Won','Lost']
const stageColors = { New:'#4a9eff', Contacted:'#c084fc', Proposal:'#ff9f4a', Negotiation:'#ffdd44', Won:'#a8ff78', Lost:'#ff6b6b' }

const activities = [
  { id:1, type:'call', text:'Called Nova Tech Ltd about pricing', time:'2 hours ago', icon:'📞' },
  { id:2, type:'email', text:'Sent proposal to Green Valley Foods', time:'5 hours ago', icon:'✉️' },
  { id:3, type:'meeting', text:'Meeting scheduled with Apex Builders', time:'Yesterday', icon:'📅' },
  { id:4, type:'deal', text:'Crystal Hospital deal marked as Won 🎉', time:'2 days ago', icon:'🏆' },
  { id:5, type:'note', text:'Added note to Skyline Apparels', time:'3 days ago', icon:'📝' },
]

export default function CRMSystem() {
  const [tab, setTab] = useState('pipeline')
  const [leads, setLeads] = useState(initialLeads)
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)
  const [draggedId, setDraggedId] = useState(null)

  const filteredLeads = useMemo(() => {
    return leads.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.contact.toLowerCase().includes(search.toLowerCase())
    )
  }, [leads, search])

  const totalPipeline = leads.filter(l => !['Won','Lost'].includes(l.stage)).reduce((s,l)=>s+l.value,0)
  const wonValue = leads.filter(l => l.stage==='Won').reduce((s,l)=>s+l.value,0)
  const winRate = Math.round((leads.filter(l=>l.stage==='Won').length / leads.filter(l=>['Won','Lost'].includes(l.stage)).length) * 100) || 0

  const handleDrop = (stage) => {
    if (draggedId == null) return
    setLeads(prev => prev.map(l => l.id === draggedId ? {...l, stage} : l))
    setDraggedId(null)
  }

  return (
    <>
      <Navbar />
      <main className="crm-page">
        <div className="container">
          <Link to="/" className="crm-back">← Back to portfolio</Link>

          <header className="crm-hero">
            <div className="crm-badge">CRM · Sales Pipeline · Lead Management</div>
            <h1 className="crm-title">Customer<br /><em>Relationship Manager</em></h1>
            <p className="crm-lead">
              A visual CRM for managing leads through the entire sales pipeline — from first contact
              to closed deal. Drag-and-drop stages, track contacts, and monitor revenue at every step.
            </p>
            <div className="crm-stats-row">
              <div><span>{leads.length}</span><p>Total Leads</p></div>
              <div><span>৳{(totalPipeline/100000).toFixed(1)}L</span><p>Open Pipeline</p></div>
              <div><span>৳{(wonValue/100000).toFixed(1)}L</span><p>Won Revenue</p></div>
              <div><span>{winRate}%</span><p>Win Rate</p></div>
            </div>
          </header>

          {/* TABS */}
          <div className="crm-tabs">
            {['pipeline','contacts','activity'].map(t => (
              <button key={t} className={`crm-tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>
                {t === 'pipeline' && '📊 Sales Pipeline'}
                {t === 'contacts' && '👤 Contacts'}
                {t === 'activity' && '🕘 Recent Activity'}
              </button>
            ))}
          </div>

          {/* PIPELINE - KANBAN BOARD */}
          {tab === 'pipeline' && (
            <div className="crm-board">
              {stages.map(stage => {
                const stageLeads = leads.filter(l => l.stage === stage)
                const stageTotal = stageLeads.reduce((s,l)=>s+l.value,0)
                return (
                  <div
                    key={stage}
                    className="crm-column"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDrop(stage)}
                  >
                    <div className="crm-column-header" style={{borderTopColor: stageColors[stage]}}>
                      <span className="crm-column-title">{stage}</span>
                      <span className="crm-column-count">{stageLeads.length}</span>
                    </div>
                    <div className="crm-column-total">৳{(stageTotal/100000).toFixed(1)}L</div>
                    <div className="crm-column-body">
                      {stageLeads.map(lead => (
                        <div
                          key={lead.id}
                          className="crm-card"
                          draggable
                          onDragStart={() => setDraggedId(lead.id)}
                          onClick={() => setSelectedLead(lead)}
                        >
                          <h4>{lead.name}</h4>
                          <p className="crm-card-contact">{lead.contact}</p>
                          <div className="crm-card-footer">
                            <span className="crm-card-value">৳{(lead.value/1000).toFixed(0)}K</span>
                            <span className="crm-card-source">{lead.source}</span>
                          </div>
                        </div>
                      ))}
                      {stageLeads.length === 0 && <div className="crm-empty-col">Drop leads here</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* CONTACTS TABLE */}
          {tab === 'contacts' && (
            <div className="crm-section">
              <input className="crm-search" placeholder="Search by company or contact name..." value={search} onChange={e => setSearch(e.target.value)} />
              <div className="crm-table-wrap">
                <div className="crm-table-header crm-contact-grid">
                  <span>Company</span><span>Contact Person</span><span>Email</span><span>Phone</span><span>Stage</span><span>Value</span>
                </div>
                {filteredLeads.map(l => (
                  <div key={l.id} className="crm-table-row crm-contact-grid" onClick={() => setSelectedLead(l)}>
                    <span className="crm-item-name">{l.name}</span>
                    <span>{l.contact}</span>
                    <span className="crm-muted">{l.email}</span>
                    <span className="crm-muted">{l.phone}</span>
                    <span><span className="crm-stage-pill" style={{color:stageColors[l.stage], borderColor:stageColors[l.stage]+'66', background:stageColors[l.stage]+'18'}}>{l.stage}</span></span>
                    <span>৳{l.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY FEED */}
          {tab === 'activity' && (
            <div className="crm-section">
              <div className="crm-activity-list">
                {activities.map(a => (
                  <div key={a.id} className="crm-activity-item">
                    <span className="crm-activity-icon">{a.icon}</span>
                    <div className="crm-activity-content">
                      <p>{a.text}</p>
                      <span className="crm-activity-time">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEAD DETAIL MODAL */}
          {selectedLead && (
            <div className="crm-modal-overlay" onClick={() => setSelectedLead(null)}>
              <div className="crm-modal" onClick={e => e.stopPropagation()}>
                <button className="crm-modal-close" onClick={() => setSelectedLead(null)}>✕</button>
                <span className="crm-stage-pill" style={{color:stageColors[selectedLead.stage], borderColor:stageColors[selectedLead.stage]+'66', background:stageColors[selectedLead.stage]+'18'}}>{selectedLead.stage}</span>
                <h3>{selectedLead.name}</h3>
                <div className="crm-modal-details">
                  <div><span>Contact Person</span><strong>{selectedLead.contact}</strong></div>
                  <div><span>Email</span><strong>{selectedLead.email}</strong></div>
                  <div><span>Phone</span><strong>{selectedLead.phone}</strong></div>
                  <div><span>Deal Value</span><strong>৳{selectedLead.value.toLocaleString()}</strong></div>
                  <div><span>Source</span><strong>{selectedLead.source}</strong></div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
