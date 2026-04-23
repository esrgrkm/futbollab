'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/analizler',    label: 'Maç Analizleri' },
  { href: '/formasyonlar', label: 'Formasyon Lab'  },
  { href: '/editor',       label: 'Taktik Editörü' },
  { href: '/video',        label: 'Video'          },
  { href: '/scout',        label: 'Scout'          },
]

export default function Navbar() {
  const pathname  = usePathname()
  const [scrolled, setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <span className={styles.logoHex}>⬡</span>
          </div>
          <span className={styles.logoText}>TAKTİK<span>LAB</span></span>
        </Link>

        {/* Links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                  {isActive && <span className={styles.activeBar} />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className={styles.right}>
          <div className={styles.betaBadge}>
            <span className={styles.betaDot} />
            Beta
          </div>

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
    </nav>
  )
}
