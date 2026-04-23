import Link from 'next/link'
import styles from './page.module.css'
import { analyses } from '@/lib/data'

/* 4-3-3 positions for the floating card mini-pitch */
const CARD_POSITIONS = [
  { label: 'KK', x: 50, y: 88 },
  { label: 'SB', x: 82, y: 72 }, { label: 'ST', x: 62, y: 76 },
  { label: 'ST', x: 38, y: 76 }, { label: 'SB', x: 18, y: 72 },
  { label: 'OS', x: 70, y: 52 }, { label: 'OS', x: 50, y: 47 }, { label: 'OS', x: 30, y: 52 },
  { label: 'SK', x: 82, y: 27 }, { label: 'FW', x: 50, y: 18 }, { label: 'SK', x: 18, y: 27 },
]

const SECTIONS = [
  { href: '/analizler',    icon: '◈', name: 'Maç Analizleri', desc: 'Derin taktiksel incelemeler',           accent: '#B8F53C' },
  { href: '/formasyonlar', icon: '⊞', name: 'Formasyon Lab',  desc: 'İnteraktif formasyon karşılaştırma',   accent: '#3E8EF0' },
  { href: '/editor',       icon: '✦', name: 'Taktik Editörü', desc: 'Kendi tahtanı oluştur & paylaş',       accent: '#F0A500' },
  { href: '/video',        icon: '▶', name: 'Video Breakdown', desc: 'Görsel taktik analizler',              accent: '#E040FB' },
  { href: '/scout',        icon: '◎', name: 'Scout Raporları', desc: 'Oyuncu profilleri & değerlendirmeler', accent: '#F03E3E' },
]

function MiniPitchSVG() {
  return (
    <svg className={styles.miniPitchSvg} viewBox="0 0 200 300" fill="none">
      <rect x="2" y="2" width="196" height="296" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <line x1="2" y1="150" x2="198" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
      <circle cx="100" cy="150" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
      <rect x="60" y="2" width="80" height="36" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
      <rect x="60" y="262" width="80" height="36" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
      <rect x="80" y="2" width="40" height="14" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <rect x="80" y="284" width="40" height="14" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
    </svg>
  )
}

export default function HomePage() {
  const featured   = analyses.find(a => a.featured) ?? analyses[0]
  const sideCards  = analyses.filter(a => a.slug !== featured.slug).slice(0, 2)

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Decorative blobs */}
        <div className={styles.glowBlob}  />
        <div className={styles.glowBlob2} />

        {/* Background pitch */}
        <svg className={styles.pitchBg} viewBox="0 0 800 600" fill="none">
          <rect x="40" y="20" width="720" height="560" rx="3" stroke="white" strokeWidth="2"/>
          <line x1="400" y1="20" x2="400" y2="580" stroke="white" strokeWidth="1.2"/>
          <circle cx="400" cy="300" r="80" stroke="white" strokeWidth="1.2"/>
          <circle cx="400" cy="300" r="4" fill="white"/>
          <rect x="40" y="200" width="120" height="200" stroke="white" strokeWidth="1.2"/>
          <rect x="640" y="200" width="120" height="200" stroke="white" strokeWidth="1.2"/>
          <rect x="40" y="240" width="56" height="120" stroke="white" strokeWidth="1.2"/>
          <rect x="704" y="240" width="56" height="120" stroke="white" strokeWidth="1.2"/>
          <circle cx="160" cy="300" r="5" fill="white"/>
          <circle cx="640" cy="300" r="5" fill="white"/>
          <path d="M40 118 Q96 118 96 174" stroke="white" strokeWidth="1.2" fill="none"/>
          <path d="M40 482 Q96 482 96 426" stroke="white" strokeWidth="1.2" fill="none"/>
          <path d="M760 118 Q704 118 704 174" stroke="white" strokeWidth="1.2" fill="none"/>
          <path d="M760 482 Q704 482 704 426" stroke="white" strokeWidth="1.2" fill="none"/>
        </svg>

        <div className="container">
          <div className={styles.heroContent}>
            {/* Live badge */}
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              <span className={styles.liveBadgeText}>Türkiye&#39;nin Taktik Analiz Platformu</span>
            </div>

            {/* Headline */}
            <h1 className={styles.heroTitle}>
              Futbolu
              <span className={styles.heroTitleLine2}>Oku.</span>
              <span className={styles.heroTitleLine3}>Anla.</span>
            </h1>

            <p className={styles.heroDesc}>
              Maç analizleri, formasyon laboratuvarı, scout raporları
              ve taktik editörüyle futbolun derinliklerine in.
              Türkçe, ücretsiz, derinlemesine.
            </p>

            {/* CTA */}
            <div className={styles.heroCta}>
              <Link href="/analizler" className={styles.btnPrimary}>
                Analizlere Başla
                <span className={styles.btnPrimaryArrow}>→</span>
              </Link>
              <Link href="/editor" className={styles.btnGhost}>
                Taktik Editörü
              </Link>
            </div>

            {/* Stats */}
            <div className={styles.heroStats}>
              {[
                ['48', '+', 'Maç Analizi'],
                ['12', '+', 'Formasyon'],
                ['24', '+', 'Scout Raporu'],
                ['18', '+', 'Video'],
              ].map(([n, s, l]) => (
                <div key={l} className={styles.stat}>
                  <div className={styles.statNum}>{n}<span>{s}</span></div>
                  <div className={styles.statLbl}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating formation card */}
        <div className={styles.heroCard}>
          <div className={styles.heroCardInner}>
            <p className={styles.heroCardLabel}>◈ Günün Formasyonu — 4-3-3</p>
            <div className={styles.miniPitch}>
              <MiniPitchSVG />
              {CARD_POSITIONS.map((p, i) => (
                <div key={i} className={styles.miniDot} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  <div className={styles.miniDotInner}>{p.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.heroCardFooter}>
              <div>
                <div className={styles.heroCardMatch}>Galatasaray — Fenerbahçe</div>
                <div className={styles.heroCardMeta}>Süper Lig · 4. Hafta</div>
              </div>
              <div className={styles.heroCardBadge}>2–1</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM SECTIONS ── */}
      <section className={styles.sectionsStrip}>
        <div className="container">
          <div className={styles.stripHeader}>
            <span className={styles.stripLine} />
            <span className={styles.stripLabel}>Platform Bölümleri</span>
            <span className={styles.stripLine} />
          </div>
          <div className={styles.cards}>
            {SECTIONS.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className={styles.sectionCard}
                style={{ '--cardAccent': s.accent }}
              >
                <span className={styles.cardIcon}>{s.icon}</span>
                <span className={styles.cardName}>{s.name}</span>
                <span className={styles.cardDesc}>{s.desc}</span>
                <span className={styles.cardCta}>Keşfet →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ANALYSES ── */}
      <section className={styles.analysesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Öne Çıkan <span>Analizler</span></h2>
            <Link href="/analizler" className={styles.viewAll}>Tümünü Gör →</Link>
          </div>

          <div className={styles.analysisGrid}>
            {/* Big featured card */}
            <Link href={`/analizler/${featured.slug}`} className={styles.analysisCardFeatured}>
              <div className={styles.featuredBand} style={{ background: featured.coverColor }} />
              <div className={styles.featuredBody}>
                <div className={styles.featuredMeta}>
                  <span className="tag green">{featured.formation}</span>
                  <span className="tag">{featured.category}</span>
                  <span className="tag amber">{featured.competition}</span>
                </div>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.featuredFooter}>
                  <span className={styles.footerMeta}>{featured.team} vs {featured.opponent}</span>
                  <span className={styles.footerMeta}>·</span>
                  <span className={styles.footerMeta}>{featured.readTime} dk</span>
                </div>
              </div>
            </Link>

            {/* Small side cards */}
            {sideCards.map(a => (
              <Link key={a.slug} href={`/analizler/${a.slug}`} className={styles.analysisCardSmall}>
                <div className={styles.smallBand} style={{ background: a.coverColor }} />
                <div className={styles.smallBody}>
                  <div className={styles.smallMeta}>
                    <span className="tag green">{a.formation}</span>
                    <span className="tag">{a.category}</span>
                  </div>
                  <h3 className={styles.smallTitle}>{a.title}</h3>
                  <div className={styles.smallFooter}>
                    <span className={styles.footerMeta}>{a.competition}</span>
                    <span className={styles.footerMeta}>·</span>
                    <span className={styles.footerMeta}>{a.readTime} dk</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
