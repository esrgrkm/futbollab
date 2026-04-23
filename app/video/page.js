import Link from 'next/link'
import styles from './page.module.css'
import { videos } from '@/lib/data'

export default function VideoPage() {
  return (
    <div>
      <div className={styles.header}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <Link href="/" style={{ color: 'var(--green-primary)' }}>Ana Sayfa</Link> / Video Breakdown
          </p>
          <h1 className={styles.headerTitle}>Video<br /><span>Breakdown</span></h1>
          <p className={styles.headerDesc}>
            Görsel taktik analizler, açıklamalı maç incelemeleri ve konsept videoları.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {videos.map((v, i) => (
            <div
              key={v.id}
              className={styles.card}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.thumbnail} style={{ background: v.thumbnailColor }}>
                <div className={styles.playBtn}>▶</div>
                <span className={styles.duration}>{v.duration}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className="tag green">{v.category}</span>
                </div>
                <h2 className={styles.title}>{v.title}</h2>
                <p className={styles.subtitle}>{v.subtitle}</p>
                <div className={styles.footer}>
                  <span className={styles.footMeta}>{v.views} izlenme</span>
                  <span className={styles.footMeta}>·</span>
                  <span className={styles.footMeta}>{v.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
