# mnem-linkpage

A world-class link-in-bio page builder. Create beautiful, animated link pages with a drag-drop visual editor. Static export — no backend required.

## Tech Stack

- React 19 + TypeScript (strict)
- Vite + Tailwind CSS v4
- Framer Motion + GSAP (animations)
- Radix UI (accessible primitives)
- Zustand (state management)
- @hello-pangea/dnd (drag-drop)

## Features

- 6 built-in themes: Minimal, Glass, Neon, Retro, Dark Elegance, Gradient
- Block types: Hero, Link, Link Grid, Social, Video (YouTube/Vimeo), CTA, Text (Markdown), Email Form
- Visual drag-drop editor at `/edit`
- Live preview while editing
- Export `page.json` to save your config
- Static export — deploy to Vercel or Netlify with zero config

## Getting Started

```bash
npm install
npm run dev
```

Then open:
- `http://localhost:5173/` — public page
- `http://localhost:5173/edit` — visual editor

## Customizing Your Page

Edit `public/page.json` directly, or use the visual editor at `/edit`. Download your config via the Export button.

## Deploy to Vercel

```bash
npm run build
# Deploy the dist/ folder to Vercel or Netlify
```

Or connect the GitHub repo to Vercel — it auto-detects Vite and deploys on push.

## TODO

- [ ] Multi-item editor for Link Grid and Social sections (currently edit page.json directly)
- [ ] Image upload for avatars
- [ ] Custom domain / slug routing
- [ ] Analytics (click tracking)
- [ ] Password-protected pages
