/**
 * @typedef {Object} NavItem
 * @property {string} label - Display name
 * @property {string} href - Target URL or page route
 */

/** @type {NavItem[]} */
export const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/#biography",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Credentials",
    href: "/credentials",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]
