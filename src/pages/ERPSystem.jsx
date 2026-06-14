import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './ERPSystem.css'

const initialInventory = [
  { id:1, name:'Office Chair (Ergo)', sku:'FUR-001', category:'Furniture', stock:42, reorder:15, price:8500, supplier:'Comfort Co.' },
  { id:2, name:'A4 Paper (Ream)', sku:'STA-014', category:'Stationery', stock:8, reorder:20, price:350, supplier:'PaperPlus' },
  { id:3, name:'Laptop Dell 15"', sku:'ELC-022', category:'Electronics', stock:12, reorder:5, price:65000, supplier:'TechWorld BD' },
  { id:4, name:'Wireless Mouse', sku:'ELC-031', category:'Electronics', stock:55, reorder:20, price:850, supplier:'TechWorld BD' },
  { id:5, name:'Whiteboard Marker', sku:'STA-009', category:'Stationery', stock:6, reorder:25, price:45, supplier:'PaperPlus' },
  { id:6, name:'Conference Table', sku:'FUR-007', category:'Furniture', stock:3, reorder:2, price:32000, supplier:'Comfort Co.' },
  { id:7, name:'Network Switch 24P', sku:'ELC-040', category:'Electronics', stock:7, reorder:5, price:12000, supplier:'NetSource' },
  { id:8, name:'Printer Toner', sku:'STA-021', category:'Stationery', stock:14, reorder:10, price:2200, supplier:'PaperPlus' },
]

const initialOrders = [
  { id:'PO-2031', supplier:'TechWorld BD', items:'10x Laptop Dell 15"', amount:650000, status:'Pending', date:'2026-06-08' },
  { id:'PO-2030', supplier:'PaperPlus', items:'50x A4 Paper, 30x Marker', amount:18850, status:'Approved', date:'2026-06-05' },
  { id:'PO-2029', supplier:'Comfort Co.', items:'5x Office Chair', amount:42500, status:'Delivered', date:'2026-06-01' },
  { id:'PO-2028', supplier:'NetSource', items:'2x Network Switch', amount:24000, status:'Delivered', date:'2026-05-28' },
]

const employees = [
  { id:1, name:'Rashed Karim', dept:'Sales', role:'Manager', salary:65000, status:'Active' },
  { id:2, name:'Nusrat Jahan', dept:'Finance', role:'Accountant', salary:48000, status:'Active' },
  { id:3, name:'Imran Hossain', dept:'IT', role:'Developer', salary:55000, status:'Active' },
  { id:4, name:'Farzana Akter', dept:'HR', role:'HR Officer', salary:42000, status:'On Leave' },
  { id:5, name:'Tanvir Ahmed', dept:'Sales', role:'Executive', salary:35000, status:'Active' },
  { id:6, name:'Mahbub Alam', dept:'Operations', role:'Supervisor', salary:38000, status:'Active' },
]

const revenueData = [
  { month:'Jan', revenue:1250000, expense:850000 },
  { month:'Feb', revenue:1380000, expense:920000 },
  { month:'Mar', revenue:1190000, expense:880000 },
  { month:'Apr', revenue:1520000, expense:1010000 },
  { month:'May', revenue:1640000, expense:1080000 },
  { month:'Jun', revenue:1750000, expense:1150000 },
]

const statusColors = { Pending:'#ff9f4a', Approved:'#4a9eff', Delivered:'#a8ff78', Active:'#a8ff78', 'On Leave':'#ff9f4a' }

export default function ERPSystem() {
  const [tab, setTab] = useState('dashboard')
  const [inventory, setInventory] = useState(initialInventory)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [restockQty, setRestockQty] = useState('')

  const categories = ['All', ...new Set(initialInventory.map(i => i.category))]

  const filteredInventory = useMemo(() => {
    return inventory.filter(i => {
      const matchCat = catFilter === 'All' || i.category === catFilter
      const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [inventory, search, catFilter])

  const lowStockItems = inventory.filter(i => i.stock <= i.reorder)
  const totalStockValue = inventory.reduce((s,i) => s + i.stock * i.price, 0)
  const totalRevenue = revenueData.reduce((s,r) => s + r.revenue, 0)
  const totalExpense = revenueData.reduce((s,r) => s + r.expense, 0)
  const maxRevenue = Math.max(...revenueData.map(r => r.revenue))

  const handleRestock = () => {
    if (!selectedItem || !restockQty) return
    setInventory(prev => prev.map(i => i.id === selectedItem.id ? {...i, stock: i.stock + parseInt(restockQty)} : i))
    setSelectedItem(null)
    setRestockQty('')
  }

  return (
    <>
      <Navbar />
      <main className="erp-page">
        <div className="container">
          <Link to="/" className="erp-back">← Back to portfolio</Link>

          <header className="erp-hero">
            <div className="erp-badge">ERP · Inventory · HR · Finance</div>
            <h1 className="erp-title">Enterprise<br /><em>Resource Planning</em></h1>
            <p className="erp-lead">
              A unified ERP system managing inventory, purchase orders, employee records,
              and financial reporting — built to give business owners real-time visibility
              across operations from a single dashboard.
            </p>
          </header>

          {/* TABS */}
          <div className="erp-tabs">
            {['dashboard','inventory','orders','hr'].map(t => (
              <button key={t} className={`erp-tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>
                {t === 'dashboard' && '📊 Dashboard'}
                {t === 'inventory' && '📦 Inventory'}
                {t === 'orders' && '🧾 Purchase Orders'}
                {t === 'hr' && '👥 HR & Payroll'}
              </button>
            ))}
          </div>

          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <div className="erp-section">
              <div className="erp-stats-grid">
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Total Revenue (6mo)</span>
                  <span className="erp-stat-value accent">৳{(totalRevenue/1000000).toFixed(2)}M</span>
                </div>
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Total Expense (6mo)</span>
                  <span className="erp-stat-value warn">৳{(totalExpense/1000000).toFixed(2)}M</span>
                </div>
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Net Profit</span>
                  <span className="erp-stat-value accent">৳{((totalRevenue-totalExpense)/1000000).toFixed(2)}M</span>
                </div>
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Inventory Value</span>
                  <span className="erp-stat-value">৳{(totalStockValue/1000000).toFixed(2)}M</span>
                </div>
              </div>

              {/* CHART */}
              <div className="erp-chart-card">
                <h3>Revenue vs Expense (Last 6 Months)</h3>
                <div className="erp-chart">
                  {revenueData.map(r => (
                    <div key={r.month} className="erp-chart-col">
                      <div className="erp-chart-bars">
                        <div className="erp-bar revenue" style={{height: `${(r.revenue/maxRevenue)*100}%`}} title={`Revenue: ৳${r.revenue.toLocaleString()}`} />
                        <div className="erp-bar expense" style={{height: `${(r.expense/maxRevenue)*100}%`}} title={`Expense: ৳${r.expense.toLocaleString()}`} />
                      </div>
                      <span className="erp-chart-label">{r.month}</span>
                    </div>
                  ))}
                </div>
                <div className="erp-chart-legend">
                  <span><i className="dot revenue"/> Revenue</span>
                  <span><i className="dot expense"/> Expense</span>
                </div>
              </div>

              {/* LOW STOCK ALERT */}
              <div className="erp-alert-card">
                <h3>⚠ Low Stock Alerts ({lowStockItems.length})</h3>
                {lowStockItems.length === 0 ? (
                  <p className="erp-empty">All items sufficiently stocked.</p>
                ) : (
                  <div className="erp-alert-list">
                    {lowStockItems.map(i => (
                      <div key={i.id} className="erp-alert-item">
                        <span>{i.name}</span>
                        <span className="erp-alert-stock">{i.stock} left / reorder at {i.reorder}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* INVENTORY */}
          {tab === 'inventory' && (
            <div className="erp-section">
              {/* RESTOCK MODAL */}
              {selectedItem && (
                <div className="erp-modal-overlay" onClick={() => setSelectedItem(null)}>
                  <div className="erp-modal" onClick={e => e.stopPropagation()}>
                    <h3>Restock: {selectedItem.name}</h3>
                    <p className="erp-modal-sub">Current stock: {selectedItem.stock} units</p>
                    <input
                      type="number"
                      placeholder="Quantity to add"
                      value={restockQty}
                      onChange={e => setRestockQty(e.target.value)}
                      className="erp-input"
                    />
                    <div className="erp-modal-btns">
                      <button className="erp-btn-secondary" onClick={() => setSelectedItem(null)}>Cancel</button>
                      <button className="erp-btn-primary" onClick={handleRestock}>Add Stock</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="erp-controls">
                <input className="erp-search" placeholder="Search by name or SKU..." value={search} onChange={e => setSearch(e.target.value)} />
                <div className="erp-filters">
                  {categories.map(c => (
                    <button key={c} className={`erp-filter-btn ${catFilter===c?'active':''}`} onClick={() => setCatFilter(c)}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="erp-table-wrap">
                <div className="erp-table-header erp-inv-grid">
                  <span>Item</span><span>SKU</span><span>Category</span><span>Stock</span><span>Price</span><span>Supplier</span><span></span>
                </div>
                {filteredInventory.map(item => (
                  <div key={item.id} className={`erp-table-row erp-inv-grid ${item.stock <= item.reorder ? 'low-stock' : ''}`}>
                    <span className="erp-item-name">{item.name}</span>
                    <span className="erp-mono">{item.sku}</span>
                    <span><span className="erp-cat-pill">{item.category}</span></span>
                    <span className={item.stock <= item.reorder ? 'erp-text-warn' : ''}>{item.stock}</span>
                    <span>৳{item.price.toLocaleString()}</span>
                    <span className="erp-muted">{item.supplier}</span>
                    <button className="erp-restock-btn" onClick={() => setSelectedItem(item)}>Restock</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PURCHASE ORDERS */}
          {tab === 'orders' && (
            <div className="erp-section">
              <div className="erp-table-wrap">
                <div className="erp-table-header erp-po-grid">
                  <span>PO ID</span><span>Supplier</span><span>Items</span><span>Amount</span><span>Date</span><span>Status</span>
                </div>
                {initialOrders.map(o => (
                  <div key={o.id} className="erp-table-row erp-po-grid">
                    <span className="erp-mono">{o.id}</span>
                    <span>{o.supplier}</span>
                    <span className="erp-muted">{o.items}</span>
                    <span>৳{o.amount.toLocaleString()}</span>
                    <span className="erp-muted">{o.date}</span>
                    <span><span className="erp-status-pill" style={{color:statusColors[o.status], borderColor:statusColors[o.status]+'66', background:statusColors[o.status]+'18'}}>{o.status}</span></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HR */}
          {tab === 'hr' && (
            <div className="erp-section">
              <div className="erp-stats-grid">
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Total Employees</span>
                  <span className="erp-stat-value">{employees.length}</span>
                </div>
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Monthly Payroll</span>
                  <span className="erp-stat-value accent">৳{employees.reduce((s,e)=>s+e.salary,0).toLocaleString()}</span>
                </div>
                <div className="erp-stat-card">
                  <span className="erp-stat-label">Active Today</span>
                  <span className="erp-stat-value accent">{employees.filter(e=>e.status==='Active').length}</span>
                </div>
              </div>

              <div className="erp-table-wrap">
                <div className="erp-table-header erp-hr-grid">
                  <span>Name</span><span>Department</span><span>Role</span><span>Salary</span><span>Status</span>
                </div>
                {employees.map(e => (
                  <div key={e.id} className="erp-table-row erp-hr-grid">
                    <span className="erp-item-name">{e.name}</span>
                    <span><span className="erp-cat-pill">{e.dept}</span></span>
                    <span className="erp-muted">{e.role}</span>
                    <span>৳{e.salary.toLocaleString()}</span>
                    <span><span className="erp-status-pill" style={{color:statusColors[e.status], borderColor:statusColors[e.status]+'66', background:statusColors[e.status]+'18'}}>{e.status}</span></span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
