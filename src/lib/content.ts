/**
 * Collection queries shared by pages: sorting, relationships and hrefs live
 * here so templates stay declarative.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { PERSON_ROLES, ROLE_INFO, type PersonRole } from './taxonomy';
import { url } from './url';

export type Person = CollectionEntry<'people'>;
export type Project = CollectionEntry<'projects'>;
export type Publication = CollectionEntry<'publications'>;
export type ResearchArea = CollectionEntry<'researchAreas'>;
export type NewsPost = CollectionEntry<'news'>;
export type Opportunity = CollectionEntry<'opportunities'>;

const byOrderThenTitle = <T extends { data: { order: number; title: string } }>(a: T, b: T) =>
  a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

/* ---------------------------------------------------------------- people */

export async function getPeople(): Promise<Person[]> {
  const people = await getCollection('people');
  return people.sort(
    (a, b) =>
      PERSON_ROLES.indexOf(a.data.role) - PERSON_ROLES.indexOf(b.data.role) ||
      a.data.order - b.data.order ||
      a.data.name.localeCompare(b.data.name),
  );
}

/** People grouped by role, in team-page order, omitting empty roles. */
export async function getPeopleByRole(): Promise<{ role: PersonRole; people: Person[] }[]> {
  const people = await getPeople();
  return PERSON_ROLES.map((role) => ({
    role,
    people: people.filter((person) => person.data.role === role),
  })).filter((group) => group.people.length > 0);
}

export function displayName(person: Person): string {
  return [person.data.honorific, person.data.name].filter(Boolean).join(' ');
}

export function personStatus(person: Person): string {
  return person.data.degreeStatus || ROLE_INFO[person.data.role].status;
}

export function personHref(person: Person | string): string {
  return url(`/team/#${typeof person === 'string' ? person : person.id}`);
}

/* -------------------------------------------------------- research areas */

export async function getResearchAreas(): Promise<ResearchArea[]> {
  return (await getCollection('researchAreas')).sort(byOrderThenTitle);
}

export function researchAreaHref(area: ResearchArea | string): string {
  return url(`/research/#${typeof area === 'string' ? area : area.id}`);
}

/* -------------------------------------------------------------- projects */

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort(
    (a, b) =>
      Number(a.data.status === 'completed') - Number(b.data.status === 'completed') ||
      byOrderThenTitle(a, b),
  );
}

export function projectHref(project: Project | string): string {
  return url(`/projects/${typeof project === 'string' ? project : project.id}/`);
}

export function projectsInArea(projects: Project[], areaId: string): Project[] {
  return projects.filter((project) => project.data.researchArea?.id === areaId);
}

/* ---------------------------------------------------------- publications */

export async function getPublications(): Promise<Publication[]> {
  const publications = await getCollection('publications');
  return publications.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      (b.data.month ?? 0) - (a.data.month ?? 0) ||
      a.data.title.localeCompare(b.data.title),
  );
}

/** Newest-first groups keyed by year. */
export function groupByYear(publications: Publication[]): { year: number; items: Publication[] }[] {
  const groups = new Map<number, Publication[]>();
  for (const publication of publications) {
    const list = groups.get(publication.data.year) ?? [];
    list.push(publication);
    groups.set(publication.data.year, list);
  }
  return [...groups].map(([year, items]) => ({ year, items }));
}

export function doiUrl(doi: string): string {
  return `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`;
}

/** Explicit Scholar link, or a title search as a fallback. */
export function scholarUrl(publication: Publication): string {
  return (
    publication.data.googleScholar ??
    `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${publication.data.title}"`)}`
  );
}

/* ------------------------------------------------------------------ news */

export async function getNews(): Promise<NewsPost[]> {
  const posts = await getCollection('news', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function newsHref(post: NewsPost | string): string {
  return url(`/news/${typeof post === 'string' ? post : post.id}/`);
}

/* --------------------------------------------------------- opportunities */

export async function getOpportunities(): Promise<Opportunity[]> {
  return (await getCollection('opportunities')).sort(byOrderThenTitle);
}
