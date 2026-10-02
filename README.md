# Srijith Chetla — Portfolio

A single-page portfolio built on a strict dark editorial system: near-black canvas, one electric
indigo accent, oversized type, pill controls, and **zero** shadows, gradients or extra hues.

All creativity is spent on motion and typography — mask-wipe reveals, per-character clip
assemblies, scroll-linked travel, and hand-built SVG charts that count themselves up.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
```

Deploy the `dist/` folder anywhere — Vercel, Netlify, Cloudflare Pages, GitHub Pages.

## Editing content

**Everything lives in `src/data/portfolio.ts`.** No component hardcodes copy, links, or numbers.

| Export | What it drives |
|---|---|
| `profile` | Name, headline, rotating hero role, about paragraphs, contact details, socials, résumé path |
| `projects` | The work section — summary, description, stack, highlights, **live demo URL**, **GitHub URL**, preview style, metrics |
| `experience` | The scrolling timeline |
| `achievements` | The recognition list |
| `codingStats` | Every chart: difficulty ladder, rating arcs, monthly bars, contribution grid, language ribbon |

### Adding a project

Append to `projects`. To change the mock preview panel, pick an existing `preview` style or add a
new branch in `src/components/ProjectPreview.tsx`:

```ts
{
  id: 'your-project',
  index: '06',
  name: 'Your Project',
  year: '2026',
  status: 'Live',                    // Live | In production | Prototype | Archived
  summary: 'One line at 18px.',
  description: 'The 36px-ish editorial paragraph. Two or three sentences.',
  stack: ['TypeScript', 'Go'],
  highlights: ['Proof, not adjectives', 'Numbers where possible'],
  liveUrl: 'https://your-demo.com',  // null renders a disabled state
  repoUrl: 'https://github.com/you/your-project',
  preview: 'streams',                // canvas | streams | queue | terminal | orbit
  metrics: [{ label: 'p95 latency', value: '38ms' }],
}
```

### Résumé

Drop your PDF at `public/resume.pdf`, or change `profile.resumeUrl` and `profile.resumeFileName`.
The download buttons pick it up automatically — both the hero and the contact section.

## Design system

Defined once in `src/index.css` under Tailwind v4's `@theme`.

- **Colour** — Obsidian `#050505` canvas, Charcoal `#151515` panels, Graphite `#1e1e1e` overlays.
  Electric Indigo `#1500ff` appears in exactly four places: the single primary CTA per viewport,
  the dot travelling down the experience rail, the Hard tier in the difficulty ladder, and your
  record-streak day in the contribution grid.
- **Type** — one geometric sans at every scale. The hero is `clamp(56px, 11.5vw, 144px)` at
  `line-height: 0.96` and `-0.04em` tracking so the name compresses into a sculptural block.
- **Radius** — binary. `9999px` for every interactive element, `14px` for every passive surface.
  Nothing in between.
- **Elevation** — surface colour steps only. There are no drop shadows anywhere.

## Accessibility

Every animation collapses to a short opacity fade under `prefers-reduced-motion: reduce`. Links
that open new tabs carry `rel="noreferrer noopener"` and labels. Interactive elements have visible
focus rings. The contribution grid carries `title` tooltips per cell.