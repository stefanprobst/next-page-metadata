/**
 * workaround for microbundle's handling of mixed default and named exports
 * @see https://github.com/developit/microbundle/issues/712#issuecomment-683794530
 */

import JsonLd, { createJsonLd } from './JsonLd'
import PageMetadata from './PageMetadata'
Object.assign(PageMetadata, { JsonLd, createJsonLd })
export default PageMetadata
export type { PageMetadataProps } from './PageMetadata'
