# Loknath Patel — Portfolio

Personal portfolio site built with **Astro 7**, **Tailwind CSS v4**, and **TypeScript**.

- Live: _pending deployment_
- Repo: _pending_

## Stack

- [Astro 7](https://astro.build) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com) — via `@tailwindcss/vite`, using the `@theme` directive (no `tailwind.config.mjs`)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io) — package manager
- [Resend](https://resend.com) — contact form email delivery (via `fetch`, not the Node SDK)
- Self-hosted fonts: [Inter Variable](https://fontsource.org/fonts/inter/variable) + [JetBrains Mono Variable](https://fontsource.org/fonts/jetbrains-mono/variable) via Fontsource

## Content

Content lives in `src/data/content.js` for now (metrics, projects, articles, tech capabilities, about). TinaCMS integration is deferred — the `.ts` config source is blocked in this environment by an Astro 7 + Vite TSX transform bug.

## Project structure

```text
loknath-portfolio/
├── public/              # Static assets (robots.txt)
├── src/
│   ├── components/      # Astro components (Nav, Footer, Metrics, Projects, Writing, Skills, About)
│   │   └── islands/     # React islands (currently empty — blocked by TSX transform bug)
│   ├── data/
│   │   └── content.js   # Placeholder content (metrics, projects, articles, skills, about)
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.js   # Contact form backend (plain JS Astro API route)
│   │   ├── index.astro
│   │   └── writing/     # 4 placeholder article pages
│   └── styles/
│       └── theme.css    # Semantic CSS variables + Tailwind v4 @theme mapping
├── dist/                # Static build output
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting started

```bash
# Install dependencies
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview
```

## Environment variables

Copy `.env.example` to `.env` and fill in the real values:

```bash
cp .env.example .env
```

Required for the contact form:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for sending contact form emails |
| `CONTACT_TO_EMAIL` | Email address that receives contact form submissions |
| `PUBLIC_SITE_URL` | Public URL of the deployed site (defaults to `https://example.com`) |

The contact form route (`src/pages/api/contact.js`) uses `fetch` to call the Resend API directly — no Node SDK needed. It works on any Astro adapter that supports serverless/edge functions.

## Contact form

- **Endpoint**: `POST /api/contact`
- **Fields**: `name`, `email`, `subject`, `message` (all required)
- **Validation**: plain JS in `contact.js` — name required, email must contain `@`, subject and message must be non-empty
- **Delivery**: Resend API via `fetch`
- **From address**: `Portfolio Contact <onboarding@resend.dev>` (placeholder — replace with a verified domain when ready)

## Theme

- Dark mode by default
- Light/dark toggle in the nav (vanilla JS, no React)
- Preference persisted in `localStorage`
- FOUC prevention: inline script in `<head>` reads `localStorage` before paint, falls back to `prefers-color-scheme`

## Deployment

### Vercel (default adapter)

1. Install the adapter: `pnpm add @astrojs/vercel`
2. Add to `astro.config.mjs`:

   ```js
   import vercel from "@astrojs/vercel";
   export default defineConfig({
     // ...
     adapter: vercel(),
   });
   ```

3. Connect the repo to Vercel
4. Set env vars in Vercel dashboard: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `PUBLIC_SITE_URL`
5. Deploy

### Netlify

1. Install the adapter: `pnpm add @astrojs/netlify`
2. Update `astro.config.mjs` to use `@astrojs/netlify`
3. Connect the repo to Netlify
4. Set env vars in Netlify dashboard
5. Deploy

### Cloudflare Pages

1. Install the adapter: `pnpm add @astrojs/cloudflare`
2. Update `astro.config.mjs` to use `@astrojs/cloudflare`
3. Connect the repo to Cloudflare Pages
4. Set env vars in Cloudflare dashboard
5. Deploy

### Adapters

The adapter is intentionally isolated to `astro.config.mjs` only. Swap it by changing one import. No host-specific code anywhere else — API routes use web standards only (no Node-only APIs), and Resend is called via `fetch`.

### Env vars on the host

Set these on your hosting platform:

- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO_EMAIL` — destination email for contact form submissions
- `PUBLIC_SITE_URL` — full public URL of the deployed site (e.g. `https://loknath.dev`)

`PUBLIC_SITE_URL` drives the JSON-LD Person schema, Open Graph `og:url`, `robots.txt` sitemap reference, and the sitemap generator.

## SEO

- [x] JSON-LD `Person` schema in `<head>`
- [x] Open Graph tags (`og:title`, `og:description`, `og:type=profile`, `og:url`)
- [x] `robots.txt` with sitemap reference
- [x] `sitemap.xml` via `@astrojs/sitemap`

## Accessibility

- [x] Keyboard-operable interactive elements with visible focus states (`focus-visible:outline-2`)
- [x] Semantic heading hierarchy (h1 → h2 → h3)
- [x] `prefers-reduced-motion` support
- [x] Form labels + `aria-live` feedback (when contact form component is built)
- [ ] Formal Lighthouse / contrast audit (deferred)

## Performance targets

- [ ] Lighthouse 95+
- [ ] LCP < 1.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms

## Deferred

- React islands (ThemeToggle, MobileNav, Hero parallax, Contact Form) — blocked by Astro 7.3.5 + Vite TSX transform bug
- TinaCMS — blocked by same TSX transform issue (config is TypeScript source)
- Real content (projects, metrics, social URLs, article links, profile image)
- Rate limiting on contact form
- Zod validation on contact form (deferred until TypeScript API routes build)

## License

Personal portfolio — all rights reserved.
