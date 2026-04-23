import Link from 'next/link'
import styles from './page.module.css'
import { scoutReports } from '@/lib/data'

const ATTR_LABELS = {
  teknik: 'Teknik', vizyon: 'Vizyon', hız: 'Hız',
  fizik: 'Fizik', savunma: 'Savunma', mentaliite: 'Mental',
}

const AVATAR_COLORS = ['#B8F53C', '#3E8EF0', '#F0A500', '#F03E3E', '#E040FB']

function getVerdictClass(verdict) {
  if (verdict === 'Takip Et') return styles.verdictGreen
  if (verdict === 'İzlemeye Devam') return styles.verdictAmber
  return styles.verdictBlue
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2)
}

export default function ScoutPage() {
  return (
    <div>
      <div className={styles.header}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <Link href="/" style={{ color: 'var(--green-primary)' }}>Ana Sayfa</Link> / Scout Raporları
          </p>
          <h1 className={styles.headerTitle}>Scout<br /><span>Raporları</span></h1>
          <p className={styles.headerDesc}>
            Oyuncu profilleri, performans değerlendirmeleri ve yetenek analizleri.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {scoutReports.map((r, i) => {
            const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length]
            return (
              <div key={r.id} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.avatar} style={{ background: avatarColor }}>
                    {initials(r.playerName)}
                  </div>
                  <div className={styles.playerInfo}>
                    <div className={styles.playerName}>{r.playerName}</div>
                    <div className={styles.playerMeta}>
                      {r.position}<br />
                      {r.team} · {r.league}<br />
                      {r.nationality} · {r.age} yaş
                    </div>
                  </div>
                  <div className={styles.rating}>
                    <div className={styles.ratingNumber}>{r.overallRating}</div>
                    <div className={styles.ratingLabel}>OVR</div>
                  </div>
                </div>

                {/* Attributes */}
                <div className={styles.attrs}>
                  {Object.entries(r.attributes).map(([key, val]) => (
                    <div key={key} className={styles.attrRow}>
                      <span className={styles.attrLabel}>{ATTR_LABELS[key]}</span>
                      <div className={styles.attrBar}>
                        <div
                          className={styles.attrFill}
                          style={{
                            width: `${val}%`,
                            background: val >= 85 ? 'var(--green-primary)'
                              : val >= 75 ? 'var(--amber)'
                              : 'var(--text-muted)',
                          }}
                        />
                      </div>
                      <span className={styles.attrValue}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  <p className={styles.summary}>{r.summary}</p>

                  <div>
                    <p className={styles.swTitle}>Güçlü Yanlar</p>
                    <div className={styles.swList}>
                      {r.strengths.slice(0, 3).map(s => (
                        <div key={s} className={styles.swItem}>{s}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className={styles.swTitle}>Gelişim Alanları</p>
                    <div className={styles.swList}>
                      {r.weaknesses.slice(0, 2).map(w => (
                        <div key={w} className={`${styles.swItem} ${styles.weak}`}>{w}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className={styles.cardFooter}>
                  <span className={`${styles.verdictBadge} ${getVerdictClass(r.verdict)}`}>
                    {r.verdict}
                  </span>
                  <span className={styles.footerMeta}>Potansiyel: {r.potential}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
