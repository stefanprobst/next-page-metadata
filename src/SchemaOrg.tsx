import HeadModule from 'next/head.js'
import { jsonLdScriptProps } from 'react-schemaorg'
import type { Thing, WithContext } from 'schema-dts'

/**
 * Nwxt.js only provides CommonJs exports.
 *
 * @see https://github.com/vercel/next.js/issues/30402
 */
/* @ts-expect-error CommonJS module. */
const { default: Head } = HeadModule

/**
 * @see https://github.com/google/schema-dts/issues/98
 */
export type Schema = Exclude<Thing, string>

export function createSchemaOrg<T extends Thing>(schema: T): T {
  return schema
}

function addContext<T extends Schema>(schema: T): WithContext<T> {
  return { '@context': 'https://schema.org', ...schema }
}

export function SchemaOrg<T extends Schema>({ schema }: { schema: T }): JSX.Element {
  return (
    <Head>
      <script {...jsonLdScriptProps<T>(addContext(schema))} />
    </Head>
  )
}
