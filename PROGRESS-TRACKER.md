# Portfolio Progress Tracker

Last updated: [agent fills date]
Current phase: [agent fills]
---

## Working Style: Ponytail

Ponytail is active for this project at **FULL** intensity (session-only; no ponytail skill/AGENTS files committed to the repo).

The rule for every line of code: before writing anything, stop at the first rung that holds.

1. Does this need to exist? → no: skip it (YAGNI)
2. Already in this codebase? → reuse it, don’t rewrite
3. Stdlib does it? → use it
4. Native platform feature? → use it
5. Installed dependency? → use it
6. One line? → one line
7. Only then: the minimum that works

Lazy, not negligent: trust-boundary validation, data-loss handling, security, and accessibility are never on the chopping block.

Applied to this portfolio: prefer Astro/React built-ins, web standards, native HTML controls, and already-installed dependencies over new components or libraries. New dependencies are a last resort, not a first move.

Review cadence: run the ponytail review command after every meaningful code change.

---



## 1. Setup & Config

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Astro v7 + TypeScript init | 🟡 | Manual scaffold used (pnpm create astro timed out). Astro 7.3.5 + TypeScript installed, static build passing. |
| 1.2 | Tailwind CSS v4 + typography plugin | ⬜ | Use @theme directive |
| 1.3 | @astrojs/react for islands | ⬜ | |
| 1.4 | @astrojs/mdx | ⬜ | |
| 1.5 | @astrojs/sitemap | ⬜ | |
| 1.6 | Astro adapter (isolated in astro.config.mjs) | ⬜ | Default: @astrojs/vercel; swappable |
| 1.7 | pnpm setup | ⬜ | |
| 1.8 | Fonts: Inter + JetBrains Mono | 🟡 | Fontsource variable fonts (@fontsource-variable/inter, @fontsource-variable/jetbrains-mono). Self-hosted woff2 bundled to dist/_astro/; font-display: swap; weight ranges 100-900 (Inter), 100-800 (JetBrains Mono). |
| 1.9 | src/styles/theme.css (semantic CSS variables) | ⬜ | Single source of truth |

---

## 2. Theme & Design System

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Semantic CSS variables (--background, --foreground, --primary, etc.) | ⬜ | |
| 2.2 | Dark mode (default) | ⬜ | |
| 2.3 | Light mode toggle (deliberate palette, not inverted) | ⬜ | |
| 2.4 | localStorage persistence + FOUC prevention (inline <head> script) | ⬜ | |
| 2.5 | Tailwind v4 @theme directive mapping CSS variables | ⬜ | No tailwind.config.mjs |

---

## 3. Components

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 3.1 | Nav (Work · About · Stack · Contact) | ⬜ | |
| 3.2 | ThemeToggle (React island) | 🔴 | Deferred: React islands blocked by Astro 7.3.5 + Vite 8.3.2 TSX transform bug in this environment. Non-React placeholder used for now. |
| 3.3 | MobileNav (React island, hamburger) | 🔴 | Deferred: React islands blocked by Astro 7.3.5 + Vite 8.3.2 TSX transform bug in this environment. Non-React placeholder used for now. |
| 3.4 | Hero (parallax image right side — desktop only) | 🔴 | Deferred: React islands blocked by Astro 7.3.5 + Vite 8.3.2 TSX transform bug in this environment. CSS-only fallback for now. |
| 3.5 | Terminal-style code card | ⬜ | |
| 3.6 | Metrics (4 cards, CMS-driven) | ⬜ | label, value, icon, description |
| 3.7 | Projects (4 cards, hover animations via CSS) | ⬜ | |
| 3.8 | Technical Writing (article cards) | ⬜ | |
| 3.9 | Tech Capabilities (3-column grid) | ⬜ | |
| 3.10 | About / Bio | ⬜ | |
| 3.11 | Contact Form (React island) | ⬜ | aria-live feedback |
| 3.12 | Footer (6 social links, CMS-driven) | ⬜ | |

---

## 4. Contact Form Backend

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | src/pages/api/contact (standard Astro route) | ✅ | Working route: src/pages/api/contact.js (plain JS). TypeScript API routes (src/pages/api/*.ts) blocked in this environment by Astro 7.3.5 + Vite 8.3.2 source-transform bug (Unexpected token on imports). |
| 4.2 | Resend API via fetch (not Node SDK) | ✅ | fetch-based, no Node SDK. Uses onboarding@resend.dev placeholder from until real RESEND_FROM/contact email configured. |
| 5.1 | tina/config.ts | ⬜ | |
| 4.3 | Env vars: RESEND_API_KEY, CONTACT_TO_EMAIL | ⬜ | Document in README + .env.example |
| 4.4 | Validation (all fields required) | 🟡 | Plain JS validation in contact.js (name/email/subject/message). Zod deferred until TypeScript API routes build. |
| 4.5 | Rate limiting (in-memory Map for now) | ⬜ | Not yet implemented (deferred). |

---

## 5. TinaCMS

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | tina/config.ts | 🔴 | Deferred: TinaCMS config is TypeScript source; .ts config/route source transformation is blocked in this environment (Astro 7.3.5 + Vite 8.3.2 __directives/not transforming src/pages .ts/.tsx imports). Placeholder tina/config.js not viable for TinaCMS Astro integration in this state. |
| 5.2 | projects collection schema (+ outcome field) | 🔴 | Deferred with Section 5.1. |
| 5.3 | articles collection schema | 🔴 | Deferred with Section 5.1. |
| 5.4 | siteConfig schema (socialLinks, metrics[]) | 🔴 | Deferred with Section 5.1. |
| 5.5 | Cloudinary media store integration | 🔴 | Deferred with Section 5.1. |
| 5.6 | TinaCMS Cloud connection | 🔴 | Deferred with Section 5.1. |

---

## 6. SEO

| # | Task | Status | Notes |
|---|------|--------|-------|
| 6.1 | JSON-LD Person schema | ✅ | Person schema in <head>; sameAs intentionally empty (no non-placeholder social URLs yet). |
| 6.2 | Open Graph tags | ✅ | og:title, og:description, og:type=profile, og:url rendered from PUBLIC_SITE_URL (defaults to https://example.com). |
| 6.3 | robots.txt | ✅ | Static public/robots.txt with sitemap-index.xml placeholder; document PUBLIC_SITE_URL + rebuild for production. |
| 6.4 | sitemap.xml | ✅ | @astrojs/sitemap wired in astro.config.mjs; site from PUBLIC_SITE_URL; sitemap-index.xml generated in dist. |

---

## 7. Animations

| # | Task | Status | Notes |
|---|------|--------|-------|
| 7.1 | Parallax on hero image (Framer Motion, desktop only) | ⬜ | |
| 7.2 | Staggered fade-up (Intersection Observer + CSS) | ⬜ | |
| 7.3 | Card hover scale + glow (CSS) | ⬜ | |
| 7.4 | Tech tag hover scale (CSS) | ⬜ | |

---

## 8. Accessibility

| # | Task | Status | Notes |
|---|------|--------|-------|
| 8.1 | Keyboard navigation for all interactive elements | ⬜ | |
| 8.2 | Visible focus states | ⬜ | |
| 8.3 | Semantic heading hierarchy | ⬜ | |
| 8.4 | Form labels + aria-live | ⬜ | |
| 8.5 | prefers-reduced-motion support | ⬜ | |
| 8.6 | Alt text for all images | ⬜ | |
| 8.7 | WCAG AA contrast check | ⬜ | |

---

## 9. Deployment

| # | Task | Status | Notes |
|---|------|--------|-------|
| 9.1 | GitHub repo created | ⬜ | |
| 9.2 | Hosting project connected | ⬜ | Default: Vercel |
| 9.3 | Env vars set on host | ⬜ | |
| 9.4 | Cloudflare Analytics | ⬜ | |
| 9.5 | Custom domain (later) | ⬜ | |

---

## 10. Performance Audit

| # | Task | Status | Notes |
|---|------|--------|-------|
| 10.1 | Lighthouse 95+ (target, not guaranteed) | ⬜ | |
| 10.2 | LCP < 1.5s | ⬜ | Under optimized conditions |
| 10.3 | CLS < 0.1 | ⬜ | |
| 10.4 | INP < 200ms | ⬜ | |

---

## 11. Content (Placeholders → Real)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 11.1 | 4 project cards (placeholder) | ⬜ | |
| 11.2 | 4 projects (real content) | ⬜ | |
| 11.3 | Metrics values (real) | ⬜ | |
| 11.4 | Article links (real) | ⬜ | |
| 11.5 | Social URLs (real) | ⬜ | |
| 11.6 | Profile image (real) | ⬜ | |

---

## 12. Deployment Flexibility

| # | Task | Status | Notes |
|---|------|--------|-------|
| 12.1 | Standard Astro API route (no host-specific code) | ⬜ | |
| 12.2 | Adapter isolated to astro.config.mjs only | ⬜ | |
| 12.3 | No Node-only APIs in API routes | ⬜ | Web standards only |
| 12.4 | Resend called via fetch (not Node SDK) | ⬜ | |
| 12.5 | README: adapter switch guide added | ⬜ | |
| 12.6 | Env vars documented for Vercel + Netlify + Cloudflare | ⬜ | |

---

## Change Log

| Date | Change | By |
|------|--------|-----|
| 2026-10-06 | Added Section 12 (Deployment Flexibility); added Section 8 (Accessibility); renamed old 8→9, 9→10, 10→11 | Spec |
| 2026-10-06 | Fixed Tailwind v4 @theme directive; added FOUC prevention; added Zod + rate limiting; added outcome field; Cloudinary media store clarified | Spec |

| 2026-10-06 | Added Ponytail as project-wide working style at FULL intensity (session-only) | agent |

---

## Legend

⬜ Not started
🟡 In progress
✅ Done
🔴 Blocked