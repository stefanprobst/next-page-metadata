import Head from 'next/head'
import * as React from 'react'

import type {
  OpenGraphArticle,
  OpenGraphImage,
  OpenGraphMetadata,
  OpenGraphProfile,
  PageMetadata,
  TwitterMetadata,
} from './types'

export type PageMetadataProps = PageMetadata

export default function PageMetadata(props: PageMetadataProps): JSX.Element {
  const metadata = []

  const {
    title,
    titleTemplate,
    description,
    canonicalUrl,
    language,
    languageAlternates,
    nofollow,
    noindex,
    openGraph,
    twitter,
  } = props

  const pageTitle =
    typeof titleTemplate === 'function' ? titleTemplate(title) : title

  if (pageTitle) {
    metadata.push(<title key="title">{pageTitle}</title>)
  }
  if (description) {
    metadata.push(
      <meta name="description" content={description} key="description" />,
    )
  }
  if (canonicalUrl) {
    metadata.push(<link rel="canonical" href={canonicalUrl} key="canonical" />)
  }
  if (Array.isArray(languageAlternates)) {
    languageAlternates.forEach(({ hrefLang, href }) => {
      metadata.push(
        <link
          rel="alternate"
          hrefLang={hrefLang}
          href={href}
          key={`alternate:${hrefLang}`}
        />,
      )
    })
  }
  if (noindex || nofollow) {
    const content = []
    if (noindex) content.push('noindex')
    if (nofollow) content.push('nofollow')
    metadata.push(
      <meta name="robots" content={content.join(',')} key="robots" />,
    )
  }
  if (openGraph) {
    metadata.push(
      ...createOpenGraphMetadata({
        ...openGraph,
        canonicalUrl: openGraph.canonicalUrl || canonicalUrl,
        title: openGraph.title || pageTitle,
        description: openGraph.description || description,
        locale: openGraph.locale || language,
        localeAlternates:
          openGraph.localeAlternates != null
            ? openGraph.localeAlternates
            : languageAlternates &&
              languageAlternates.map(({ hrefLang }) => hrefLang),
      }),
    )
  }
  if (twitter) {
    /** twitter tags will fall back on openGraph tags */
    if (openGraph) {
      metadata.push(...createTwitterhMetadata(twitter))
    } else {
      metadata.push(
        ...createTwitterhMetadata({
          ...twitter,
          title: twitter.title || pageTitle,
          description: twitter.description || description,
        }),
      )
    }
  }

  return <Head>{metadata}</Head>
}

function createOpenGraphMetadata(props: OpenGraphMetadata) {
  const metadata = []

  const {
    canonicalUrl,
    title,
    description,
    images,
    type,
    siteName,
    locale,
    localeAlternates,
    article,
    profile,
  } = props

  if (canonicalUrl) {
    metadata.push(
      <meta property="og:url" content={canonicalUrl} key="og:url" />,
    )
  }
  if (title) {
    metadata.push(<meta property="og:title" content={title} key="og:title" />)
  }
  if (description) {
    metadata.push(
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />,
    )
  }
  if (Array.isArray(images)) {
    images.forEach((image, index) => {
      metadata.push(...createOpenGraphImage(image, index))
    })
  }
  if (type) {
    metadata.push(<meta property="og:type" content={type} key="og:type" />)
  }
  if (siteName) {
    metadata.push(
      <meta property="og:site_name" content={siteName} key="og:site_name" />,
    )
  }
  if (locale) {
    metadata.push(
      <meta property="og:locale" content={locale} key="og:locale" />,
    )
  }
  if (Array.isArray(localeAlternates)) {
    localeAlternates
      .filter((alternate) => alternate !== locale)
      .forEach((locale, index) => {
        metadata.push(
          <meta
            property="og:locale:alternate"
            content={locale}
            key={`og:locale:alternate:${index}`}
          />,
        )
      })
  }
  if (type === 'article' && article) {
    metadata.push(...createOpenGraphArticle(article))
  }
  if (type === 'profile' && profile) {
    metadata.push(...createOpenGraphProfile(profile))
  }

  return metadata
}

function createTwitterhMetadata(props: TwitterMetadata) {
  const metadata = []

  const { title, description, image, cardType, site, handle } = props

  if (title) {
    metadata.push(
      <meta name="twitter:title" content={title} key="twitter:title" />,
    )
  }
  if (description) {
    metadata.push(
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />,
    )
  }
  if (image) {
    metadata.push(
      <meta name="twitter:image" content={image.src} key="twitter:image" />,
    )
    if (image.alt) {
      metadata.push(
        <meta
          name="twitter:image:alt"
          content={image.alt}
          key="twitter:image:alt"
        />,
      )
    }
  }
  if (cardType) {
    metadata.push(
      <meta name="twitter:card" content={cardType} key="twitter:card" />,
    )
  }
  if (site) {
    metadata.push(
      <meta name="twitter:site" content={site} key="twitter:site" />,
    )
  }
  if (handle) {
    metadata.push(
      <meta name="twitter:creator" content={handle} key="twitter:creator" />,
    )
  }

  return metadata
}

function createOpenGraphImage(props: OpenGraphImage, index: number) {
  const metadata = []

  const { src, alt, width, height } = props

  metadata.push(
    <meta property="og:image" content={src} key={`og:image:${index}`} />,
  )
  if (alt) {
    metadata.push(
      <meta
        property="og:image:alt"
        content={alt}
        key={`og:image:alt:${index}`}
      />,
    )
  }
  if (width) {
    metadata.push(
      <meta
        property="og:image:width"
        content={String(width)}
        key={`og:image:width:${index}`}
      />,
    )
  }
  if (height) {
    metadata.push(
      <meta
        property="og:image:height"
        content={String(height)}
        key={`og:image:height:${index}`}
      />,
    )
  }

  return metadata
}

function createOpenGraphArticle(props: OpenGraphArticle) {
  const metadata = []

  const {
    publishedTime,
    modifiedTime,
    expirationTime,
    authors,
    section,
    tags,
  } = props

  if (publishedTime) {
    metadata.push(
      <meta
        property="article:published_time"
        content={publishedTime}
        key="article:published_time"
      />,
    )
  }
  if (modifiedTime) {
    metadata.push(
      <meta
        property="article:modified_time"
        content={modifiedTime}
        key="article:modified_time"
      />,
    )
  }
  if (expirationTime) {
    metadata.push(
      <meta
        property="article:expiration_time"
        content={expirationTime}
        key="article:expiration_time"
      />,
    )
  }
  if (Array.isArray(authors)) {
    authors.forEach((author, index) => {
      metadata.push(
        <meta
          property={`article:author:${index}`}
          content={author}
          key="article:author"
        />,
      )
    })
  }
  if (section) {
    metadata.push(
      <meta
        property="article:section"
        content={section}
        key="article:section"
      />,
    )
  }
  if (Array.isArray(tags)) {
    tags.forEach((tag, i) => {
      metadata.push(
        <meta property={`article:tag:${i}`} content={tag} key="article:tag" />,
      )
    })
  }

  return metadata
}

function createOpenGraphProfile(props: OpenGraphProfile) {
  const metadata = []

  const { firstName, lastName, username, gender } = props

  metadata.push(
    <meta
      property="profile:last_name"
      content={lastName}
      key="profile:last_name"
    />,
  )
  if (firstName) {
    metadata.push(
      <meta
        property="profile:first_name"
        content={firstName}
        key="profile:first_name"
      />,
    )
  }
  if (username) {
    metadata.push(
      <meta
        property="profile:username"
        content={username}
        key="profile:username"
      />,
    )
  }
  if (gender) {
    metadata.push(
      <meta property="profile:gender" content={gender} key="profile:gender" />,
    )
  }

  return metadata
}
