# Taktik Lab — Kurulum Rehberi

## ⚡ Hızlı Başlangıç (Sanity olmadan)

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev
```
→ http://localhost:3000 adresinde açılır.
Sanity bağlantısı olmasa bile tüm sayfalar **mock veriyle** çalışır.

---

## 🗄️ Sanity CMS Kurulumu

### Adım 1 — Sanity Projesi Oluştur

```bash
# Sanity CLI kur
npm install -g sanity

# Yeni proje başlat (ayrı bir klasörde)
mkdir taktik-lab-studio && cd taktik-lab-studio
sanity init
```
- **Project name:** taktik-lab  
- **Dataset:** production  
- **Template:** Clean project  

### Adım 2 — `.env.local` Yarat

Taktik Lab proje kök dizinine `.env.local` oluştur:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=buraya-proje-id
NEXT_PUBLIC_SANITY_DATASET=production
```

Proje ID'ni `sanity.io/manage` → projen → **Settings** altında bulabilirsin.

### Adım 3 — CORS Ayarı

`sanity.io/manage` → Projen → **API** → **CORS Origins** → **Add CORS origin:**
```
http://localhost:3000
```
Prodüksiyonda Vercel domain'ini de ekle.

### Adım 4 — Şemaları Kopyala

`sanity/schemas/` klasörünü Sanity Studio projesine kopyala ve `sanity.config.js`'i güncelle.

### Adım 5 — Studio'yu Başlat

```bash
cd taktik-lab-studio
sanity dev
```
→ http://localhost:3333 adresinde Sanity Studio açılır.

---

## 📁 Proje Yapısı

```
taktik-lab/
├── app/
│   ├── page.js                  → Ana Sayfa
│   ├── analizler/
│   │   ├── page.js              → Analiz Listesi + Filtreler
│   │   └── [slug]/page.js       → Tekil Analiz (Pitch Diyagramı + Sidebar)
│   ├── formasyonlar/page.js     → Formasyon Lab (İnteraktif)
│   ├── editor/page.js           → Taktik Editörü (Sürükle-Bırak)
│   ├── video/page.js            → Video Breakdown
│   └── scout/page.js            → Scout Raporları
│
├── components/Navbar/           → Fixed Navbar
│
├── lib/
│   ├── data.js                  → Mock veri (Sanity yokken fallback)
│   └── sanity.js                → Sanity client + GROQ queries
│
├── sanity/schemas/
│   ├── analysis.js              → Maç Analizi şeması
│   ├── scoutReport.js           → Scout Raporu şeması
│   ├── video.js                 → Video şeması
│   └── index.js                 → Şema export
│
├── sanity.config.js             → Sanity Studio config (ayrı çalışır)
├── .env.local.example           → Env örneği
└── KURULUM.md                   → Bu dosya
```

---

## 🎨 Design System

| Değişken | Değer | Kullanım |
|----------|-------|----------|
| `--bg-base` | `#070C18` | Ana arka plan |
| `--bg-surface` | `#0D1424` | Kart arka planı |
| `--green-primary` | `#B8F53C` | Ana vurgu, CTA |
| `--amber` | `#F0A500` | İkincil vurgu |
| `--font-display` | Barlow Condensed | Başlıklar |
| `--font-body` | DM Sans | Gövde metni |

---

## 🛠️ Komutlar

```bash
npm run dev      # Geliştirme sunucusu (localhost:3000)
npm run build    # Prodüksiyon build
npm run start    # Prodüksiyon sunucusu
npm run lint     # ESLint kontrolü
```

---

## 🚀 Vercel'e Deploy

1. [vercel.com](https://vercel.com) → **Add New Project** → GitHub reposunu bağla
2. **Environment Variables** ekle:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your-project-id
   NEXT_PUBLIC_SANITY_DATASET    = production
   ```
3. **Deploy!** — Vercel otomatik olarak `npm run build` çalıştırır.
4. Sanity CORS Origins'e Vercel URL'ini ekle.

---

## 🔧 Sıradaki Adımlar

- [ ] Sanity CMS'i bağla ve gerçek içerik gir
- [ ] Mini oyunlar (Footle, LineUp, Grid)
- [ ] Kullanıcı yorumları / beğeni sistemi
- [ ] Plausible Analytics entegrasyonu
- [ ] PWA desteği (offline, push bildirim)
