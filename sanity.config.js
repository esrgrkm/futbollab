/**
 * Bu dosya ayrı bir Sanity Studio uygulaması için.
 * "npx sanity dev" komutuyla çalıştırılır (3333 portunda açılır).
 * Next.js uygulamasından bağımsız çalışır.
 *
 * Kurulum:
 *   npx sanity init --template clean
 *   Bu dosyayı sanity projesine kopyala
 */

// Sanity Studio yüklü değilse bu dosya derlenmez.
// Aşağıdaki import'lar npx sanity dev ortamında çözümlenir.
let defineConfig, structureTool, visionTool

try {
  ({ defineConfig } = require('sanity'))
  ;({ structureTool } = require('sanity/structure'))
  ;({ visionTool } = require('@sanity/vision'))
} catch {
  module.exports = {}
  return
}

const { schemaTypes } = require('./sanity/schemas')

module.exports = defineConfig({
  name:     'taktik-lab',
  title:    'Taktik Lab CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('İçerik')
          .items([
            S.listItem().title('Maç Analizleri').child(
              S.documentTypeList('analysis').title('Maç Analizleri')
            ),
            S.listItem().title('Scout Raporları').child(
              S.documentTypeList('scoutReport').title('Scout Raporları')
            ),
            S.listItem().title('Video Breakdownlar').child(
              S.documentTypeList('video').title('Video Breakdownlar')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
