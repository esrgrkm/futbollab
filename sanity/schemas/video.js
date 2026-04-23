export const videoSchema = {
  name: 'video',
  title: 'Video Breakdown',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Başlık',      type: 'string', validation: R => R.required() },
    { name: 'subtitle',    title: 'Alt Başlık',  type: 'string' },
    { name: 'category',    title: 'Kategori',    type: 'string' },
    { name: 'duration',    title: 'Süre (mm:ss)',type: 'string' },
    { name: 'views',       title: 'İzlenme',     type: 'string' },
    { name: 'youtubeId',   title: 'YouTube ID',  type: 'string' },
    { name: 'thumbnailColor', title: 'Thumbnail Rengi', type: 'string' },
    {
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    { name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
}
