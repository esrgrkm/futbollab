import Link from 'next/link'
import styles from './page.module.css'
import { analyses, getAnalysisBySlug } from '@/lib/data'

export function generateStaticParams() {
  return analyses.map(a => ({ slug: a.slug }))
}

function PitchDiagram({ formation, teamColor = '#B8F53C' }) {
  const positions = {
    '4-3-3': [
      { label: 'KK', x: 50, y: 88 },
      { label: 'SB', x: 82, y: 70 }, { label: 'ST', x: 63, y: 73 },
      { label: 'ST', x: 37, y: 73 }, { label: 'SB', x: 18, y: 70 },
      { label: 'OS', x: 70, y: 50 }, { label: 'OS', x: 50, y: 46 }, { label: 'OS', x: 30, y: 50 },
      { label: 'SK', x: 80, y: 28 }, { label: 'FW', x: 50, y: 20 }, { label: 'SK', x: 20, y: 28 },
    ],
    '4-2-3-1': [
      { label: 'KK', x: 50, y: 88 },
      { label: 'SB', x: 82, y: 70 }, { label: 'ST', x: 63, y: 73 },
      { label: 'ST', x: 37, y: 73 }, { label: 'SB', x: 18, y: 70 },
      { label: 'DM', x: 63, y: 57 }, { label: 'DM', x: 37, y: 57 },
      { label: 'SK', x: 75, y: 38 }, { label: '10', x: 50, y: 36 }, { label: 'SK', x: 25, y: 38 },
      { label: 'FW', x: 50, y: 20 },
    ],
  }
  const pos = positions[formation] || positions['4-3-3']

  return (
    <div className={styles.pitch}>
      <svg className={styles.pitchLines} viewBox="0 0 400 267" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="396" height="263" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="200" y1="2" x2="200" y2="265" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="200" cy="133" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="200" cy="133" r="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="2" y="90" width="60" height="87" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <rect x="338" y="90" width="60" height="87" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <rect x="2" y="107" width="28" height="53" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="370" y="107" width="28" height="53" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      </svg>
      {pos.map((p, i) => (
        <div
          key={i}
          className={styles.playerDot}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div
            className={styles.playerDotInner}
            style={{ background: teamColor, color: '#070C18' }}
          >
            {p.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AnalysisPage({ params }) {
  const analysis = getAnalysisBySlug(params.slug)
  const related = analyses.filter(a => a.slug !== params.slug).slice(0, 3)

  if (!analysis) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--text-primary)' }}>
          Analiz bulunamadı
        </h1>
        <Link href="/analizler" style={{ color: 'var(--green-primary)', marginTop: '16px', display: 'inline-block' }}>
          ← Tüm analizlere dön
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.hero} style={{ borderTop: `3px solid ${analysis.coverColor}` }}>
        <div className="container">
          <Link href="/analizler" className={styles.back}>← Maç Analizleri</Link>
          <div className={styles.heroMeta}>
            <span className="tag green">{analysis.formation}</span>
            <span className="tag">{analysis.category}</span>
            <span className="tag amber">{analysis.competition}</span>
          </div>
          <h1 className={styles.heroTitle}>{analysis.title}</h1>
          <p className={styles.heroSubtitle}>{analysis.subtitle}</p>
          <div className={styles.scoreBadge}>
            {analysis.team} <em>{analysis.result}</em> {analysis.opponent}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Article */}
          <article className={styles.article}>
            <h2>Genel Bakış</h2>
            <p>
              {analysis.team} bu maçta {analysis.formation} sistemini esas alarak sahaya çıktı.
              Maç boyunca hücum organizasyonunda belirgin bir yapısal tutarlılık göze çarparken,
              rakip top aldığında anlık pressing geçişleri de dikkat çekti.
            </p>
            <p>
              {analysis.opponent} ise zaman zaman blok düşürüp counter-attack tercih ederken,
              belirli faz geçişlerinde baskıya maruz kaldı. Her iki takımın da top olmadan
              harcadığı enerji ve savunma organizasyonu, maçın seyrini belirleyen temel etkenlerden biri oldu.
            </p>

            {/* Tactical board */}
            <div className={styles.tacticalBoard}>
              <div className={styles.boardLabel}>◈ Taktik Tahta — {analysis.team} Formasyon</div>
              <PitchDiagram formation={analysis.formation} teamColor={analysis.coverColor} />
              <p className={styles.boardCaption}>
                {analysis.team} — {analysis.formation} başlangıç yerleşimi
              </p>
            </div>

            <h2>Pressing Organizasyonu</h2>
            <p>
              Yüksek pressing, modern futbolda takımların topla ve topsuz fazlarını birbirine
              bağlayan en kritik mekanizmalardan biri haline geldi. Bu maçta {analysis.team},
              ilk 20 dakikada belirgin biçimde yüksek pressing uyguladı.
            </p>

            <div className={styles.highlight}>
              <p>
                ⚡ <strong>Kilit Gözlem:</strong> İlk yarının son 15 dakikasında {analysis.team},
                pressing yoğunluğunu düşürerek blok savunmaya geçti. Bu taktiksel tercih,
                fiziksel yorgunluktan değil, stratejik bir enerji yönetiminden kaynaklanıyordu.
              </p>
            </div>

            <h2>Kanat Kullanımı ve Genişlik</h2>
            <p>
              {analysis.formation} sisteminin doğası gereği kanatlar, hem savunmada hem hücumda
              kritik bir yük taşıdı. Sağ kanatta süregelen yoğun trafiğe karşın sol kanat
              daha özgür pozisyonlar bulabildi.
            </p>
            <ul>
              <li>Sağ kanat hücum koridoru daha sık kullanıldı (%58 pas yoğunluğu)</li>
              <li>Sol bek yüksek pozisyon almakta isteksiz davrandı</li>
              <li>İki kanat oyuncusu arası mesafe dengesi, orta sahada sayısal üstünlük sağladı</li>
            </ul>

            <h2>Top Kaybı Sonrası Geçişler</h2>
            <p>
              Bu maçın en ilgi çekici boyutlarından biri, top kaybı sonrası her iki takımın da
              geçiş hızıydı. {analysis.team} için ortalama geçiş süresi 3.2 saniye iken,
              rakip bu süreyi 4.8 saniyeye kadar çıkardı.
            </p>
            <p>
              Geçiş fazında özellikle ikinci golün anatomisi dikkat çekiciydi: top kaybından
              ağa kadar yalnızca 7 pas ve 8.4 saniye geçti. Bu, sezonun en hızlı hücumlarından biriydi.
            </p>

            <h2>Sonuç ve Değerlendirme</h2>
            <p>
              {analysis.result} bitişiyle sonuçlanan bu maç, {analysis.team}&#39;in taktiksel
              üstünlüğünü net biçimde yansıttı. Bilhassa ikinci yarıda baskı üstünlüğü sağlanması
              ve savunma organizasyonundaki disiplin, maçı belirleyen başlıca etkenlerdi.
            </p>
            <p>
              Önümüzdeki haftalarda rakip takımların bu sisteme karşı nasıl bir antitez
              geliştireceğini görmek son derece ilginç olacak.
            </p>
          </article>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sideWidget}>
              <div className={styles.sideWidgetTitle}>Maç Bilgileri</div>
              <div className={styles.matchInfo}>
                {[
                  ['Maç', `${analysis.team} vs ${analysis.opponent}`],
                  ['Skor', analysis.result],
                  ['Formasyon', analysis.formation],
                  ['Lig', analysis.competition],
                  ['Tarih', analysis.date],
                  ['Okuma', `${analysis.readTime} dk`],
                ].map(([label, value]) => (
                  <div key={label} className={styles.matchRow}>
                    <span className={styles.matchRowLabel}>{label}</span>
                    <span className={styles.matchRowValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sideWidget}>
              <div className={styles.sideWidgetTitle}>Etiketler</div>
              <div className={styles.tagList}>
                {analysis.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.sideWidget}>
              <div className={styles.sideWidgetTitle}>İlgili Analizler</div>
              {related.map(r => (
                <Link key={r.slug} href={`/analizler/${r.slug}`} className={styles.relatedLink}>
                  <div className={styles.relatedTitle}>{r.title}</div>
                  <div className={styles.relatedMeta}>{r.formation} · {r.readTime} dk</div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
