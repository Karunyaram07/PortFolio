# Development Workflow Guide

This document describes the workflows and practices that keep our codebase clean, production-ready, and error-free.

## 1. Coding & Language Conventions

### Pure JavaScript
- Do not introduce TypeScript files (`.ts` or `.tsx`).
- Save components as `.jsx` or `.js` files.

### JSDoc Typing
Use JSDoc comments to document object structures. This provides full IDE autocompletion, type checks, and clarity without typescript overhead.

**Example Class Type Def**:
```javascript
/**
 * @typedef {Object} Project
 * @property {string} title - The title of the project
 * @property {string} description - Summary of the project
 * @property {string[]} technologies - Technologies used
 * @property {string} github - Repository link
 * @property {string} [demo] - Live preview URL
 */
```

**Using defined JSDoc types**:
```javascript
/** @type {Project[]} */
export const projects = [ ... ]
```

---

## 2. Component Design Principles
- **No hardcoded text copy**: Load text content from `/content/data/` or `/config/`.
- **CSS Classes**: Combine multiple optional style classes using the `cn(...)` utility inside `lib/utils.js`:
  ```javascript
  import { cn } from "@/lib/utils"
  
  export function Alert({ className, ...props }) {
    return <div className={cn("p-4 border rounded", className)} {...props} />
  }
  ```
- **Animation Hooks**: Avoid hardcoded animations. Reference curves and variants from `@/config/animations`:
  ```javascript
  import { motion } from "framer-motion"
  import { variants } from "@/config/animations"
  
  export function AnimatedCard({ children }) {
    return (
      <motion.div variants={variants.fadeUp} initial="initial" animate="animate">
        {children}
      </motion.div>
    )
  }
  ```

---

## 3. Styling Guidelines
- **Tailwind CSS v4 Utility Classes**: Rely primarily on utility classes.
- **Glassmorphism**: Use the utility configuration `classes.glass` from `@/config/theme` for cards, navbars, and dialog backdrops.
- **Color Usage**: Rely on theme-defined semantic colors (`var(--background)`, `var(--primary)`, etc.) to automatically adapt to dark/light switching.

---

## 4. Animation Guidelines
- **Prefers Reduced Motion**: Always ensure layout animations check or adjust to reduced motion settings.
- **Scroll Container**: Do not set layout containers to `overflow-hidden` at high parent levels. Doing so can break the `lenis` root smooth-scrolling event listener.
- **Frame Rate Optimization**: Avoid animating CPU-heavy properties. Rely on CSS variables or Framer Motion transitions for layouts.

---

## 5. Verification Checklist before Merging
1. **Linter Validation**: Run `npm run lint` and verify zero errors or warnings.
2. **Build Compilation**: Run `npm run build` locally to guarantee a clean bundle compile.
3. **No Placeholders**: Never merge fake images, "lorem ipsum" copy, or dummy routes. Always map to solid configurations.
