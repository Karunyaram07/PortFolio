/**
 * Animation duration and easing presets.
 */
export const transitions = {
  default: { type: "spring", stiffness: 100, damping: 15, mass: 1 },
  smooth: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 },
  fast: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.3 },
  slow: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 1.2 },
}

/**
 * Standard Framer Motion variants for site-wide UI animation consistency.
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
  staggerContainer: (staggerChildren = 0.1, delayChildren = 0) => ({
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),
}
