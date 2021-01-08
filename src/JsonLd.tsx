import Head from 'next/head'
import * as React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
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
  return (
    <Head>
      <script {...jsonLdScriptProps<T>(addContext(schema))} />
    </Head>
  )
}
