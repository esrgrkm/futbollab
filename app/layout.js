import './globals.css'

export const metadata = {
  title: 'Taktik Lab — Futbol Analiz Platformu',
  description: 'Maç analizleri, formasyon laboratuvarı, taktik editörü ve daha fazlası.',
}

import Navbar from '@/components/Navbar/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="pageWrapper">
          {children}
        </main>
      </body>
    </html>
  )
}
