import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './BookOrdering.css'

const allBooks = [
  { id:1, title:'আমার ছেলেবেলা', author:'হুমায়ূন আহমেদ', category:'Memoir', price:320, rating:4.9, pages:192, tag:'Bestseller', initials:'আছ', cover:'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80' },
  { id:2, title:'হিমু', author:'হুমায়ূন আহমেদ', category:'Fiction', price:280, rating:4.8, pages:224, tag:'Classic', initials:'হি', cover:'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
  { id:3, title:'মিসির আলি', author:'হুমায়ূন আহমেদ', category:'Mystery', price:350, rating:4.7, pages:256, tag:'Popular', initials:'মি', cover:'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80' },
  { id:4, title:'শেষের কবিতা', author:'রবীন্দ্রনাথ ঠাকুর', category:'Poetry', price:220, rating:4.9, pages:168, tag:'Classic', initials:'শক', cover:'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80' },
  { id:5, title:'পথের পাঁচালী', author:'বিভূতিভূষণ', category:'Fiction', price:290, rating:4.8, pages:312, tag:'Classic', initials:'পপ', cover:'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80' },
  { id:6, title:'গল্পগুচ্ছ', author:'রবীন্দ্রনাথ ঠাকুর', category:'Short Story', price:380, rating:4.9, pages:408, tag:'Bestseller', initials:'গগ', cover:'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80' },
  { id:7, title:'দেবদাস', author:'শরৎচন্দ্র', category:'Fiction', price:240, rating:4.7, pages:188, tag:'Classic', initials:'দে', cover:'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&q=80' },
  { id:8, title:'Atomic Habits', author:'James Clear', category:'Self-Help', price:520, rating:4.9, pages:320, tag:'Bestseller', initials:'AH', cover:'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80' },
  { id:9, title:'The Alchemist', author:'Paulo Coelho', category:'Fiction', price:480, rating:4.8, pages:197, tag:'Popular', initials:'TA', cover:'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80' },
  { id:10, title:'আরণ্যক', author:'বিভূতিভূষণ', category:'Fiction', price:270, rating:4.6, pages:224, tag:'Classic', initials:'আর', cover:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80' },
  { id:11, title:'Rich Dad Poor Dad', author:'Robert Kiyosaki', category:'Self-Help', price:560, rating:4.7, pages:336, tag:'Popular', initials:'RD', cover:'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=80' },
  { id:12, title:'কবিতা সমগ্র', author:'জীবনানন্দ দাশ', category:'Poetry', price:410, rating:4.8, pages:512, tag:'Classic', initials:'কস', cover:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80' },
]

const categories = ['All', 'Fiction', 'Poetry', 'Memoir', 'Mystery', 'Short Story', 'Self-Help']

const tagColors = { Bestseller:'#a8ff78', Classic:'#4a9eff', Popular:'#ff9f4a' }

export default function BookOrdering() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [form, setForm] = useState({ name:'', address:'', phone:'' })

  const filtered = useMemo(() => {
    let books = allBooks.filter(b => {
      const matchCat = cat === 'All' || b.category === cat
      const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                          b.author.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    if (sort === 'price-asc') books = [...books].sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') books = [...books].sort((a,b) => b.price - a.price)
    if (sort === 'rating') books = [...books].sort((a,b) => b.rating - a.rating)
    return books
  }, [cat, search, sort])

  const addToCart = (book) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === book.id)
      if (ex) return prev.map(i => i.id === book.id ? {...i, qty: i.qty+1} : i)
      return [...prev, {...book, qty:1}]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const changeQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty+delta)} : i)
  )

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const placeOrder = (e) => {
    e.preventDefault()
    setOrdered(true)
  }

  return (
    <>
      <Navbar />
      <main className="bo-page">

        {/* CART DRAWER */}
        {cartOpen && (
          <div className="bo-drawer-overlay" onClick={() => setCartOpen(false)}>
            <div className="bo-drawer" onClick={e => e.stopPropagation()}>
              <div className="bo-drawer-header">
                <h3>Shopping Cart ({cartCount})</h3>
                <button onClick={() => setCartOpen(false)}>✕</button>
              </div>

              {ordered ? (
                <div className="bo-order-success">
                  <div className="bo-success-icon">✓</div>
                  <h3>Order Placed!</h3>
                  <p>Thank you, <strong>{form.name}</strong>!</p>
                  <p>Your {cartCount} book(s) will be delivered to:</p>
                  <p className="bo-success-addr">{form.address}</p>
                  <p className="bo-success-total">Total: ৳{total.toLocaleString()}</p>
                  <button className="bo-btn-primary" onClick={() => {setCartOpen(false);setCart([]);setOrdered(false);setForm({name:'',address:'',phone:''})}}>
                    Continue Shopping
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="bo-cart-empty">
                  <p>📚</p>
                  <p>Your cart is empty</p>
                  <button className="bo-btn-outline" onClick={() => setCartOpen(false)}>Browse Books</button>
                </div>
              ) : (
                <>
                  <div className="bo-cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="bo-cart-item">
                        <div className="bo-cart-book-cover" style={{background:'var(--surface)'}}>
                          {item.cover ? <img src={item.cover} alt={item.title} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'3px'}} /> : item.initials}
                        </div>
                        <div className="bo-cart-info">
                          <p className="bo-cart-title">{item.title}</p>
                          <p className="bo-cart-author">{item.author}</p>
                          <div className="bo-cart-qty-row">
                            <button onClick={() => changeQty(item.id,-1)}>−</button>
                            <span>{item.qty}</span>
                            <button onClick={() => changeQty(item.id,+1)}>+</button>
                          </div>
                        </div>
                        <div className="bo-cart-right">
                          <span className="bo-cart-price">৳{(item.price*item.qty).toLocaleString()}</span>
                          <button className="bo-cart-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bo-cart-total">
                    <span>Total ({cartCount} items)</span>
                    <strong>৳{total.toLocaleString()}</strong>
                  </div>

                  <div className="bo-checkout-form">
                    <h4>Delivery Details</h4>
                    <form onSubmit={placeOrder}>
                      <input required placeholder="Your name" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
                      <input required placeholder="Delivery address" value={form.address} onChange={e => setForm(p=>({...p,address:e.target.value}))} />
                      <input required placeholder="Phone number" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
                      <button type="submit" className="bo-btn-primary">Place Order →</button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="container">
          <Link to="/" className="bo-back">← Back to portfolio</Link>

          {/* HERO */}
          <header className="bo-hero">
            <div>
              <div className="bo-badge">Online Bookstore · Bengali & English</div>
              <h1 className="bo-title">Your next great<br /><em>read awaits.</em></h1>
              <p className="bo-lead">
                A curated collection of Bengali classics, contemporary fiction, and international bestsellers.
                Search, filter, and order — delivered to your door.
              </p>
              <div className="bo-hero-stats">
                <div><span>{allBooks.length}</span><p>Books</p></div>
                <div><span>{categories.length-1}</span><p>Categories</p></div>
                <div><span>৳220</span><p>From</p></div>
              </div>
            </div>
            <button className="bo-cart-fab" onClick={() => setCartOpen(true)}>
              🛒 Cart
              {cartCount > 0 && <span className="bo-cart-badge">{cartCount}</span>}
            </button>
          </header>

          {/* CONTROLS */}
          <div className="bo-controls">
            <input
              className="bo-search"
              placeholder="Search by title or author..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="bo-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="bo-cats">
            {categories.map(c => (
              <button key={c} className={`bo-cat-btn ${cat===c?'active':''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          <p className="bo-count">{filtered.length} books found</p>

          {/* BOOKS GRID */}
          <div className="bo-books-grid">
            {filtered.map(book => (
              <div key={book.id} className="bo-book-card">
                <div className="bo-book-cover">
                  {book.cover
                    ? <img src={book.cover} alt={book.title} className="bo-book-cover-img" />
                    : <span className="bo-book-initials">{book.initials}</span>
                  }
                  {book.tag && (
                    <span className="bo-book-tag" style={{background: tagColors[book.tag]+'22', color: tagColors[book.tag], borderColor: tagColors[book.tag]+'44'}}>
                      {book.tag}
                    </span>
                  )}
                </div>
                <div className="bo-book-info">
                  <span className="bo-book-cat">{book.category}</span>
                  <h3 className="bo-book-title">{book.title}</h3>
                  <p className="bo-book-author">{book.author}</p>
                  <div className="bo-book-meta">
                    <span>{book.rating}★</span>
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="bo-book-footer">
                    <span className="bo-book-price">৳{book.price}</span>
                    <button className="bo-add-btn" onClick={() => { addToCart(book); setCartOpen(true) }}>
                      Add to Cart +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bo-no-results">
              <p>📚 No books found for "{search}"</p>
              <button className="bo-btn-outline" onClick={() => { setSearch(''); setCat('All') }}>Clear filters</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
