import { socials as rawSocials } from "@/data/socials"

/**
 * @typedef {Object} SocialLink
 * @property {string} name - Name of the social media platform
 * @property {string} url - Link to the social media profile
 * @property {string} icon - Name of the lucide icon associated with it
 */

/**
 * Social media links configuration.
 * @type {SocialLink[]}
 */
export const socials = Object.entries(rawSocials)
  .filter(([_, url]) => url !== "")
  .map(([platform, url]) => {
    const name = platform === "email" ? "Email" : platform.charAt(0).toUpperCase() + platform.slice(1)
    return {
      name,
      url: platform === "email" ? `mailto:${url}` : url,
      icon: platform === "email" ? "mail" : platform.toLowerCase(),
    }
  })


