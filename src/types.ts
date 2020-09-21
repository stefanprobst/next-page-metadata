import type { DateTime, URL } from 'schema-dts'

export type PageMetadata = {
  title?: string
  titleTemplate?: (title?: string) => string
  /** max. 250 characters */
  description?: string
  canonicalUrl?: URL

  noindex?: boolean
  nofollow?: boolean

  languageAlternates?: Array<{ hrefLang: string; href: string }>

  openGraph?: OpenGraphMetadata
  twitter?: TwitterMetadata
}

export type OpenGraphMetadata = {
  /** falls back to canonical url */
  canonicalUrl?: URL
  title?: string
  description?: string
  images?: Array<OpenGraphImage>
  type?: 'website' | 'article' | 'profile'
  // | 'book'
  // | 'music.song'
  // | 'music.album'
  // | 'music.playlist'
  // | 'music.radio_station'
  // | 'video.movie'
  // | 'video.episode'
  // | 'video.tv_show'
  // | 'video.other'
  siteName?: string
  locale?: string
  /** falls back to languageAlternates */
  localeAlternates?: Array<string>

  article?: OpenGraphArticle
  profile?: OpenGraphProfile
}

export type OpenGraphArticle = {
  publishedTime?: DateTime
  modifiedTime?: DateTime
  expirationTime?: DateTime
  /** URL to the author's profile page, or a page of `og:type` "profile" */
  authors?: Array<URL>
  section?: string
  tags?: Array<string>
}

export type OpenGraphProfile = {
  firstName?: string
  lastName: string
  username?: string
  /** according to the docs this is a male/female enum :( */
  gender?: string
}

export type TwitterMetadata = {
  /**
   * max. 70 characters
   * will use openGraph.title as a falback
   */
  title?: string
  /**
   * max. 200 characters
   * will use openGraph.description as a fallback
   */
  description?: string
  /**
   * max. 5MB, supported formats: jpg, png, webp, gif
   * will use openGraph.images as a fallback
   */
  image?: TwitterImage
  /** @username of content creator */
  handle?: string
  /** @username of website */
  site?: string
  /** twitter card type */
  cardType?: 'summary' | 'summary_large_image' // | 'app' | 'player'
}

export type OpenGraphImage = {
  /** URL of image */
  src: string
  /** image description */
  alt: string
  width?: number
  height?: number
  /** media-type of the image */
  type?: string
}

export type TwitterImage = {
  /** URL of image */
  src: string
  /** image description, max. 420 characters */
  alt: string
}
