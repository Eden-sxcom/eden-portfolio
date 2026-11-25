# Adventure Log. — Eden Portfolio

A single-page portfolio: an Echo-style opening screen that dissolves into a
Selvagant-style scroll narrative — 3D compass warp, black portal, field-log
bio, a four-project depth carousel, the technical arsenal, and the landscape
footer.

Built with React 19, TypeScript, Vite 8, GSAP/ScrollTrigger and Three.js.

## Requirements

- Node.js **22.12+** (Vite 8 and React 19)
- npm 10+

## Development

```bash
npm ci        # install from the lockfile
npm run dev   # http://localhost:3000
```

The dev server binds `0.0.0.0:3000` with `strictPort` enabled.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | `tsc -b` type check, then production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | oxlint over `src/` |

## Project structure

```
index.html              document shell, meta/OG tags, scroll-restoration reset
src/
  App.tsx               page composition and section order
  main.tsx              React root
  components/           Preloader, EchoLanding, About, SelectedExpeditions,
                        HeroCompass3D (lazy), FieldArsenal, Footer, TacticalNav,
                        Header, TargetCursor, modals
  components/ui/        AccordionGallery, DepthCarousel, PixelSwap
  hooks/                useMotionEngine (all ScrollTrigger choreography),
                        useAssetReadiness (preloader gating), useWibTime
  data/                 expeditions, arsenal, footer content
  styles/               tokens, global, stage layout, fonts, NotchDock
  types/                shared Content types
public/                 fonts, images, models, logo set, _headers, favicon
```

All runtime media lives under `public/` and is referenced with root-absolute
paths (`/images/...`, `/fonts/...`), so the site must be served from a domain
root (Netlify, Vercel, or any static host). It does not support being deployed
into a sub-path without setting Vite's `base`.

## Deployment

The build is fully static — no server, no environment variables, no API keys.

### Netlify

`netlify.toml` sets `npm ci && npm run build`, publishes `dist/`, and pins
Node 22. Security and cache headers are defined once in `public/_headers` and
applied automatically.

### Vercel

Import the repository; `vercel.json` sets the framework, build command and
output directory, and mirrors the security/cache headers (Vercel does not read
`_headers`).

### Any static host

```bash
npm ci && npm run build
# upload the contents of dist/
```

## Assets

- `public/models/vintage_compass_web.glb` (~2.4 MB) drives the 3D compass and is
  loaded lazily by the `HeroCompass3D` chunk, after the preloader's critical
  assets (portrait, two logo SVGs, fonts, DOM).
- Fonts are self-hosted in `public/fonts` and declared in `src/styles/fonts.css`.
- `public/logo/` ships the full logo set (SVG + PNG, light/dark variants); only a
  subset is referenced by the UI.

## Browser notes

The opening stages use WebGL. Without a working context the compass layer falls
back gracefully (context-creation failure and `webglcontextlost` are handled);
the rest of the page is CSS/DOM driven and keeps working.

`prefers-reduced-motion` is respected across the CSS animations and the
carousel, while the main scroll timeline still runs.
