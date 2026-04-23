'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const FORMATIONS = {
  '4-3-3': [
    { id: 'gk',  label: 'KK', pos: 'Kaleci',       x: 50, y: 90 },
    { id: 'rb',  label: 'SB', pos: 'Sağ Bek',      x: 80, y: 72 },
    { id: 'rcb', label: 'ST', pos: 'Sağ Stoper',   x: 62, y: 76 },
    { id: 'lcb', label: 'ST', pos: 'Sol Stoper',   x: 38, y: 76 },
    { id: 'lb',  label: 'SB', pos: 'Sol Bek',      x: 20, y: 72 },
    { id: 'rcm', label: 'OS', pos: 'Sağ Orta',     x: 70, y: 52 },
    { id: 'cm',  label: 'OS', pos: 'Merkez',       x: 50, y: 47 },
    { id: 'lcm', label: 'OS', pos: 'Sol Orta',     x: 30, y: 52 },
    { id: 'rw',  label: 'SK', pos: 'Sağ Kanat',    x: 82, y: 28 },
    { id: 'st',  label: 'FW', pos: 'Forvet',       x: 50, y: 18 },
    { id: 'lw',  label: 'SK', pos: 'Sol Kanat',    x: 18, y: 28 },
  ],
  '4-2-3-1': [
    { id: 'gk',  label: 'KK', pos: 'Kaleci',       x: 50, y: 90 },
    { id: 'rb',  label: 'SB', pos: 'Sağ Bek',      x: 80, y: 72 },
    { id: 'rcb', label: 'ST', pos: 'Sağ Stoper',   x: 62, y: 76 },
    { id: 'lcb', label: 'ST', pos: 'Sol Stoper',   x: 38, y: 76 },
    { id: 'lb',  label: 'SB', pos: 'Sol Bek',      x: 20, y: 72 },
    { id: 'rdm', label: 'DM', pos: 'Sağ DM',       x: 62, y: 57 },
    { id: 'ldm', label: 'DM', pos: 'Sol DM',       x: 38, y: 57 },
    { id: 'rw',  label: 'SK', pos: 'Sağ Kanat',    x: 75, y: 38 },
    { id: 'cam', label: '10', pos: 'On Numara',    x: 50, y: 36 },
    { id: 'lw',  label: 'SK', pos: 'Sol Kanat',    x: 25, y: 38 },
    { id: 'st',  label: 'FW', pos: 'Forvet',       x: 50, y: 18 },
  ],
  '3-5-2': [
    { id: 'gk',  label: 'KK', pos: 'Kaleci',       x: 50, y: 90 },
    { id: 'rcb', label: 'ST', pos: 'Sağ Stoper',   x: 70, y: 76 },
    { id: 'cb',  label: 'ST', pos: 'Merkez Stoper',x: 50, y: 79 },
    { id: 'lcb', label: 'ST', pos: 'Sol Stoper',   x: 30, y: 76 },
    { id: 'rwb', label: 'KH', pos: 'Sağ Kanat H.', x: 90, y: 54 },
    { id: 'rcm', label: 'OS', pos: 'Sağ Orta',     x: 68, y: 50 },
    { id: 'cm',  label: 'OS', pos: 'Merkez',       x: 50, y: 46 },
    { id: 'lcm', label: 'OS', pos: 'Sol Orta',     x: 32, y: 50 },
    { id: 'lwb', label: 'KH', pos: 'Sol Kanat H.', x: 10, y: 54 },
    { id: 'rst', label: 'FW', pos: 'Sağ Forvet',   x: 65, y: 20 },
    { id: 'lst', label: 'FW', pos: 'Sol Forvet',   x: 35, y: 20 },
  ],
  '4-4-2': [
    { id: 'gk',  label: 'KK', pos: 'Kaleci',       x: 50, y: 90 },
    { id: 'rb',  label: 'SB', pos: 'Sağ Bek',      x: 80, y: 72 },
    { id: 'rcb', label: 'ST', pos: 'Sağ Stoper',   x: 62, y: 76 },
    { id: 'lcb', label: 'ST', pos: 'Sol Stoper',   x: 38, y: 76 },
    { id: 'lb',  label: 'SB', pos: 'Sol Bek',      x: 20, y: 72 },
    { id: 'rm',  label: 'OS', pos: 'Sağ Orta',     x: 78, y: 50 },
    { id: 'rcm', label: 'OS', pos: 'Sağ Merkez',   x: 60, y: 50 },
    { id: 'lcm', label: 'OS', pos: 'Sol Merkez',   x: 40, y: 50 },
    { id: 'lm',  label: 'OS', pos: 'Sol Orta',     x: 22, y: 50 },
    { id: 'rst', label: 'FW', pos: 'Sağ Forvet',   x: 65, y: 20 },
    { id: 'lst', label: 'FW', pos: 'Sol Forvet',   x: 35, y: 20 },
  ],
}

const TEAM_COLORS = [
  { color: '#B8F53C', label: 'Yeşil' },
  { color: '#3E8EF0', label: 'Mavi' },
  { color: '#F03E3E', label: 'Kırmızı' },
  { color: '#F0A500', label: 'Turuncu' },
  { color: '#E040FB', label: 'Mor' },
  { color: '#00BCD4', label: 'Turkuaz' },
  { color: '#FFFFFF', label: 'Beyaz' },
  { color: '#FFD700', label: 'Altın' },
]

const DRAW_TOOLS = [
  { id: 'select', icon: '◻', label: 'Seç' },
  { id: 'arrow',  icon: '→', label: 'Ok' },
  { id: 'zone',   icon: '⬡', label: 'Bölge' },
]

function PitchSVG() {
  return (
    <svg className={styles.pitchSvg} viewBox="0 0 100 150" preserveAspectRatio="none" fill="none">
      {/* Outer boundary */}
      <rect x="1" y="1" width="98" height="148" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/>
      {/* Halfway line */}
      <line x1="1" y1="75" x2="99" y2="75" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5"/>
      {/* Centre circle */}
      <circle cx="50" cy="75" r="12" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <circle cx="50" cy="75" r="0.8" fill="rgba(255,255,255,0.25)"/>
      {/* Top penalty area */}
      <rect x="22" y="1" width="56" height="22" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <rect x="34" y="1" width="32" height="10" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
      <circle cx="50" cy="16" r="0.8" fill="rgba(255,255,255,0.2)"/>
      {/* Bottom penalty area */}
      <rect x="22" y="127" width="56" height="22" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <rect x="34" y="139" width="32" height="10" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
      <circle cx="50" cy="134" r="0.8" fill="rgba(255,255,255,0.2)"/>
      {/* Top corner arcs */}
      <path d="M 1 10 Q 5 1 10 1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none"/>
      <path d="M 99 10 Q 95 1 90 1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none"/>
      {/* Bottom corner arcs */}
      <path d="M 1 140 Q 5 149 10 149" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none"/>
      <path d="M 99 140 Q 95 149 90 149" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none"/>
    </svg>
  )
}

export default function EditorPage() {
  const [formation, setFormation] = useState('4-3-3')
  const [players, setPlayers] = useState(() =>
    FORMATIONS['4-3-3'].map(p => ({ ...p }))
  )
  const [teamColor, setTeamColor] = useState('#B8F53C')
  const [selectedId, setSelectedId] = useState(null)
  const [activeTool, setActiveTool] = useState('select')
  const pitchRef = useRef(null)
  const dragging = useRef(null)

  const changeFormation = (f) => {
    setFormation(f)
    setPlayers(FORMATIONS[f].map(p => ({ ...p })))
    setSelectedId(null)
  }

  const onMouseDown = useCallback((e, id) => {
    if (activeTool !== 'select') return
    e.preventDefault()
    setSelectedId(id)
    dragging.current = id
  }, [activeTool])

  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !pitchRef.current) return
    const rect = pitchRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 3), 97)
    const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 3), 97)
    setPlayers(prev => prev.map(p => p.id === dragging.current ? { ...p, x, y } : p))
  }, [])

  const onMouseUp = useCallback(() => {
    dragging.current = null
  }, [])

  const handleCopy = () => {
    const state = JSON.stringify({ formation, players, teamColor })
    const encoded = btoa(unescape(encodeURIComponent(state)))
    navigator.clipboard.writeText(`${window.location.origin}/editor?board=${encoded}`)
      .then(() => alert('Bağlantı kopyalandı!'))
      .catch(() => alert('Kopyalanamadı, lütfen tekrar deneyin.'))
  }

  const selectedPlayer = players.find(p => p.id === selectedId)

  return (
    <div className={styles.wrapper}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}>← Ana Sayfa</Link>
            <span className={styles.topBarTitle}>Taktik <span>Editörü</span></span>
            <span className="tag green">{formation}</span>
          </div>
          <div className={styles.topBarRight}>
            <button className={styles.toolBtn} onClick={handleCopy}>Paylaş</button>
            <button className={`${styles.toolBtn} ${styles.toolBtnPrimary}`}>
              PNG İndir
            </button>
          </div>
        </div>
      </div>

      {/* Editor layout */}
      <div className={styles.editorLayout}>
        {/* Left toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolSection}>
            <p className={styles.toolSectionLabel}>Araçlar</p>
            {DRAW_TOOLS.map(t => (
              <div
                key={t.id}
                className={`${styles.toolItem} ${activeTool === t.id ? styles.active : ''}`}
                onClick={() => setActiveTool(t.id)}
              >
                <span className={styles.toolItemIcon}>{t.icon}</span>
                <span className={styles.toolItemLabel}>{t.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.toolSection}>
            <p className={styles.toolSectionLabel}>Formasyon</p>
            <div className={styles.formationPicker}>
              {Object.keys(FORMATIONS).map(f => (
                <button
                  key={f}
                  className={`${styles.formationOpt} ${formation === f ? styles.active : ''}`}
                  onClick={() => changeFormation(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pitch canvas */}
        <div className={styles.canvasArea}>
          <div className={styles.pitchContainer}>
            <div
              className={styles.pitch}
              ref={pitchRef}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <PitchSVG />
              {players.map(p => (
                <div
                  key={p.id}
                  className={`${styles.playerToken} ${selectedId === p.id ? styles.selected : ''}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onMouseDown={(e) => onMouseDown(e, p.id)}
                  onClick={() => setSelectedId(p.id)}
                >
                  <div
                    className={styles.playerTokenInner}
                    style={{ background: teamColor, color: '#070C18' }}
                  >
                    {p.label}
                  </div>
                  <span className={styles.playerName}>{p.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <p className={styles.rightPanelTitle}>Takım Rengi</p>
          <div className={styles.colorPicker}>
            {TEAM_COLORS.map(c => (
              <div
                key={c.color}
                className={`${styles.colorSwatch} ${teamColor === c.color ? styles.selected : ''}`}
                style={{ background: c.color }}
                onClick={() => setTeamColor(c.color)}
                title={c.label}
              />
            ))}
          </div>

          <p className={styles.rightPanelTitle} style={{ marginTop: '8px' }}>Oyuncular</p>
          <div className={styles.playerList}>
            {players.map(p => (
              <div
                key={p.id}
                className={`${styles.playerListItem} ${selectedId === p.id ? styles.selected : ''}`}
                onClick={() => setSelectedId(p.id)}
              >
                <div className={styles.playerListDot} style={{ background: teamColor }} />
                <span className={styles.playerListLabel}>{p.label}</span>
                <span className={styles.playerListPos}>{p.pos}</span>
              </div>
            ))}
          </div>

          <div className={styles.tip}>
            <p className={styles.tipText}>
              <strong>İpucu</strong>
              Oyuncu tokenlarını sürükleyerek istediğin pozisyona taşı.
              Renk ve formasyon değişiklikleri anlık yansır.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
