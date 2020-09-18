import Head from 'next/head'
import type { Thing, WithContext } from 'schema-dts'

/**
 * @see https://github.com/google/schema-dts/issues/98
 */
export type Schema = Exclude<Thing, string>

export function createJsonLd<T extends Thing>(schema: T): T {
  return schema
}

function addContext<T extends Schema>(schema: T): WithContext<T> {
  return { '@context': 'https://schema.org', ...schema }
}

export default function JsonLd<T extends Schema>({
  schema,
}: {
  schema: T
}): JSX.Element {
  const json = JSON.stringify(addContext(schema))
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    </Head>
  )
}
