export const analysisSchema = {
  name: 'analysis',
  title: 'Maç Analizi',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    },
    {
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: 'İçerik',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'tacticalBoard',
          title: 'Taktik Tahta',
          fields: [
            { name: 'caption', title: 'Açıklama', type: 'string' },
            {
              name: 'formation',
              title: 'Formasyon',
              type: 'string',
              options: {
                list: ['4-3-3','4-2-3-1','3-5-2','4-4-2','5-3-2','4-3-2-1'],
              },
            },
            { name: 'teamColor', title: 'Takım Rengi (hex)', type: 'string' },
          ],
        },
        {
          type: 'object',
          name: 'highlightBox',
          title: 'Vurgu Kutusu',
          fields: [
            { name: 'text', title: 'Metin', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          'Takım Analizi','Savunma Analizi','Taktik Konsept',
          'Orta Saha Analizi','Pozisyon Analizi',
        ],
      },
    },
    {
      name: 'formation',
      title: 'Formasyon',
      type: 'string',
      options: {
        list: ['4-3-3','4-2-3-1','3-5-2','4-4-2','5-3-2','4-3-2-1'],
      },
    },
    { name: 'team',        title: 'Ev Sahibi Takım', type: 'string' },
    { name: 'opponent',    title: 'Deplasman Takımı', type: 'string' },
    { name: 'result',      title: 'Skor',             type: 'string' },
    { name: 'competition', title: 'Lig / Turnuva',    type: 'string' },
    { name: 'readTime',    title: 'Okuma Süresi (dk)',type: 'number' },
    { name: 'coverColor',  title: 'Kart Rengi (hex)', type: 'string' },
    { name: 'featured',    title: 'Öne Çıkar',        type: 'boolean' },
    {
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'team', media: 'coverImage' },
  },
}
