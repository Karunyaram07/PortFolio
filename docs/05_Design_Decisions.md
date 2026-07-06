# Design Decisions Log (05_Design_Decisions)

This document records the foundational design decisions, aesthetic rationale, and technical considerations that define the portfolio's visual identity.

---

## 1. Rationale: Option D — Cosmic Indigo
We chose **Option D: Cosmic Indigo** to reflect Sunkara Prabhu Ram Karunya’s background as an AI Engineer, Full-Stack Developer, and Research Student.
* **Deep Space Charcoal Background**: Instead of harsh pure black (`#000000`), we use a dark charcoal grey-blue (`oklch(0.14 0.01 245)`) that is softer on the eyes, provides premium depth, and prevents high-contrast screen glare.
* **Indigo-Violet Gradient Accent**: Blends cosmic indigo (`oklch(0.55 0.22 265)`) to electric violet (`oklch(0.68 0.18 260)`). This matches modern developer tool aesthetics (Linear, Vercel) and references AI integrations.
* **Mint for Success**: Standard green is replaced with crisp mint (`oklch(0.85 0.11 160)`) to offer a premium, clean indicator style.
* **Softer Glassmorphism**: High-blur backdrops (`blur-md`) are preferred over heavy glass/glows (`blur-xl`) to maintain text legibility and prevent rendering lag on mobile devices.

---

## 2. Typography Strategy: Geist & Geist Mono
We use Vercel's **Geist** font family, loaded locally via `next/font/google` to optimize performance and prevent third-party HTTP calls.
* **Geist Sans (Primary)**: Standard geometric sans-serif that excels in clarity and readability.
* **Geist Mono (Secondary)**: Reserved for code snippets, database statistics, dates, and subtle navigation labels. This highlights Karunya's computer science background.
* **Fluid Scaling**: Screen sizes vary dramatically, so display headers and major titles use CSS `clamp()` functions to scale seamlessly without layout shifts.

---

## 3. Spacing & Grid System
The spacing system uses a proportional 4px grid to maintain visual rhythm.
* **Base Units**: Margin and padding classes map directly to standard Tailwind spacing (e.g. `p-4` = 16px, `p-6` = 24px) to ensure no magic numbers are introduced.
* **Reading Constraint**: Paragraph grids enforce a maximum reading width of `max-w-3xl` (approx. 48rem or 768px). Keeping lines under 80 characters avoids eye strain.
* **Massive Breathing Space**: Large section paddings (`py-20 md:py-32`) are used to separate narrative chapters and give each section visual breathing room.

---

## 4. Motion Philosophy (Framer Motion)
Animations are designed to reinforce interface feedback, not to serve as decoration.
* **Hardware Acceleration**: Transitions strictly animate `opacity` and `transform` (translating on the GPU using `translate3d`). Animated layouts (like animating `height` or `width`) are avoided.
* **Cubic-Bezier Easing**: Standardized spring presets and smooth ease curves (`cubic-bezier(0.16, 1, 0.3, 1)`) are used to create a snappy, physics-based visual feeling.
* **Accessibility**: Respects system preferences. When `prefers-reduced-motion` is active, all translation shifts are removed, falling back to simple fades.

---

## 5. OKLCH Color Space
We define colors using `oklch()` instead of standard HSL or Hex:
* **Perceptual Uniformity**: Changing hue does not change the perceived brightness, which helps maintain AA/AAA contrast ratios when swapping light and dark modes.
* **Wider Color Gamut**: Support for modern P3 displays, rendering richer indigos and vibrant mint accents.
