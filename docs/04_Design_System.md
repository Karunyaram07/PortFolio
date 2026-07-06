# Design System (04_Design_System)

This document is the visual reference guide and visual specification for the Sunkara Prabhu Ram Karunya Portfolio. It defines the design tokens, rules, and constraints that govern every user interface element.

---

## 1. Design Philosophy
The portfolio’s aesthetics are centered around:
* **Professional Minimalism**: Clean layouts, generous whitespace, and sharp contrast.
* **Cinematic Deep Space Indigo Mood**: High-fidelity dark mode with rich, restrained indigo-violet accents.
* **Readable & Intentional**: Bold typographic contrast, readable line heights, and layout pacing that guides the reader’s eye.
* **Subtle Physics-Based Motion**: Animations match physical spring kinetics and never block interaction.

---

## 2. Color System (Option D: Cosmic Indigo)

Colors are defined semantically and mapped to Tailwind CSS v4 utility classes.

### Primary Tokens (OKLCH Spec)

| Token Name | Light Theme | Dark Theme | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| `background` | `oklch(0.99 0.003 240)` | `oklch(0.14 0.01 245)` | Core canvas background |
| `foreground` | `oklch(0.12 0.005 240)` | `oklch(0.95 0.003 240)` | Primary body text |
| `primary` | `oklch(0.12 0.005 240)` | `oklch(0.95 0.003 240)` | Primary actions & buttons |
| `primary-fg` | `oklch(0.99 0.003 240)` | `oklch(0.14 0.01 245)` | Text inside primary buttons |
| `secondary` | `oklch(0.95 0.005 240)` | `oklch(0.18 0.008 245)` | Secondary borders & panels |
| `secondary-fg`| `oklch(0.20 0.01 240)` | `oklch(0.95 0.003 240)` | Text inside secondary buttons |
| `accent` | `oklch(0.55 0.22 265)` | `oklch(0.68 0.18 260)` | Indigo-Violet focus triggers |
| `success` | `oklch(0.85 0.11 160)` | `oklch(0.85 0.11 160)` | Mint indicator for stats/avail |
| `warning` | `oklch(0.82 0.12 85)` | `oklch(0.82 0.12 85)` | Warnings / intermediate states |
| `error` | `oklch(0.65 0.16 28)` | `oklch(0.65 0.16 28)` | Destructive triggers / validation |
| `border` | `oklch(0.91 0.005 240)` | `oklch(0.22 0.01 245)` | Content dividers & borders |
| `muted` | `oklch(0.96 0.003 240)` | `oklch(0.16 0.008 245)` | Muted list backgrounds |
| `muted-fg` | `oklch(0.45 0.01 240)` | `oklch(0.65 0.005 240)` | Descriptive/metadata text |
| `surface` | `oklch(0.985 0.004 240)` | `oklch(0.15 0.01 245)` | Elevated panel background |
| `glass-bg` | `rgba(255,255,255,0.6)`| `rgba(20,20,24,0.65)` | Backdrop blur overlay fill |
| `glass-border`| `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.08)`| Soft container border outline |

---

## 3. Typography Scale

The font family relies on `Geist Sans` for core interfaces and headers, and `Geist Mono` for labels, numbers, snippets, and indicators.

| Token | CSS Class | Size (Fluid / Base) | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XL** | `text-display-xl` | `clamp(2.5rem, 5vw, 4.5rem)` | `1.1` | `800` | `-0.03em` |
| **Display Large**| `text-display-lg` | `clamp(2.0rem, 4vw, 3.75rem)` | `1.15` | `700` | `-0.02em` |
| **Heading 1** | `text-heading-1` | `clamp(1.75rem, 3vw, 3rem)` | `1.2` | `700` | `-0.02em` |
| **Heading 2** | `text-heading-2` | `clamp(1.5rem, 2.5vw, 2.25rem)` | `1.25` | `600` | `-0.01em` |
| **Heading 3** | `text-heading-3` | `clamp(1.25rem, 2vw, 1.875rem)` | `1.3` | `600` | `-0.01em` |
| **Heading 4** | `text-heading-4` | `clamp(1.125rem, 1.5vw, 1.5rem)`| `1.35` | `600` | `0` |
| **Body Large** | `text-body-lg` | `1.125rem` (18px) | `1.5` | `400` | `0` |
| **Body** | `text-body` | `1.0rem` (16px) | `1.6` | `400` | `0` |
| **Small** | `text-small` | `0.875rem` (14px) | `1.5` | `500` | `0.01em` |
| **Caption** | `text-caption` | `0.75rem` (12px) | `1.4` | `500` | `0.02em` |
| **Mono** | `font-mono` | Mapped to Geist Mono | - | Mapped | - |

---

## 4. Spacing System
Spacing values are proportional and map directly to standard Tailwind rem tokens.

* **Container Width**: Maximum `max-w-7xl` (80rem / 1280px) for layout grids.
* **Section Padding**: Vertical paddings default to `py-20 md:py-32` (80px to 128px) to establish narrative breathing pauses.
* **Maximum Reading Width**: Body paragraphs are constrained to `max-w-3xl` (48rem / 768px) to guarantee readability.
* **Gap Scales**:
  - Small elements (labels, tags, button contents): `gap-2` (8px) or `gap-3` (12px).
  - Main cards, layout rows: `gap-6` (24px) or `gap-8` (32px).
  - Sections & page components: `gap-12` (48px) or `gap-16` (64px).
* **Border Radii**:
  - `sm`: `calc(var(--radius) * 0.6)` (6px) — Small indicators/badges.
  - `md`: `calc(var(--radius) * 0.8)` (8px) — Regular buttons/inputs.
  - `lg`: `var(--radius)` (10px) — Standard cards/panels.
  - `xl`: `calc(var(--radius) * 1.4)` (14px) — Large layout containers.
  - `full`: `9999px` — Circular avatars/pills.

---

## 5. Basic Motion Presets

All basic animations run on hardware-accelerated properties (`opacity`, `transform`) and use Spring physics or snappy cubic curves.

### Motion Reference Table

| Preset | Target Usage | Timing / Curve | Details / Effect |
| :--- | :--- | :--- | :--- |
| `fadeUp` | Section/card entrances on scroll | `duration: 0.6s`, Ease Out | Fade in and translate up 24px |
| `fadeDown` | Dropdowns, top-menu banners | `duration: 0.4s`, Ease Out | Fade in and translate down 16px |
| `fadeLeft` | Sequential lists, horizontal cards | `duration: 0.5s`, Ease Out | Slide from right to left (24px) |
| `fadeRight` | Back buttons, sidebar list cards | `duration: 0.5s`, Ease Out | Slide from left to right (24px) |
| `scaleIn` | Modal containers, active popovers | Spring `stiffness: 120, damping: 14` | Scale from 0.95 to 1.0 |
| `zoomIn` | Hover card zoom preview, visual media | `duration: 0.6s`, Ease Out | Scale from 0.90 to 1.0 |
| `pageTransition` | Router page loads | `duration: 0.5s`, Ease Out | Fades page in with subtle scale |

* **Prefers-Reduced-Motion Rule**: If a user's system preferences request reduced motion, all translation coordinates are forced to `0`, converting animations to simple `opacity` fades.
* **Interactive Lockouts**: Entrance animations must not set pointer-events to none or lock interaction. Hover timings must compile under `200ms` for extreme snappiness.

---

## 6. Icon Guidelines

Icons are imported from `react-icons` (specifically `react-icons/fi` and `react-icons/tb`) to keep SVGs clean and accessible.

* **Standard Size Scales**:
  - **16px (`size-4`)**: inline links, badges, button icons.
  - **18px / 20px (`size-4.5` / `size-5`)**: Navigation menu links, contact triggers.
  - **24px (`size-6`)**: Social links, section identifiers.
  - **32px (`size-8`)**: Main visual grid highlights.
* **Stroke Width**: Standardized to `strokeWidth={1.5}` for a crisp, thin, sophisticated editorial outline. Never use thick strokes.
* **Color Inheritance**: Icons must inherit color via `currentColor` (e.g. `text-muted-foreground group-hover:text-foreground`) to scale with dark/light themes.
* **Hover Animations**: Subtle translations (e.g. arrows slide right 2px `group-hover:translate-x-0.5` or rotate 45 degrees).

---

## 7. Image Optimization Rules

All portfolio assets must maintain high performance scores:

* **Format**: All static photos, background previews, and screenshots must be compressed to **WebP** or **AVIF** formats.
* **Next.js `<Image>` component**: Always use `next/image` to support automatic resizing, srcsets, and optimization.
* **Explicit Dimensions**: Always supply `width` and `height` dimensions (or use `fill` with a relative parent) to prevent layout shifts.
* **Lazy Loading**: Active on all images by default (`loading="lazy"`). Only the main hero profile image may bypass this with `priority={true}`.
* **Visual Frame**: Standard border radius (`rounded-lg` or `rounded-xl`) and `object-fit: cover` to maintain aspect ratios.

---

## 8. Accessibility (a11y) Constraints
* **Focus Indicator**: All focusable tags must have a highly visible focus ring: `focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none`.
* **Semantic Code**: Wrap sections in `<section>`, nav in `<nav>`, buttons in `<button>`, and icons in headers using correct ARIA labels.
* **Contrast Compliance**: Contrast ratios between background/foreground layers must satisfy WCAG AA standards (minimum contrast ratio of 4.5:1).
