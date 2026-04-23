import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source) => builder.image(source)

// ── GROQ Queries ──────────────────────────────────────────

export const QUERIES = {
  // All analyses (list)
  allAnalyses: `*[_type == "analysis"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    category,
    formation,
    team,
    opponent,
    result,
    competition,
    publishedAt,
    readTime,
    tags,
    coverColor,
    featured,
    excerpt,
  }`,

  // Single analysis by slug
  analysisBySlug: `*[_type == "analysis" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    category,
    formation,
    team,
    opponent,
    result,
    competition,
    publishedAt,
    readTime,
    tags,
    coverColor,
    excerpt,
    body,
    tacticalBoards[] {
      caption,
      formation,
      teamColor,
      positions
    }
  }`,

  // Featured analyses for homepage
  featuredAnalyses: `*[_type == "analysis" && featured == true] | order(publishedAt desc)[0..3] {
    _id, title, subtitle, slug, formation, category,
    competition, readTime, coverColor, excerpt, featured
  }`,

  // All scout reports
  allScoutReports: `*[_type == "scoutReport"] | order(reportDate desc) {
    _id,
    playerName,
    age,
    nationality,
    position,
    team,
    league,
    season,
    overallRating,
    potential,
    reportDate,
    summary,
    attributes,
    strengths,
    weaknesses,
    verdict,
  }`,

  // All videos
  allVideos: `*[_type == "video"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    category,
    duration,
    views,
    publishedAt,
    tags,
    thumbnailColor,
    youtubeId,
  }`,
}

// ── Fetch helpers (with fallback) ─────────────────────────

export async function fetchAnalyses() {
  try {
    return await sanityClient.fetch(QUERIES.allAnalyses)
  } catch {
    const { analyses } = await import('./data')
    return analyses
  }
}

export async function fetchAnalysisBySlug(slug) {
  try {
    return await sanityClient.fetch(QUERIES.analysisBySlug, { slug })
  } catch {
    const { getAnalysisBySlug } = await import('./data')
    return getAnalysisBySlug(slug)
  }
}

export async function fetchFeaturedAnalyses() {
  try {
    return await sanityClient.fetch(QUERIES.featuredAnalyses)
  } catch {
    const { analyses } = await import('./data')
    return analyses.filter(a => a.featured)
  }
}

export async function fetchScoutReports() {
  try {
    return await sanityClient.fetch(QUERIES.allScoutReports)
  } catch {
    const { scoutReports } = await import('./data')
    return scoutReports
  }
}

export async function fetchVideos() {
  try {
    return await sanityClient.fetch(QUERIES.allVideos)
  } catch {
    const { videos } = await import('./data')
    return videos
  }
}
