# motile

A link-in-bio page builder with a drag-and-drop visual editor, animated themes, and zero backend. Edit in the browser, export a JSON file, deploy anywhere.

**Live demo → [mnemclaw.github.io/motile](https://mnemclaw.github.io/motile/)**
**Visual editor → [mnemclaw.github.io/motile/edit](https://mnemclaw.github.io/motile/edit)**

---

## Features

- **6 themes** — Minimal, Glass, Neon, Retro, Dark Elegance, Gradient
- **8 block types** — Hero, Link, Link Grid, Social links, YouTube/Vimeo embed, CTA, Markdown text, Email form
- **Visual drag-drop editor** — reorder blocks, edit content, switch themes, live preview
- **Export/import** — save and restore your config as `page.json`
- **No backend** — fully static, runs from a single HTML file
- **Animated** — Framer Motion + GSAP transitions throughout

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite + Tailwind CSS v4 |
| Animation | Framer Motion + GSAP |
| UI primitives | Radix UI |
| State | Zustand (localStorage persistence) |
| Drag-drop | @hello-pangea/dnd |

---

## Local Development

```bash
git clone https://github.com/mnemclaw/motile.git
cd motile
npm install
npm run dev
```

| URL | |
|---|---|
| `http://localhost:5173/` | Public page |
| `http://localhost:5173/edit` | Visual editor |

---

## Customising Your Page

### Option A — Visual editor

Open `/edit`, make changes, click **Export**. This downloads your `page.json`. Replace `public/page.json` in the repo with it, then redeploy.

### Option B — Edit JSON directly

Edit `public/page.json`. The schema maps directly to what the editor produces:

```jsonc
{
  "meta": { "title": "Your Name", "theme": "minimal" },
  "sections": [
    { "type": "hero", "name": "...", "bio": "...", "avatarUrl": "..." },
    { "type": "link", "label": "My Project", "url": "https://..." },
    { "type": "social", "links": [{ "platform": "github", "url": "..." }] }
  ]
}
```

---

## Deploy to GitHub Pages

The repo includes a GitHub Actions workflow that builds and deploys automatically on every push to `main`.

### Fork and deploy

1. Fork this repo
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions** (or **Deploy from branch: gh-pages**)
4. Update `base` in `vite.config.ts` to match your repo name:

```ts
// vite.config.ts
base: '/<your-repo-name>/',
```

5. Push to `main` — the workflow handles the rest

Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`

### Deploying to a custom domain or root path

Set `base: '/'` in `vite.config.ts` and configure your domain in Settings → Pages.

---

## Deploy to Vercel

Vercel auto-detects Vite. No configuration needed for root deployments.

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Set `base: '/'` in `vite.config.ts` (remove the `/motile/` path prefix)
3. Deploy — Vercel handles builds on every push automatically

**Or deploy from the CLI:**

```bash
npm i -g vercel
npm run build
vercel --prod
```

---

## Deploy to Netlify

```bash
npm run build
# drag the dist/ folder to app.netlify.com/drop
```

Or connect the repo and set build command to `npm run build`, publish directory to `dist`.

---

## Roadmap

- [ ] Multi-item editor for Link Grid and Social blocks (currently edit `page.json` directly)
- [ ] Image upload for hero avatar
- [ ] One-click Publish button (commits `page.json` to the repo via GitHub API)
- [ ] Analytics (click tracking)
- [ ] Custom domain / slug routing
- [ ] Password-protected pages

---

## License

MIT
