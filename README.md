# CFAL Website

Website for the **Computational Fluids and Aerodynamics Laboratory (CFAL)**, Department of Aerospace Engineering, Embry-Riddle Aeronautical University. Principal Investigator: **Dr. Michael Kinzel**.

It's a static site built with [Astro](https://astro.build) and deployed to GitHub Pages. There is no backend, database or runtime API. Pages are generated from structured data (YAML) and Markdown, so adding people, projects, publications and news means editing content files, not templates.

> **Most content is placeholder material.** Only Dr. Kinzel's name and his role as Principal Investigator are real. Everything else (research themes, projects, people, publications, news, mission text and contact details) is clearly labelled demo content. See [Placeholder content to replace](#placeholder-content-to-replace).

---

## Quick start

Requires **Node.js 22.12 or newer**.

```bash
npm install
npm run dev        # http://localhost:4321
```

### Production build

```bash
npm run build      # outputs static HTML/CSS/JS to dist/
npm run preview    # serves dist/ locally
npm run check      # type-checks .astro/.ts files and content schemas
```

---

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages build + deploy
astro.config.mjs               site/base settings (see Deployment)
public/
  images/branding/             official banner (cfal-aerospace-header.png) + CFAL mark
  images/og/                   default social-sharing image
  favicon/, favicon.ico
src/
  site.config.ts               lab identity, navigation, contact details, homepage hero media
  content.config.ts            content collections + schemas (validated at build time)
  data/
    people.yaml                team members
    researchAreas.yaml         research themes
    publications.yaml          bibliography
    opportunities.yaml         Join Us page sections
  content/
    projects/*.md              one Markdown file per project
    news/*.md                  one Markdown file per news post
  assets/images/               images referenced by content (optimised at build)
    hero/ research/ projects/ news/ team/
  components/
    layout/   Header, Footer, BaseHead (SEO), PageHeader
    hero/     Hero (layered), HeroMedia, HeroCanvas
    ui/       Button, Icon, Media, SectionHeader, ScholarLink, ExternalLink,
              FilterBar, DetailList, DemoBadge, FlowLines
    research/ ResearchAreaCard, ResearchArea
    projects/ ProjectCard
    people/   PersonCard, PersonModal, PIFeature
    publications/ PublicationItem
    news/     NewsCard
  layouts/    BaseLayout (page shell), ContentLayout (project/news detail)
  lib/        content queries, URL/base-path helper, image resolver, taxonomy
  pages/      routes (see below)
  scripts/    hero-visualization.ts (canvas/WebGL integration point)
  styles/     tokens.css (design tokens), global.css (base + shared patterns)
```

### Routes

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/research/` | research areas + auto-linked projects/publications |
| `/projects/` | filterable project grid (`?area=…&status=…`) |
| `/projects/[slug]/` | one page per file in `src/content/projects/` |
| `/team/` | generated from `src/data/people.yaml` |
| `/publications/` | grouped by year, filterable by research area |
| `/news/`, `/news/[slug]/` | one page per file in `src/content/news/` |
| `/join/` | from `src/data/opportunities.yaml` |
| `/contact/` | from `site.contact` in `src/site.config.ts` |

---

## Images

Content refers to images by **path string**:

| Value | Resolves to | Behaviour |
| --- | --- | --- |
| `team/jane-doe.webp` | `src/assets/images/team/jane-doe.webp` | **Recommended.** Resized, converted to AVIF/WebP, `srcset` + dimensions generated |
| `/images/team/jane-doe.webp` | `public/images/team/jane-doe.webp` | Served as-is (no optimisation) |
| `https://…` | remote URL | Served as-is |

If a path is empty or the file doesn't exist, a styled technical-pattern placeholder (or a portrait silhouette for people) is rendered instead, so a missing image never breaks a page. Cards crop images to fixed aspect ratios (projects 16:10, news 16:9, portraits 4:5), so any source photo keeps the grid intact. Supply images at least ~1600 px wide (portraits ≥ 800 px tall).

---

## Adding a person

Edit **`src/data/people.yaml`** and add an entry:

```yaml
- name: Jane Doe
  slug: jane-doe                 # unique; used for /team/#jane-doe and references
  role: phd                      # pi | postdoc | phd | ms | bs | alumni
  degreeStatus: PhD Student      # optional; defaults from the role
  portrait: team/jane-doe.webp   # put the file in src/assets/images/team/
  researchInterests:
    - Computational aerodynamics
    - Rotorcraft
  googleScholar: https://scholar.google.com/citations?user=XXXXXXX
  order: 10                      # sort order within the role
```

The Team page groups people automatically in the order PI → Postdoctoral → PhD → MS → Undergraduate → Alumni. Empty groups are hidden, so adding the first `role: alumni` entry makes the Alumni section appear.

Optional fields: `honorific` (e.g. `Dr.`), `title`, `portraitAlt`, `profileUrl`, `website`, `email`, `bio`, `links` (list of `{label, url}`), `graduationYear` / `currentPosition` (alumni), `placeholder`. Every card opens an accessible profile dialog, and `/team/#<slug>` links open it directly.

## Adding a project

Create **`src/content/projects/my-project.md`**. The file name becomes the URL (`/projects/my-project/`).

```markdown
---
title: My Project
summary: One or two sentences shown on cards and at the top of the page.
status: current                 # current | completed
researchArea: rotorcraft-aerodynamics   # an id from researchAreas.yaml (omit → "Other")
heroImage: projects/my-project.webp
heroImageAlt: Describe the image.
startYear: 2025
endYear: 2027                   # omit for ongoing work
people: [michael-kinzel, jane-doe]      # slugs from people.yaml
sponsors: [Sponsor name]        # or [{ name: Sponsor, url: https://… }]
tags: [CFD, rotors]
featured: true                  # candidate for the homepage
order: 10
collaborators: [{ name: Name, affiliation: Institution, url: https://… }]
software: [{ name: Code name, description: What it is, url: https://… }]
gallery: [{ src: projects/figure-1.webp, alt: …, caption: … }]
videos: [{ title: Wake animation, src: /media/projects/wake.mp4, poster: projects/wake.webp }]
relatedProjects: [another-project-slug]
---

## Overview
## Motivation
## Methods
## Results
```

Only `title` and `summary` are required; empty fields are omitted from the page. Videos can be self-hosted (put files in `public/media/…`) or embedded with `embedUrl:` (a YouTube/Vimeo *embed* URL). Publications that list this project's slug in `publications.yaml` appear on the project page automatically, and the project appears under its research area on the Research page.

## Adding a publication

Edit **`src/data/publications.yaml`**:

```yaml
- id: kinzel2027example          # unique; the BibTeX key works well
  title: Full Title of the Paper
  authors: [A. Author, B. Author, M. Kinzel]
  year: 2027
  month: 3                       # optional, refines ordering within a year
  venue: AIAA Journal
  type: journal                  # journal | conference | thesis | report | book | preprint | other
  doi: 10.2514/1.J000000         # bare DOI
  url: https://…                 # publisher page (optional)
  pdf: https://…                 # open-access PDF (optional)
  googleScholar: https://…       # optional; otherwise a Scholar title search is linked
  featured: true                 # candidate for the homepage "Selected publications"
  projects: [my-project]         # project slugs
  researchAreas: [rotorcraft-aerodynamics]
  bibtex: |
    @article{kinzel2027example,
      title = {…},
      ...
    }
```

Entries are sorted newest first, grouped by year and filterable by research area. BibTeX expands in place (works without JavaScript) and has a **Copy BibTeX** button.

## Adding news

Create **`src/content/news/my-news.md`**:

```markdown
---
title: Headline
date: 2027-01-15
excerpt: One-sentence summary for cards.
category: Awards                # Publications | Awards | Conferences | Student News | Research | Lab Updates
image: news/my-news.webp
imageAlt: Describe the image.
people: [jane-doe]              # optional related people
projects: [my-project]          # optional related projects
---

Article body in Markdown.
```

Set `draft: true` to hide a post (or a project) without deleting it.

## Research areas and Join Us content

- **Research themes:** `src/data/researchAreas.yaml` (`featured: true` places a theme on the homepage).
- **Join Us sections:** `src/data/opportunities.yaml` (one entry per audience).
- **Lab identity, mission text, contact details, navigation:** `src/site.config.ts`.

---

## Content & data schemas

All schemas are defined and validated in **`src/content.config.ts`**. A build fails with a clear message if a required field is missing, a URL is malformed, or a reference (e.g. a person slug in a project) doesn't exist. Every data file starts with a comment block documenting its fields, and the sections above show a complete example of each. Fixed vocabularies (roles, statuses, news categories, publication types) live in `src/lib/taxonomy.ts`.

The `placeholder: true` flag, available on every collection, renders a "Demo content — replace" badge. Remove the flag once an entry contains real content.

---

## Replacing the hero media

The homepage hero is layered:

```text
Hero (src/components/hero/Hero.astro)
├── 1 media layer       ← swapped via config; absolutely positioned, fills the hero
├── 2 readability overlay
├── 3 technical overlay (grid / streamlines)
├── 4 content layer     ← headline, text, buttons (never changes)
└── 5 controls          ← caption, video pause button
```

Change **`homeHero`** in `src/site.config.ts`:

**CFD image**: put the file in `src/assets/images/hero/`:

```ts
export const homeHero: HeroMediaConfig = {
  type: 'image',
  src: 'hero/my-render.webp',
  alt: '',                       // decorative background, keep empty
  position: '65% 50%',           // object-position, controls crop on narrow screens
  caption: 'Q-criterion isosurfaces coloured by velocity magnitude',
};
```

**MP4 / WebM video**: put files in `public/media/hero/`:

```ts
export const homeHero: HeroMediaConfig = {
  type: 'video',
  sources: [
    { src: '/media/hero/flow.webm', type: 'video/webm' },
    { src: '/media/hero/flow.mp4', type: 'video/mp4' },
  ],
  poster: 'hero/flow-poster.webp',  // still frame; also shown to reduced-motion users
};
```

The video autoplays muted and looped. A **pause/play** control is added automatically, and playback is disabled when the visitor prefers reduced motion. Keep clips short and small (ideally under 5 MB).

**Custom animation / WebGL / canvas**:

```ts
export const homeHero: HeroMediaConfig = { type: 'canvas', poster: 'hero/my-render.webp' };
```

Then implement `mountHeroVisualization()` in **`src/scripts/hero-visualization.ts`**. The canvas is already sized to the hero (with devicePixelRatio handling), sits above the poster and below the overlay, and receives a `reducedMotion` flag. The script is only bundled when canvas mode is active.

**Any other component** (for example a framework island) can be passed straight into the media slot:

```astro
<Hero size="home"><MyVisualization slot="media" client:visible /> …</Hero>
```

Interior page headers use the same `Hero` component, so they can also take a `media` prop (project pages already use their `heroImage`).

---

## Branding

- **Official banner:** `public/images/branding/cfal-aerospace-header.png` (the supplied ERAU / Aerospace Engineering / CFAL banner, used in the desktop header and footer). Replace it with a higher-resolution version (≥ 1400 px wide, or an SVG) if available. The current file is 696 × 84 px, which is slightly soft on high-DPI screens. If the replacement has different dimensions, update `branding.bannerWidth/bannerHeight` in `src/site.config.ts`.
- **CFAL mark:** `public/images/branding/cfal-mark.png` is cropped from the supplied banner. It's used in the compact mobile header and the favicons. Replace it with an official standalone mark if one exists.
- **Favicons:** `public/favicon.ico` and `public/favicon/`.
- **Social image:** `public/images/og/cfal-default.png` (1200 × 630).
- **Design tokens:** `src/styles/tokens.css`. Colours were sampled from the supplied banner and from erau.edu. They approximate the ERAU look and are not official brand values. Typography uses Oswald (headings, labels) and Roboto (body), self-hosted via Fontsource, so there are no external font requests.

---

## Deployment (GitHub Pages)

1. Push this project to a GitHub repository with `main` as the default branch.
2. In the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab). `.github/workflows/deploy.yml` installs dependencies, builds Astro, uploads `dist/` and deploys it.

### `site` and `base`

These are set in **`astro.config.mjs`** from two environment variables:

| Variable | User/org site `username.github.io` | Project site `username.github.io/cfal/` |
| --- | --- | --- |
| `SITE_URL` | `https://username.github.io` | `https://username.github.io` |
| `BASE_PATH` | `/` | `/cfal` |

**You normally don't set them yourself.** The workflow reads them from `actions/configure-pages`, which reports the correct origin and base path for your repository, including custom domains. To override, define repository variables `SITE_URL` / `BASE_PATH` (Settings → Secrets and variables → Actions → Variables).

All internal links and asset URLs go through `url()` in `src/lib/url.ts`, so both layouts work without code changes. To test a sub-path build locally:

```bash
SITE_URL=https://username.github.io BASE_PATH=/cfal npm run build && npm run preview
# Windows Git Bash rewrites "/cfal" into a Windows path; prefix with MSYS_NO_PATHCONV=1
```

For a **custom domain**, add it under Settings → Pages. The workflow picks it up automatically.

---

## Accessibility & performance notes

- Semantic landmarks, skip link, one `h1` per page, visible focus styles, `aria-current` navigation.
- Mobile menu is a disclosure button (Escape closes and returns focus). Without JavaScript the links display inline.
- Profile dialogs use native `<dialog>` with the Invoker Commands API (`commandfor`), plus a script fallback: Escape, backdrop click and close button all close the dialog, focus returns to the originating card, and page scroll is locked.
- `prefers-reduced-motion` is honoured globally (`tokens.css`) and by the hero video/canvas.
- JavaScript is limited to small per-component scripts (menu, dialogs, filters, BibTeX copy, hero video). No page is hydrated. Filters and BibTeX degrade gracefully without JavaScript.
- Images are responsive AVIF with WebP fallback, lazy-loaded below the fold, with explicit dimensions.

---

## Placeholder content to replace

| What | Where |
| --- | --- |
| Mission statement | `site.mission` in `src/site.config.ts` |
| Contact email, phone, building/room, campus, address, map link | `site.contact` in `src/site.config.ts` |
| Department website link, lab Google Scholar link | `site.links` in `src/site.config.ts` |
| Dr. Kinzel's academic title, portrait, bio, research interests, Scholar/profile links | `michael-kinzel` entry in `src/data/people.yaml` |
| All other people (placeholders) | `src/data/people.yaml` |
| Research themes (titles, text, capabilities, images) | `src/data/researchAreas.yaml` |
| Demo projects (5) | `src/content/projects/` |
| Demo publications (4, fictitious) | `src/data/publications.yaml` |
| Demo news posts (2) | `src/content/news/` |
| Join Us text | `src/data/opportunities.yaml` |
| Placeholder visualizations (analytic flows, clearly labelled) | `src/assets/images/**` |
| Hero image | `homeHero` in `src/site.config.ts` |
| Higher-resolution banner / standalone CFAL mark | `public/images/branding/` |

To find remaining demo content, search the project for `placeholder: true`.
