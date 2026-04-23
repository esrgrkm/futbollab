'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { formations } from '@/lib/data'

function PitchSVG() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="196" height="296" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <line x1="2" y1="150" x2="198" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <circle cx="100" cy="150" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <circle cx="100" cy="150" r="1.5" fill="rgba(255,255,255,0.2)"/>
      <rect x="60" y="2" width="80" height="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <rect x="80" y="2" width="40" height="16" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <rect x="60" y="262" width="80" height="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <rect x="80" y="282" width="40" height="16" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="100" cy="38" r="1.5" fill="rgba(255,255,255,0.2)"/>
      <circle cx="100" cy="262" r="1.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  )
}

export default function FormasyonlarPage() {
  const [selected, setSelected] = useState(formations[0])

  return (
    <div>
      <div className={styles.header}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <Link href="/" style={{ color: 'var(--green-primary)' }}>Ana Sayfa</Link> / Formasyon Lab
          </p>
          <h1 className={styles.headerTitle}>Formasyon<br /><span>Laboratuvarı</span></h1>
          <p className={styles.headerDesc}>
            Farklı formasyonların güçlü ve zayıf yanlarını keşfet, pozisyonları incele.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Formation list */}
          <div className={styles.formationList}>
            <p className={styles.listLabel}>Formasyonlar</p>
            {formations.map(f => (
              <div
                key={f.id}
                className={`${styles.listItem} ${selected.id === f.id ? styles.selected : ''}`}
                onClick={() => setSelected(f)}
              >
                <span className={styles.listName}>{f.name}</span>
                <span className={styles.listCategory}>{f.category}</span>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className={styles.detail}>
            <div className={styles.detailHeader}>
              <div>
                <div className={styles.detailName}>{selected.name}</div>
                <p className={styles.detailDesc}>{selected.description}</p>
              </div>
              <span className="tag amber">{selected.category}</span>
            </div>

            <div className={styles.detailBody}>
              {/* Pitch */}
              <div className={styles.pitchPanel}>
                <p className={styles.pitchLabel}>◈ Pozisyon Diyagramı</p>
                <div className={styles.pitch}>
                  <PitchSVG />
                  {selected.positions.map((p, i) => (
                    <div
                      key={p.id}
                      className={styles.playerDot}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      <div className={styles.playerDotInner}>
                        {p.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className={styles.infoPanel}>
                <div className={styles.infoSection}>
                  <h4>Güçlü Yanlar</h4>
                  <ul className={styles.strengthsList}>
                    {selected.strengths.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>

                <div className={styles.infoSection}>
                  <h4>Zayıf Yanlar</h4>
                  <ul className={styles.weaknessList}>
                    {selected.weaknesses.map(w => <li key={w}>{w}</li>)}
                  </ul>
                </div>

                <div className={styles.infoSection}>
                  <h4>Bu Formasyon Kullanan Takımlar</h4>
                  <div className={styles.teamList}>
                    {selected.famousTeams.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
