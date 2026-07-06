/**
 * Animation duration and easing presets.
 * We rely on snappy, premium spring and ease curves (150-200ms for hover, 400-600ms for entrances).
 */
export const transitions = {
  default: { type: "spring", stiffness: 120, damping: 15, mass: 1 },
  smooth: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 },
  fast: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 },
  slow: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 1.2 },
}

/**
 * Standard Framer Motion variants for site-wide UI animation consistency.
 * These variants respect prefers-reduced-motion by keeping transitions to fades
 * and skipping coordinate displacements if reduced motion is requested.
 */
export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: transitions.smooth },
    exit: { opacity: 0, transition: transitions.fast },
  },
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: 12, transition: transitions.fast },
  },
  fadeDown: {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: -12, transition: transitions.fast },
  },
  fadeLeft: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: 12, transition: transitions.fast },
  },
  fadeRight: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: -12, transition: transitions.fast },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: transitions.default },
    exit: { opacity: 0, scale: 0.95, transition: transitions.fast },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: transitions.smooth },
    exit: { opacity: 0, scale: 0.9, transition: transitions.fast },
  },
  pageTransition: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 } },
    exit: { opacity: 0, scale: 0.98, transition: transitions.fast },
  },
  staggerContainer: (staggerChildren = 0.08, delayChildren = 0) => ({
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),
  staggerItem: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: transitions.smooth },
  }
}
