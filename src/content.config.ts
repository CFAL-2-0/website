/**
 * Content collections and their schemas. Every page is generated from these,
 * so adding a person, project, publication or news item is a data edit only.
 * Field-by-field documentation lives in README.md ("Content & data schemas").
 *
 *   people         src/data/people.yaml          (structured YAML)
 *   researchAreas  src/data/researchAreas.yaml   (structured YAML)
 *   publications   src/data/publications.yaml    (structured YAML)
 *   opportunities  src/data/opportunities.yaml   (Join Us page)
 *   projects       src/content/projects/*.md     (Markdown + frontmatter)
 *   news           src/content/news/*.md         (Markdown + frontmatter)
 *
 * `reference()` fields are validated at build time: a typo in a slug fails
 * the build with a clear message instead of silently dropping a link.
 */
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  NEWS_CATEGORIES,
  PERSON_ROLES,
  PROJECT_STATUSES,
  PUBLICATION_TYPES,
} from './lib/taxonomy';

/** Optional URL that also accepts "" (treated as not supplied). */
const optionalUrl = z
  .union([z.url(), z.literal('')])
  .optional()
  .transform((value) => value || undefined);

const optionalEmail = z
  .union([z.email(), z.literal('')])
  .optional()
  .transform((value) => value || undefined);

/** Human-readable flag rendered as a "Demo content — replace" badge. */
const placeholder = z.boolean().default(false);

const people = defineCollection({
  // Each entry's `slug` becomes its id (used by references and /team/#slug).
  loader: file('src/data/people.yaml'),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    honorific: z.string().optional(),
    role: z.enum(PERSON_ROLES),
    /** Line shown under the name; defaults to the role label. */
    degreeStatus: z.string().optional(),
    /** Secondary title, e.g. academic rank or affiliation. */
    title: z.string().optional(),
    portrait: z.string().optional(),
    portraitAlt: z.string().optional(),
    researchInterests: z.array(z.string()).default([]),
    googleScholar: optionalUrl,
    profileUrl: optionalUrl,
    website: optionalUrl,
    email: optionalEmail,
    bio: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    /** Alumni-only fields */
    graduationYear: z.number().int().optional(),
    currentPosition: z.string().optional(),
    order: z.number().default(100),
    placeholder,
  }),
});

const researchAreas = defineCollection({
  loader: file('src/data/researchAreas.yaml'),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    summary: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    capabilities: z.array(z.string()).default([]),
    order: z.number().default(100),
    /** Show on the homepage research overview. */
    featured: z.boolean().default(false),
    placeholder,
  }),
});

const publications = defineCollection({
  // Each entry's `id` (e.g. its BibTeX key) must be unique.
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    year: z.number().int(),
    month: z.number().int().min(1).max(12).optional(),
    venue: z.string().optional(),
    type: z.enum(PUBLICATION_TYPES).default('other'),
    doi: z.string().optional(),
    url: optionalUrl,
    pdf: optionalUrl,
    googleScholar: optionalUrl,
    bibtex: z.string().optional(),
    featured: z.boolean().default(false),
    projects: z.array(reference('projects')).default([]),
    researchAreas: z.array(reference('researchAreas')).default([]),
    placeholder,
  }),
});

const mediaItem = z.object({
  src: z.string(),
  alt: z.string().default(''),
  caption: z.string().optional(),
});

const projects = defineCollection({
  // File name (or `slug` frontmatter) becomes the URL: /projects/<slug>/
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    status: z.enum(PROJECT_STATUSES).default('current'),
    researchArea: reference('researchAreas').optional(),
    summary: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default(''),
    startYear: z.number().int().optional(),
    endYear: z.number().int().optional(),
    people: z.array(reference('people')).default([]),
    sponsors: z
      .array(z.union([z.string(), z.object({ name: z.string(), url: optionalUrl })]))
      .default([])
      .transform((items) =>
        items.map((item) => (typeof item === 'string' ? { name: item, url: undefined } : item)),
      ),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    collaborators: z
      .array(z.object({ name: z.string(), affiliation: z.string().optional(), url: optionalUrl }))
      .default([]),
    software: z
      .array(z.object({ name: z.string(), description: z.string().optional(), url: optionalUrl }))
      .default([]),
    gallery: z.array(mediaItem).default([]),
    videos: z
      .array(
        z.object({
          title: z.string(),
          /** Self-hosted file in /public (e.g. /media/projects/wake.mp4) … */
          src: z.string().optional(),
          type: z.string().default('video/mp4'),
          poster: z.string().optional(),
          /** … or an embeddable player URL (YouTube/Vimeo "embed" link). */
          embedUrl: optionalUrl,
          caption: z.string().optional(),
        }),
      )
      .default([]),
    relatedProjects: z.array(reference('projects')).default([]),
    placeholder,
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string(),
    category: z.enum(NEWS_CATEGORIES).optional(),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    people: z.array(reference('people')).default([]),
    projects: z.array(reference('projects')).default([]),
    placeholder,
    draft: z.boolean().default(false),
  }),
});

const opportunities = defineCollection({
  loader: file('src/data/opportunities.yaml'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    backgrounds: z.array(z.string()).default([]),
    opportunities: z.array(z.string()).default([]),
    application: z.array(z.string()).default([]),
    funding: z.string().optional(),
    contactLabel: z.string().default('Contact the lab'),
    order: z.number().default(100),
    placeholder,
  }),
});

export const collections = { people, researchAreas, publications, projects, news, opportunities };
