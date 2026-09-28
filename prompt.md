prompt = r"""# Claude Code Prompt — CFAL Research Lab Website

You are building a new research laboratory website from scratch.

The site is for the **Computational Fluids and Aerodynamics Laboratory (CFAL)** within the **Department of Aerospace Engineering at Embry-Riddle Aeronautical University**.

The principal investigator is:

**Dr. Michael Kinzel**

The website will be deployed as a **static site on GitHub Pages**.

Your task is to implement a polished MVP with a strong reusable architecture. Do not treat this as a quick mockup. Establish the infrastructure and component system that can support a mature research-lab website later.

## 1. Technology

Use:

- **Astro**
- TypeScript where appropriate
- static site generation
- GitHub Pages compatible build
- minimal client-side JavaScript
- responsive CSS
- Astro Content Collections where appropriate
- no backend
- no database
- no authentication
- no runtime API dependencies

Avoid adding a heavy UI framework unless there is a compelling technical reason.

Prefer native Astro components, semantic HTML, CSS, and lightweight TypeScript.

The final site must build to static HTML/CSS/JS.

---

# 2. Overall Visual Direction

The site should visually communicate:

> Embry-Riddle Aerospace Engineering + modern computational aerodynamics research.

Use the existing ERAU visual identity as a foundation without simply cloning the ERAU website.

Target style:

**ERAU institutional branding + modern research laboratory + computational/aerospace visualization.**

Take inspiration from:

- Embry-Riddle's existing website
- Aerospace Engineering department branding
- the supplied CFAL / Department of Aerospace Engineering header graphic
- CFD visualization software
- aerospace research publications
- high-end university research-group websites

The uploaded logo/banner is an important visual reference.

It contains:

- Embry-Riddle Aeronautical University branding
- Department of Aerospace Engineering branding
- CFAL logo/identity

Preserve the logo proportions. Do not recreate the logo in CSS.

---

# 3. Color System

Develop the site's design tokens around approximately:

- ERAU deep navy
- secondary aerospace blue
- white
- very light gray
- charcoal text
- CFAL cyan/teal
- restrained gold accent if useful

Do **not** make the site excessively colorful.

The dominant visual hierarchy should be approximately:

**navy → white → blue → cyan/teal → subtle gold**

Use CSS custom properties such as:

```css
--color-navy
--color-blue
--color-cfal
--color-gold
--color-background
--color-surface
--color-text
--color-muted
--color-border
```

Derive the final values from the supplied branding rather than claiming arbitrary colors are official ERAU brand values.

---

# 4. Visual Character

The website should feel:

- technical
- modern
- clean
- academic
- aerospace-focused
- research-driven
- credible
- professional

Avoid:

- generic corporate SaaS design
- giant rounded cards everywhere
- excessive gradients
- excessive shadows
- glassmorphism
- neon cyberpunk styling
- excessive animation
- stock-photo-heavy layouts
- overly playful styling

Use relatively sharp geometry, generous whitespace, thin borders, subtle layering, and strong typography.

Computational-fluid-dynamics visual language can appear through:

- streamline-inspired lines
- mesh/grid motifs
- contour-map imagery
- simulation imagery
- aerodynamic silhouettes
- subtle technical backgrounds

These should remain restrained.

---

# 5. Animation Infrastructure

**Do not spend time implementing elaborate animations.**

I will provide animations and CFD visualizations later.

However, design the site so that they can be added easily.

For example, create a hero media layer/component capable of accepting:

- static image
- looping video
- future CFD animation
- future canvas/WebGL visualization

Something conceptually similar to:

```astro
<HeroMedia
  type="image"
  src="/images/hero-placeholder.webp"
/>
```

or an equivalent reusable design.

Make the hero capable of supporting an absolutely positioned media background with overlay content without requiring a redesign later.

---

# 6. Site Navigation

Implement this primary navigation:

**Home | Research | Projects | Team | Publications | News | Join Us | Contact**

Desktop:

- horizontal navigation
- CFAL identity/logo on left
- clean university/lab header
- sticky header is acceptable if subtle

Mobile:

- accessible compact menu
- keyboard accessible
- appropriate focus handling

Create active-page indication.

---

# 7. Required Routes

Implement at minimum:

```text
/
 /research/
 /projects/
 /projects/[slug]/
 /team/
 /publications/
 /news/
 /join/
 /contact/
```

Also establish architecture for:

```text
/news/[slug]/
```

even if only one placeholder/example article exists.

---

# 8. Home Page

The homepage should feel visually impressive while remaining academically credible.

## Hero

Use a **full-width CFD/aerodynamics visualization** as the hero background.

For now, use a clearly replaceable placeholder/fallback image or CSS treatment.

Overlay:

### Computational Fluids and Aerodynamics Laboratory

Secondary text:

**Department of Aerospace Engineering  
Embry-Riddle Aeronautical University**

Include a concise lab mission statement.

Do not invent a supposedly official CFAL mission statement.

Use clearly identified placeholder/sample text that can easily be replaced later.

Include two calls to action:

**Explore Our Research**

**Meet the Team**

The hero should be approximately 70–90vh on large desktop displays but should not feel oversized on laptops.

---

# 9. Homepage Sections

Below the hero, establish sections approximately in this sequence:

### Research Overview

Introduce major research themes through 3–5 visual cards.

Use placeholder research areas for now rather than asserting unverified CFAL research activities.

The system should eventually support areas such as:

- Computational Fluid Dynamics
- Rotorcraft Aerodynamics
- Propulsion and Plume Flows
- Multiphysics
- High-Performance Computing

These are examples only.

Clearly structure the data so actual areas can replace them.

### Featured Projects

Display approximately 3 projects.

Each should have:

- image
- project title
- research category
- brief summary
- Learn More link

### Principal Investigator

Feature **Dr. Michael Kinzel** prominently.

Include:

- portrait placeholder
- name
- title
- short description placeholder
- profile link
- Google Scholar link placeholder

Do not fabricate biography, publications, email address, degrees, or research claims.

### Selected Publications

Show approximately 3 recent/featured publication entries using sample data clearly marked as placeholders.

### Latest News

Display 2–3 news cards.

### Join CFAL

Short recruitment CTA.

### University/Lab identity footer

---

# 10. Research Page

The Research page describes broad CFAL research themes rather than individual funded projects.

Use a modular structure such as:

```text
Research Area
 ├── title
 ├── summary
 ├── representative image
 ├── capabilities
 ├── related projects
 └── related publications
```

Create reusable `ResearchArea` components.

Research areas should eventually link automatically to projects belonging to that area.

Do not populate unverified factual claims about CFAL.

Use obvious placeholders/sample content where necessary.

---

# 11. Projects Architecture

The Projects system needs to support both:

1. grouping projects by research area
2. dedicated project detail pages

The landing page should support categories such as:

```text
Rotorcraft
Computational Fluid Dynamics
Propulsion
Multiphysics
Aeroacoustics
Other
```

Treat these as configuration examples rather than verified CFAL categories.

---

# 12. Projects Landing Page

Create project cards containing:

- project image
- title
- research area
- short description
- project status
- link to project page

Allow organization/filtering by research area.

Filtering can be lightweight client-side JavaScript.

Do not implement a complex state-management framework.

Allow projects to have states such as:

```text
Current
Completed
```

---

# 13. Dedicated Project Pages

Each project should receive a route:

```text
/projects/project-slug/
```

Support the following fields:

```yaml
title:
slug:
status:
researchArea:
summary:
heroImage:
startYear:
endYear:
people:
sponsors:
tags:
featured:
```

Detailed project Markdown should support:

- overview
- motivation
- methods
- results
- images
- videos
- publications
- collaborators
- software
- related projects

Not every field must be populated.

Components should gracefully omit empty fields.

---

# 14. Team Page

This is one of the highest-priority pages.

Organize personnel as:

1. Principal Investigator
2. Postdoctoral Researchers
3. PhD Students
4. MS Students
5. BS Students

Architect the system so **Alumni** can easily be added later, but it does not need to appear yet.

---

# 15. Principal Investigator

Dr. Michael Kinzel should visually receive slightly greater emphasis than other personnel.

Create a featured PI card containing:

- portrait
- **Dr. Michael Kinzel**
- title/status
- research interests
- Google Scholar link
- profile interaction

Only his name should be considered known factual content from this specification.

Do not invent:

- biography
- education
- research interests
- Scholar URL
- publications
- contact details

Use explicit placeholders where those fields are unavailable.

---

# 16. Student / Researcher Cards

Every researcher should receive a consistent profile card.

Card should include:

- portrait
- name
- degree/status
- short research-interest line

Example:

```text
Jane Doe
PhD Student

Computational aerodynamics · Rotorcraft
```

Clicking anywhere appropriate on the card should open that person's profile modal.

Cards should work with:

- mouse
- keyboard
- touch

Use appropriate semantic interactive elements rather than clickable `<div>` elements.

---

# 17. Profile Modals

Each profile modal should contain:

- larger portrait
- full name
- degree/status
- research interests
- Google Scholar link

Do not unnecessarily overload the modal.

Design the schema so more fields could eventually be added.

Required behavior:

- Escape closes modal
- clicking backdrop closes modal
- explicit close button
- focus management
- keyboard accessible
- prevent accidental inaccessible focus states
- restore focus to originating profile card after closing
- mobile responsive

Use either a native `<dialog>` solution or another lightweight accessible implementation.

Prefer native `<dialog>` if it produces robust behavior.

---

# 18. People Data Architecture

Do **not** hard-code every team member into the Team page.

Use structured data.

For example:

```text
src/content/people/
```

or:

```text
src/data/people.yaml
```

A person schema should support something similar to:

```yaml
name: Jane Doe
slug: jane-doe
role: phd
degreeStatus: PhD Student
portrait: /images/team/jane-doe.webp

researchInterests:
  - Computational Fluid Dynamics
  - Rotorcraft Aerodynamics

googleScholar: ""
order: 10
```

Roles should support:

```text
pi
postdoc
phd
ms
bs
alumni
```

Team sections should be generated automatically from this structured data.

Adding a researcher should require editing data/content rather than rewriting the page template.

---

# 19. Research/Project Data Architecture

Use a **hybrid architecture**.

### People

Structured YAML/JSON/content entries.

### Projects

Markdown/MDX content containing frontmatter.

For example:

```text
src/content/projects/
```

Each project receives its own Markdown file.

Use Astro Content Collections and schema validation where practical.

This architecture should make adding a new project as simple as creating:

```text
src/content/projects/my-project.md
```

---

# 20. Publications

Create a Publications page optimized for academic use.

Each publication should support:

- title
- authors
- venue
- year
- DOI
- BibTeX
- external publication URL
- Google Scholar link
- related research areas
- related projects

Provide buttons/links such as:

**DOI**

**BibTeX**

**Google Scholar**

For BibTeX, clicking should either:

- expand a compact BibTeX block, or
- open a modal

Include a convenient **Copy BibTeX** button.

Use accessible buttons and provide success feedback.

---

# 21. Publications Data

Store publication metadata separately from page markup.

For example:

```text
src/data/publications.yaml
```

or an Astro Content Collection.

Suggested schema:

```yaml
title:
authors:
year:
venue:
doi:
url:
googleScholar:
bibtex:
featured:
projects:
researchAreas:
```

Automatically:

- sort newest first
- group/filter by year
- support research-area filtering later

Do not insert fake publications attributed to Michael Kinzel.

Use clearly labeled placeholder records for demonstrating the interface.

---

# 22. Google Scholar Integration

Do **not** scrape Google Scholar.

Simply support external Scholar links at:

- researcher level
- publication level when applicable

Create a reusable Scholar-link component/icon treatment.

All external links should:

- open appropriately
- use safe `rel` attributes
- have accessible text

---

# 23. News

Build basic News infrastructure.

News cards should support:

- title
- date
- image
- excerpt
- optional related researcher/project
- slug

Potential categories later could include:

- Publications
- Awards
- Conferences
- Student News
- Research
- Lab Updates

Do not invent actual CFAL news.

Include one or two obvious example entries solely for demonstrating the UI.

---

# 24. Join Us Page

Create a polished recruitment page with sections for:

### Prospective Graduate Students

### Undergraduate Researchers

### Postdoctoral Researchers

Explain that specific recruiting language/contact instructions are placeholders until supplied.

Provide room for:

- desired backgrounds
- available opportunities
- application instructions
- funding information
- contact CTA

Do not invent open positions.

---

# 25. Contact Page

Create infrastructure for:

- lab location
- university
- department
- contact email
- PI
- map/address link

Known institutional identity:

**Embry-Riddle Aeronautical University  
Department of Aerospace Engineering**

Do not guess office numbers, room numbers, addresses, emails, or phone numbers.

Use placeholders.

---

# 26. Reusable Components

Create a component architecture similar to:

```text
src/components/
    Header.astro
    Footer.astro
    Hero.astro
    HeroMedia.astro
    SectionHeader.astro
    ResearchAreaCard.astro
    ProjectCard.astro
    PersonCard.astro
    PersonModal.astro
    PublicationItem.astro
    NewsCard.astro
    ScholarLink.astro
    Button.astro
```

Do not mechanically follow this list if Astro conventions suggest a cleaner structure, but maintain strong separation and reuse.

---

# 27. Suggested Project Structure

Aim for something conceptually similar to:

```text
src/
├── components/
├── content/
│   ├── projects/
│   └── news/
├── data/
│   ├── people.yaml
│   ├── publications.yaml
│   └── researchAreas.yaml
├── layouts/
│   ├── BaseLayout.astro
│   └── ContentLayout.astro
├── pages/
│   ├── index.astro
│   ├── research/
│   ├── projects/
│   ├── team/
│   ├── publications/
│   ├── news/
│   ├── join/
│   └── contact/
├── styles/
└── content.config.ts

public/
├── images/
│   ├── branding/
│   ├── team/
│   ├── projects/
│   └── research/
└── favicon/
```

Adjust if a better Astro architecture is appropriate.

---

# 28. Header Branding

The header should incorporate the supplied CFAL / Aerospace Engineering visual identity without allowing the logo to dominate the page.

Consider:

```text
ERAU / Aerospace Engineering branding
CFAL
Computational Fluids and Aerodynamics Laboratory
```

Desktop and mobile headers may use different arrangements.

The logo should remain legible on high-DPI displays.

Use the actual supplied asset rather than redrawing it.

If the asset is not present in the repository yet, create an obvious expected location such as:

```text
/public/images/branding/cfal-aerospace-header.png
```

and document this requirement.

---

# 29. Responsive Design

Explicitly design for:

```text
360px mobile
768px tablet
1024px laptop
1440px desktop
1920px large desktop
```

Pay particular attention to:

- navigation
- hero typography
- team grids
- person modals
- publication entries
- project grids
- CFD hero crop behavior

No horizontal overflow.

---

# 30. Accessibility

Target good WCAG 2.2 AA practices.

Include:

- semantic landmarks
- logical heading hierarchy
- keyboard navigation
- visible focus states
- image alt text architecture
- appropriate labels
- sufficient contrast
- skip-to-content link
- reduced-motion compatibility
- accessible dialogs/modals

Even though animation is not yet being implemented, include:

```css
@media (prefers-reduced-motion: reduce)
```

in the design system so future animation work respects it.

---

# 31. Performance

This is a static academic site and should be fast.

Prioritize:

- minimal JavaScript
- responsive images
- WebP/AVIF where reasonable
- lazy loading below-the-fold imagery
- correct image dimensions
- no huge libraries for trivial features
- no unnecessary client hydration

Use Astro islands only where actual interactivity is necessary.

Likely interactive islands include:

- mobile navigation
- person modals
- project filters
- publication BibTeX interaction

Do not hydrate entire pages.

---

# 32. SEO / Metadata

Although this is a polished MVP, establish basic metadata infrastructure.

Support:

- page title
- description
- canonical URL
- OpenGraph metadata
- favicon
- social image placeholder

Use a reusable layout/head component.

Example title convention:

```text
Team | CFAL
Projects | CFAL
Computational Fluids and Aerodynamics Laboratory | ERAU
```

---

# 33. GitHub Pages Deployment

Configure Astro for GitHub Pages.

Create a GitHub Actions workflow similar to:

```text
.github/workflows/deploy.yml
```

The site should automatically:

1. install dependencies
2. build Astro
3. upload static output
4. deploy to GitHub Pages

Make deployment compatible with both:

```text
username.github.io
```

and a repository subpath such as:

```text
username.github.io/cfal/
```

Document where the Astro `site` and `base` settings need to be configured.

Do not hard-code assumptions that make one deployment type impossible.

---

# 34. Documentation

Create a useful `README.md`.

It should explain:

### Installation

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

### Adding a person

Explain exactly what file to modify.

### Adding a project

Explain how to add a Markdown project.

### Adding a publication

Explain the publication data schema.

### Adding news

Explain how to create a news entry.

### Replacing the hero media

Explicitly document how I can later replace the hero placeholder with:

- CFD image
- MP4/WebM video
- custom animation
- WebGL/canvas visualization

### Deployment

Explain GitHub Pages setup.

---

# 35. Placeholder Content Rules

This is extremely important.

The only person explicitly confirmed by this specification is:

**Dr. Michael Kinzel — Principal Investigator**

Do **not** hallucinate:

- students
- degrees
- emails
- publications
- sponsors
- research contracts
- research achievements
- awards
- universities
- project titles
- biographies
- Scholar profiles

Instead use obviously fictitious development placeholders such as:

```text
PhD Researcher Placeholder
MS Researcher Placeholder
Undergraduate Researcher Placeholder
```

or sample data clearly labeled:

```text
DEMO CONTENT — REPLACE
```

The visual design can be complete even when factual content is not.

---

# 36. Future Content Compatibility

Assume that later I will provide:

- actual research projects
- student roster
- portraits
- CFD animations
- publications
- sponsors
- news
- external profile links

The website architecture must allow these to be added without significant component rewrites.

This is more important than filling the MVP with fake content.

---

# 37. Infrastructure for Future Hero Animation

Create a deliberate media layering system.

Conceptually:

```text
Hero
├── media layer
├── dark/readability overlay
├── optional technical overlay
└── content layer
```

The media layer should later be replaceable by:

```html
<img>
```

```html
<video>
```

or:

```html
<canvas>
```

without changing hero typography/layout.

Do not implement WebGL now.

---

# 38. Team Page Visual Hierarchy

Do not make every researcher section appear equally important.

Suggested hierarchy:

### Principal Investigator

Large featured card.

### Postdoctoral Researchers

Standard researcher grid.

### PhD Researchers

Standard researcher grid.

### MS Researchers

Standard researcher grid.

### Undergraduate Researchers

Standard researcher grid.

Use identical student card dimensions where practical.

Portrait aspect ratio should be standardized so incoming photos don't destroy the grid.

For example:

```css
aspect-ratio: 4 / 5;
object-fit: cover;
```

---

# 39. Projects Page Visual Hierarchy

The project card should emphasize imagery.

Suggested card structure:

```text
┌─────────────────────────────┐
│                             │
│     RESEARCH IMAGE          │
│                             │
├─────────────────────────────┤
│ ROTORCRAFT                  │
│ Project Title               │
│ Short project description   │
│                             │
│ Explore Project →           │
└─────────────────────────────┘
```

Keep the aesthetic serious and editorial rather than dashboard-like.

---

# 40. Publication Design

Publications should resemble an academic bibliography rather than a generic card grid.

Something closer to:

```text
2026

Publication title
A. Author, B. Author, M. Kinzel
Journal / Conference

[DOI] [BibTeX] [Google Scholar]
────────────────────────────────────
```

Use cards only if very restrained.

---

# 41. Footer

Create a substantial but clean footer containing space for:

- CFAL
- Computational Fluids and Aerodynamics Laboratory
- Department of Aerospace Engineering
- Embry-Riddle Aeronautical University
- navigation
- contact
- Google Scholar
- relevant university links
- copyright

Do not invent specific contact details.

---

# 42. Polished MVP Scope

The goal for this iteration is:

### Fully implement

- responsive design system
- header/navigation
- footer
- Home
- Research
- Projects
- project detail template
- Team
- profile modals
- Publications
- News infrastructure
- Join Us
- Contact
- content/data architecture
- GitHub Pages deployment
- accessibility infrastructure
- basic SEO
- documentation

### Do not prioritize

- fancy animations
- custom WebGL
- CFD animations
- elaborate page transitions
- backend functionality
- CMS integration
- search
- authentication

---

# 43. Acceptance Criteria

Before declaring the implementation complete, verify:

- `npm install` succeeds
- `npm run build` succeeds
- all routes build statically
- internal links work
- project dynamic routes work
- no page has horizontal overflow
- mobile menu works
- person cards open correct modals
- Escape closes modals
- focus returns correctly after closing
- keyboard navigation works
- publication BibTeX controls work
- filters work
- missing optional frontmatter doesn't break pages
- placeholder images fail gracefully
- site works with JavaScript disabled except features genuinely requiring JS
- GitHub Pages workflow is valid
- base-path deployment doesn't break asset paths

Also inspect the site visually at mobile, tablet, laptop, and desktop widths.

---

# 44. Code Quality

Before finishing:

- remove dead code
- remove unused dependencies
- remove console debugging
- avoid duplicated styles
- use consistent naming
- organize CSS tokens
- ensure data schemas are documented
- make components small enough to understand
- comment only where comments provide useful architectural context

Do not overengineer the project.

---

# 45. Final Deliverables

When implementation is complete, provide me with:

1. a concise summary of the architecture
2. complete file tree
3. pages implemented
4. reusable components implemented
5. content/data schemas
6. instructions for adding researchers
7. instructions for adding projects
8. instructions for adding publications
9. location where I should place the official CFAL branding asset
10. location where future CFD hero animations should be integrated
11. GitHub Pages deployment instructions
12. any placeholder content that still needs replacement
13. results of the production build/test

Do not merely describe what should be built.

**Implement it.**
"""

path = "/mnt/data/CFAL_Research_Lab_Website_Claude_Prompt.md"
with open(path, "w", encoding="utf-8") as f:
    f.write(prompt)

print(path)
