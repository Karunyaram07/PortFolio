# Project Vision & Philosophy

This document outlines the core vision, design principles, and guidelines for the development of our world-class personal portfolio.

## 1. Project Goal
To build a production-ready, highly polished, creative, and responsive developer portfolio. It is designed to act as a premium showcase of engineering capabilities, design aesthetics, and user experience excellence.

---

## 2. Technology Stack
The foundation is built upon modern, standard, and highly performant technologies:

*   **Framework**: Next.js 16 (App Router)
*   **Language**: JavaScript (ESLint enabled, types documented via JSDoc tags)
*   **Library**: React 19 (Client and Server Components)
*   **Styling**: Tailwind CSS v4 (CSS-first engine) and custom CSS
*   **Theme Management**: `next-themes` (Dark/Light/System)
*   **UI System**: `shadcn/ui` (Radix UI primitives configured for JavaScript)
*   **Smooth Scrolling**: `lenis` (Root-level smooth scrolling wrapper)
*   **Animation**: `framer-motion` (Declarative animations and transitions)
*   **Icons**: `lucide-react` (SVG icons)

---

## 3. Design Philosophy
Aesthetics must be visually striking and feel premium:
*   **Color Systems**: Curated custom HSL color systems instead of browser-default tones. Smooth gradients and sleek dark/light transitions.
*   **Glassmorphism**: Subtle, modern overlay effects (`backdrop-blur` and thin borders) to elevate depth.
*   **Typography**: Clean, highly readable typography systems leveraging `Geist` (Sans) and `Geist Mono` (Mono), loaded via `next/font/google`.
*   **Dark Mode**: Native, system-aware dark mode support that toggles color variables gracefully without layout shifts or flash.

---

## 4. Animation Philosophy
Every animation must feel deliberate, organic, and enhance the experience rather than distract:
*   **Entrance Animations**: Components fade and slide up gracefully when mounted to draw attention.
*   **Scroll Animations**: Smooth animations triggered as elements scroll into view.
*   **Shared Layout Animations**: Fluid layout transitions when switching views (e.g. tabs, list expansions).
*   **Hover & Active States**: Responsive, physical scaling micro-animations on interactive items.
*   **Stagger Animations**: Staggered children transitions for structured list items to add rhythm.
*   **Cursor & Magnetic Buttons**: Micro-interactions that respond to mouse coordinate proximity.
*   **Parallax**: Layered scrolling speeds to simulate real depth.
*   **Motion Reduction Support**: Adaptive styling for users who prefer static layouts.

---

## 5. Design & Animation Constraints
To maintain a high quality-bar, the following constraints must be strictly adhered to:
*   **Purpose**: No purely decorative animations. Every motion should guide user attention or show state.
*   **Duration**: Keep animations short and crisp (typically under `600ms`) to avoid feeling sluggish.
*   **Hardware Acceleration**: Use GPU-accelerated properties (`opacity`, `transform` / `translate3d`) for all continuous animations. Avoid animating layout properties (`width`, `height`, `margin`, `top`, `left`) directly.
*   **Re-renders**: Ensure animation states do not cause unnecessary React re-renders. Use Framer Motion `useMotionValue` or inline CSS transitions where appropriate.
*   **Accessibility First**: Always wrap interactive elements in standard semantic tags with visible focus rings.
*   **Reduced Motion**: Respect system preferences by checking `window.matchMedia('(prefers-reduced-motion: reduce)')` or configuring Framer Motion layouts to skip translation animations when reduced motion is preferred.

---

## 6. Accessibility (a11y) Goals
*   **Semantic HTML**: Proper usage of `<header>`, `<main>`, `<section>`, `<footer>`, and heading hierarchies (`<h1>`-`<h6>`).
*   **Keyboard Navigable**: All interactive components (menus, links, filters) must be accessible via keyboard (`Tab`, `Space`, `Enter`).
*   **ARIA Attributes**: Supply descriptive `aria-label`, `aria-expanded`, and state flags to Radix UI components.
*   **Contrast**: Keep text contrast compliant with WCAG AA guidelines in both light and dark modes.

---

## 7. Performance Goals
*   **Core Web Vitals**: Zero layout shift (CLS), fast Largest Contentful Paint (LCP) under 2.5s, and minimal Cumulative Layout Shift.
*   **Asset Optimization**: Serve compressed WebP/AVIF images with proper dimensions and preloads.
*   **Fonts**: Preload and serve Google Fonts locally via `next/font` to bypass external HTTP calls.
