# Project Setup Guide

This guide describes how to run, configure, and compile the portfolio application.

## 1. Prerequisites
Ensure you have the following installed locally:
- **Node.js**: v18.x or later (v20+ recommended)
- **npm**: v10.x or later

---

## 2. Installation
To install the project dependencies, run:
```bash
npm install
```
This installs core packages including Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lenis, and shadcn dependencies.

---

## 3. Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 4. Linting and Code Quality
Run ESLint to check for code violations:
```bash
npm run lint
```
Our ESLint configuration matches standard Next.js App Router rules. Avoid introducing syntax errors or lint issues.

---

## 5. Production Compilation
Verify the production build works flawlessly:
```bash
npm run build
```
This tests server-side rendering, optimizes CSS, minifies bundles, and verifies zero compilation errors or TypeScript conflicts.

To preview the production build locally:
```bash
npm start
```

---

## 6. Architecture Configurations

### Absolute Imports
We use absolute path mapping (`@/*` pointing to project root) to maintain clean and flexible imports. This is configured in [jsconfig.json](file:///a:/July2026/PortFolio/jsconfig.json):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Dark Mode Configuration
Dark mode uses `next-themes` and a CSS-first Tailwind CSS v4 setup:
1. In [globals.css](file:///a:/July2026/PortFolio/app/globals.css), we register the custom selector variant:
   ```css
   @custom-variant dark (&:where(.dark, .dark *));
   ```
2. Colors are mapped inside CSS variables (`:root` and `.dark`).
3. Component utilities toggle via the standard `dark:` prefix.
