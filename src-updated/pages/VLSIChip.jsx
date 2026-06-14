import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './VLSIChip.css'

const circuits = [
  {
    id: 1, name: 'NAND Gate', type: 'Logic Gate', transistors: 4,
    delay: '0.12ns', power: '0.8mW', area: '12μm²',
    desc: '2-input CMOS NAND gate — universal gate used in all digital logic designs.',
    schematic: [
      { x:50, y:80, w:40, h:20, label:'VDD', color:'#a8ff78' },
      { x:50, y:110, w:20, h:30, label:'PMOS 1', color:'#4a9eff' },
      { x:80, y:110, w:20, h:30, label:'PMOS 2', color:'#4a9eff' },
      { x:60, y:160, w:20, h:30, label:'NMOS 1', color:'#ff9f4a' },
      { x:60, y:200, w:20, h:30, label:'NMOS 2', color:'#ff9f4a' },
      { x:50, y:240, w:40, h:20, label:'GND', color:'#666' },
    ]
  },
  {
    id: 2, name: 'NOR Gate', type: 'Logic Gate', transistors: 4,
    delay: '0.15ns', power: '0.9mW', area: '14μm²',
    desc: '2-input CMOS NOR gate — complement of OR, used in PLA structures.',
    schematic: []
  },
  {
    id: 3, name: 'XOR Gate', type: 'Combinational', transistors: 8,
    delay: '0.28ns', power: '1.4mW', area: '24μm²',
    desc: 'Exclusive-OR built from NAND/NOR combination — core of arithmetic units.',
    schematic: []
  },
  {
    id: 4, name: 'Full Adder', type: 'Arithmetic', transistors: 28,
    delay: '0.64ns', power: '3.2mW', area: '86μm²',
    desc: '1-bit full adder with carry-in/out — the building block of all ALUs.',
    schematic: []
  },
  {
    id: 5, name: 'D Flip-Flop', type: 'Sequential', transistors: 16,
    delay: '0.42ns', power: '2.1mW', area: '52μm²',
    desc: 'Edge-triggered D flip-flop — used for registers and state machines.',
    schematic: []
  },
  {
    id: 6, name: '4-bit Ripple Counter', type: 'Sequential', transistors: 64,
    delay: '2.1ns', power: '8.4mW', area: '210μm²',
    desc: '4-bit asynchronous ripple counter using D flip-flops in cascade.',
    schematic: []
  },
]

const tools = [
  { name:'DSCH3', role:'Schematic & Logic Simulation', color:'#4a9eff' },
  { name:'Microwind', role:'Layout Design & DRC', color:'#a8ff78' },
  { name:'SPICE', role:'Circuit Simulation', color:'#ff9f4a' },
  { name:'0.12μm CMOS', role:'Technology Node', color:'#c084fc' },
]

const waveformData = [
  { label:'A', bits:'0011001100110011' },
  { label:'B', bits:'0101010101010101' },
  { label:'Y (NAND)', bits:'1110111011101110' },
  { label:'CLK', bits:'0101010101010101' },
  { label:'Q (FF)', bits:'0000111100001111' },
]

export default function VLSIChip() {
  const [active, setActive] = useState(null)

  return (
    <>
      <Navbar />
      <main className="vlsi-page">
        <div className="container">
          <Link to="/" className="vlsi-back">← Back to portfolio</Link>

          {/* HERO */}
          <header className="vlsi-hero">
            <div className="vlsi-hero-left">
              <div className="vlsi-badge">CMOS · 0.12μm · DSCH3 · Microwind</div>
              <h1 className="vlsi-title">VLSI Chip<br /><em>Design</em></h1>
              <p className="vlsi-lead">
                Complete digital VLSI design flow — from RTL schematic to physical layout.
                6 circuits designed, simulated, and verified using industry-standard EDA tools.
              </p>
              <div className="vlsi-stats-row">
                <div><span>6</span><p>Circuits</p></div>
                <div><span>124+</span><p>Transistors</p></div>
                <div><span>0.12μm</span><p>Technology</p></div>
                <div><span>100%</span><p>DRC Clean</p></div>
              </div>
            </div>

            {/* Animated chip visual */}
            <div className="vlsi-chip-art">
              <div className="vlsi-chip-outer">
                <div className="vlsi-chip-inner">
                  <div className="vlsi-chip-core">
                    <span>VLSI</span>
                    <span className="vlsi-chip-sub">0.12μm</span>
                  </div>
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <div key={i} className={`vlsi-pin pin-${i}`} />
                  ))}
                </div>
                <div className="vlsi-chip-glow" />
              </div>
              <div className="vlsi-chip-grid">
                {Array.from({length:64}).map((_,i) => (
                  <div key={i} className="vlsi-grid-cell" style={{animationDelay:`${(i*0.05)%2}s`}} />
                ))}
              </div>
            </div>
          </header>

          {/* TOOLS */}
          <section className="vlsi-section">
            <div className="vlsi-eyebrow">§ Tools & Technology</div>
            <h2 className="vlsi-section-title">EDA Toolchain.</h2>
            <div className="vlsi-tools">
              {tools.map(t => (
                <div key={t.name} className="vlsi-tool-card" style={{'--tc': t.color}}>
                  <span className="vlsi-tool-name">{t.name}</span>
                  <span className="vlsi-tool-role">{t.role}</span>
                </div>
              ))}
            </div>
          </section>

          {/* WAVEFORM SIMULATOR */}
          <section className="vlsi-section">
            <div className="vlsi-eyebrow">§ Simulation Output</div>
            <h2 className="vlsi-section-title">Waveform Viewer.</h2>
            <div className="vlsi-waveform-wrap">
              <div className="vlsi-waveform-header">
                <span>Signal</span><span>0ns</span><span>50ns</span><span>100ns</span><span>150ns</span>
              </div>
              {waveformData.map(w => (
                <div key={w.label} className="vlsi-waveform-row">
                  <span className="vlsi-waveform-label">{w.label}</span>
                  <div className="vlsi-waveform-track">
                    {w.bits.split('').map((b, i) => (
                      <div
                        key={i}
                        className={`vlsi-bit ${b === '1' ? 'high' : 'low'}`}
                        style={{width:`${100/w.bits.length}%`}}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CIRCUITS */}
          <section className="vlsi-section">
            <div className="vlsi-eyebrow">§ Designed Circuits</div>
            <h2 className="vlsi-section-title">Circuit Library.</h2>
            <div className="vlsi-circuits-grid">
              {circuits.map(c => (
                <div
                  key={c.id}
                  className={`vlsi-circuit-card ${active === c.id ? 'expanded' : ''}`}
                  onClick={() => setActive(active === c.id ? null : c.id)}
                >
                  <div className="vlsi-circuit-top">
                    <div>
                      <span className="vlsi-circuit-type">{c.type}</span>
                      <h3 className="vlsi-circuit-name">{c.name}</h3>
                    </div>
                    <div className="vlsi-circuit-meta">
                      <span>{c.transistors}T</span>
                      <span>{c.delay}</span>
                      <span>{c.power}</span>
                    </div>
                  </div>
                  {active === c.id && (
                    <div className="vlsi-circuit-detail">
                      <p>{c.desc}</p>
                      <div className="vlsi-circuit-specs">
                        <div><span>Transistors</span><strong>{c.transistors}</strong></div>
                        <div><span>Propagation Delay</span><strong>{c.delay}</strong></div>
                        <div><span>Power</span><strong>{c.power}</strong></div>
                        <div><span>Area</span><strong>{c.area}</strong></div>
                      </div>
                      {/* Mini schematic visualization */}
                      <div className="vlsi-layout-preview">
                        <div className="vlsi-layout-label">Layout Preview</div>
                        <div className="vlsi-layout-blocks">
                          {Array.from({length: Math.min(c.transistors, 12)}).map((_,i) => (
                            <div
                              key={i}
                              className={`vlsi-block ${i % 2 === 0 ? 'pmos' : 'nmos'}`}
                              style={{animationDelay:`${i*0.1}s`}}
                            />
                          ))}
                        </div>
                        <div className="vlsi-layout-legend">
                          <span className="pmos-dot" /> PMOS
                          <span className="nmos-dot" /> NMOS
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="vlsi-expand-btn">
                    {active === c.id ? 'Collapse ↑' : 'Details →'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* DESIGN FLOW */}
          <section className="vlsi-section">
            <div className="vlsi-eyebrow">§ Design Methodology</div>
            <h2 className="vlsi-section-title">Full Design Flow.</h2>
            <div className="vlsi-flow">
              {[
                { step:'01', title:'RTL Design', desc:'Boolean expression → DSCH3 schematic entry' },
                { step:'02', title:'Logic Simulation', desc:'Waveform verification of truth table' },
                { step:'03', title:'Physical Layout', desc:'CMOS layout in Microwind 0.12μm process' },
                { step:'04', title:'DRC Check', desc:'Design Rule Check — zero violations' },
                { step:'05', title:'Timing Analysis', desc:'Propagation delay & power measurement' },
              ].map(f => (
                <div key={f.step} className="vlsi-flow-step">
                  <span className="vlsi-flow-num">{f.step}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
