'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { analyses } from '@/lib/data'

const categories = ['Tümü', 'Takım Analizi', 'Savunma Analizi', 'Taktik Konsept', 'Orta Saha Analizi', 'Süper Lig']

export default function AnalizlerPage() {
  const [activeFilter, setActiveFilter] = useState('Tümü')

  const filtered = activeFilter === 'Tümü'
    ? analyses
    : analyses.filter(a => a.category === activeFilter || a.tags.includes(activeFilter.toLowerCase()) || a.competition === activeFilter)

  return (
    <div>
      <div className={styles.header}>
        <div className="container">
          <p className={styles.breadcrumb}><Link href="/">Ana Sayfa</Link> / Maç Analizleri</p>
          <h1 className={styles.headerTitle}>Maç<br/><span>Analizleri</span></h1>
          <p className={styles.headerDesc}>
            Süper Lig, Şampiyonlar Ligi ve dünya futbolundan derinlemesine taktik incelemeler.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((a, i) => (
            <Link
              key={a.slug}
              href={`/analizler/${a.slug}`}
              className={styles.card}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={styles.cardBand} style={{ background: a.coverColor }} />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className="tag green">{a.formation}</span>
                  <span className="tag">{a.category}</span>
                </div>
                <h2 className={styles.cardTitle}>{a.title}</h2>
                <p className={styles.cardSubtitle}>{a.subtitle}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.footerLeft}>
                    <span className={styles.meta}>{a.competition}</span>
                    <span className={styles.meta}>· {a.readTime} dk</span>
                  </div>
                  <span className={styles.readMore}>Oku →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
