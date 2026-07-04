import { siteConfig } from "@/data/site"
import { socials } from "@/data/socials"

/**
 * @typedef {Object} MetadataConfig
 * @property {string} [title] - Title of the page
 * @property {string} [description] - Page description
 * @property {string} [path] - Canonical route path (e.g. '/about')
 * @property {Object} [openGraph] - Custom OpenGraph properties
 */

/**
 * Helper function to generate standard metadata objects for Next.js App Router.
 * @param {MetadataConfig} [config]
 * @returns {Object} Next.js Metadata object
 */
export function constructMetadata(config = {}) {
  const { title, description, path = "", openGraph = {}, ...rest } = config

  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const pageDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path}`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      creator: socials.twitter ? `@${socials.twitter.split("/").pop()}` : undefined,
    },
    ...rest,
  }
}
