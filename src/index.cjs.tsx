/**
 * workaround for microbundle's handling of mixed default and named exports
 * @see https://github.com/developit/microbundle/issues/712#issuecomment-683794530
 */

import PageMetadata from './PageMetadata'
import SchemaOrg, { createJsonLd, createSchemaOrg } from './SchemaOrg'

Object.assign(PageMetadata, {
  SchemaOrg,
  JsonLd: SchemaOrg,
  createSchemaOrg,
  createJsonLd,
})
export default PageMetadata
export type { PageMetadataProps } from './PageMetadata'
export type { Schema } from './SchemaOrg'
export type {
  OpenGraphArticle,
  OpenGraphImage,
  OpenGraphMetadata,
  OpenGraphProfile,
  PageMetadata,
  TwitterImage,
  TwitterMetadata,
} from './types'
