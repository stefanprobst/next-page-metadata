# next-page-metadata

Next.js component for adding metadata to pages for search engine optimization.

## How to use

### Add `<title>` and `<meta>` tags

```tsx
import { Fragment } from 'react'
import { PageMetadata } from '@stefanprobst/next-page-metadata'
import type { PageMetadataProps } from '@stefanprobst/next-page-metadata'

export default function Page() {
  const metadata: PageMetadataProps = {
    title: 'Hello world',
  }
  return (
    <Fragment>
      <PageMetadata {...metadata} />
      <h1>Hello World</h1>
    </Fragment>
  )
}
```

## Add Schema.org JSON-LD metadata

```tsx
import { Fragment } from 'react'
import { createSchemaOrg, SchemaOrg } from '@stefanprobst/next-page-metadata'

export default function Page() {
  const author = createSchemaOrg({
    '@type': 'Person',
    name: 'Stefan'
  })
  const article = createSchemaOrg({
    '@type': 'Article',
    headline: 'Hello World',
    author,
  })
  return (
    <Fragment>
      <SchemaOrg schema={article}>
      <h1>Hello World</h1>
    </Fragment>
  )
}
```

When using `createSchemaOrg` to create schema objects, provide the `@type` key to narrow the
discriminated union for better intellisense. See
[schema-dts](https://github.com/google/schema-dts/tree/master/dist/schema) for details.
