/**
 * Base-path aware URLs. Every internal link and /public asset goes through
 * `url()` so the site works at both username.github.io/ and
 * username.github.io/<repo>/ without code changes.
 */
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const ABSOLUTE = /^(?:[a-z][a-z\d+\-.]*:|\/\/|#)/i;

export function isExternal(href: string): boolean {
  return /^(?:https?:)?\/\//i.test(href);
}

export function url(path = '/'): string {
  if (ABSOLUTE.test(path)) return path;
  // Idempotent: values that already carry the base path are left untouched.
  if (base !== '/' && (path.startsWith(base) || `${path}/` === base)) return path;
  return base + path.replace(/^\/+/, '');
}

/** Strip the base path so routes can be compared independent of deployment. */
export function stripBase(pathname: string): string {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return withSlash.startsWith(base) ? `/${withSlash.slice(base.length)}` : withSlash;
}

export function isCurrentSection(pathname: string, href: string): boolean {
  const current = stripBase(pathname);
  if (href === '/') return current === '/';
  return current.startsWith(href);
}
