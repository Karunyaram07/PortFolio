import { navigation } from "@/data/navigation"

/**
 * @typedef {Object} NavItem
 * @property {string} label - The display name for the navigation link
 * @property {string} href - The target route or anchor link
 * @property {boolean} [external] - Whether the link is an external URL
 */

/**
 * Navigation items configuration for headers/footers/drawers.
 * @type {NavItem[]}
 */
export const navItems = navigation

