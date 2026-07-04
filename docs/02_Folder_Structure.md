# Folder Architecture Guide

This document describes the structure of the repository. All new code must be placed in the correct directory.

## 1. Directory Tree Diagram
```text
Portfolio/
├── app/                  # Next.js App Router root (layouts, pages, globals.css)
├── components/           # Component ecosystem
│   ├── about/            # About page-specific components
│   ├── articles/         # Article/Blog page-specific components
│   ├── home/             # Homepage-specific components
│   ├── layout/           # Shared page layout elements (Navbar, Footer, Sidebar)
│   ├── projects/         # Project page-specific components
│   ├── shared/           # Application-wide shared components (providers)
│   └── ui/               # Low-level UI elements (shadcn/ui primitives)
├── config/               # Global static styling and animation configs
│   ├── animations.js     # Shared animation variants and curves
│   └── theme.js          # Design system class tokens
├── content/              # Raw markdown article/blog files
│   └── articles/         # Markdown content (.md / .mdx)
├── data/                 # Portfolio profile databases and static page inputs
│   ├── profile.js        # Personal details and availability
│   ├── site.js           # Base metadata inputs and defaults
│   ├── socials.js        # Active social profiles and links
│   ├── education.js      # Structured academic history
│   ├── experience.js     # Structured work experience
│   ├── projects.js       # Reusable, searchable project cards
│   ├── skills.js         # Grouped technical capability tags
│   ├── achievements.js   # Structured milestones and awards
│   ├── certifications.js # Earned certifications verified list
│   └── navigation.js     # Data-driven route labels and links
├── docs/                 # Professional development documentation
├── hooks/                # Reusable custom React hooks
├── lib/                  # Centralized utilities, fonts, metadata, navigation configs
├── public/               # Raw public static assets
│   ├── favicons/         # App icons and browser representations
│   ├── icons/            # Customized visual graphics
│   ├── images/           # Asset images grouped by page/context
│   └── logos/            # Organization/Personal branding marks
└── styles/               # Dedicated custom styling files
```

---

## 2. Directory Breakdown & Guidelines

### `/app`
Contains layout and page entry points. No reusable functional components should live directly here. Keep root-level configuration imports inside [layout.js](file:///a:/July2026/PortFolio/app/layout.js).

### `/components`
Organized strictly by scope:
*   `ui/`: Contains atomic elements (e.g. [button.jsx](file:///a:/July2026/PortFolio/components/ui/button.jsx), [dialog.jsx](file:///a:/July2026/PortFolio/components/ui/dialog.jsx)). These should be configurable via `cn(...)` utility classes.
*   `layout/`: Structural framework wrappers (e.g. Header, Navbar, Footer).
*   `shared/`: Context providers, scroll wrappers, or cross-cutting visual wrappers.
*   `home/`, `about/`, `projects/`, `articles/`: Feature-scoped layouts that assemble UI pieces.

### `/config`
Central configurations for easy updating:
*   [animations.js](file:///a:/July2026/PortFolio/config/animations.js): Global animation speeds, transitions, and easing curves.
*   [theme.js](file:///a:/July2026/PortFolio/config/theme.js): Fluid padding systems, glassmorphism presets, and reusable theme class utilities.

### `/content`
Separates site copy from logic:
*   `articles/`: Store Markdown files representing individual blog/writing files.

### `/data`
Centralized structured JavaScript files exporting user experiences, skills, education, projects, achievements, certifications, and socials. This separates structured application data from content.

### `/lib`
Helper functions, including fonts, site metadata generation, and navigation maps.

### `/public`
Store binary files such as images, logos, and custom svgs here. Organize under `images/hero/`, `images/projects/`, etc. to prevent visual asset sprawl.

