# next-page-metadata

Next.js component for adding metadata to pages for search engine optimization.

## How to use

### Add `<title>` and `<meta>` tags

```tsx
import { Fragment } from 'react'
import Metadata from '@stefanprobst/next-page-metadata'

export default function Page() {
  const metadata = {
    title: 'Hello world',
  }
  return (
    <Fragment>
      <Metadata {...metadata} />
      <h1>Hello World</h1>
    </Fragment>
  )
}
```

## Add JSON-LD

```tsx
import { Fragment } from 'react'
import { createJsonLd, JsonLd } from '@stefanprobst/next-page-metadata'

export default function Page() {
  const author = createJsonLd({
    '@type': 'Person',
    name: 'Stefan'
  })
  const article = createJsonLd({
    '@type': 'Article',
    headline: 'Hello World',
    author,
  })
  return (
    <Fragment>
      <Jsonld schema={article}>
      <h1>Hello World</h1>
    </Fragment>
  )
}
```

When using `createJsonLd` to create schema objects, provide the `@type` key to
narrow the discriminated union for better intellisense. See
[schema-dts](https://github.com/google/schema-dts/tree/master/dist/schema) for
details.
