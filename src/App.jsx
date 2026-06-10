import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DocFusion from './pages/DocFusion'
import VLSIChip from './pages/VLSIChip'
import SmartGlass from './pages/SmartGlass'
import BookOrdering from './pages/BookOrdering'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-appointment" element={<DocFusion />} />
        <Route path="/vlsi-chip-design" element={<VLSIChip />} />
        <Route path="/smart-glass" element={<SmartGlass />} />
        <Route path="/book-ordering" element={<BookOrdering />} />
      </Routes>
    </Router>
  )
}

export default App
