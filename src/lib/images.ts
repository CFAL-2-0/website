import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { url } from './url';

/**
 * Content refers to images by string so editors never write imports:
 *   "projects/rotor.webp"      → src/assets/images/projects/rotor.webp (optimised: AVIF/WebP + srcset)
 *   "/images/team/jane.webp"   → public/images/team/jane.webp (served as-is)
 *   "https://…"                → remote URL (served as-is)
 * A relative path that doesn't exist resolves to `undefined`, and components
 * fall back to a styled placeholder instead of breaking the build.
 */
const assets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,tiff}',
);

export type ResolvedImage =
  | { kind: 'asset'; image: ImageMetadata }
  | { kind: 'url'; src: string };

export async function resolveImage(path?: string | null): Promise<ResolvedImage | undefined> {
  const value = path?.trim();
  if (!value) return undefined;
  if (/^(?:https?:)?\/\//i.test(value) || value.startsWith('/')) {
    return { kind: 'url', src: url(value) };
  }
  const key = `/src/assets/images/${value.replace(/^\.?\/*/, '')}`;
  const load = assets[key];
  if (!load) return undefined;
  return { kind: 'asset', image: (await load()).default };
}

/**
 * Plain URL for an image reference (video posters, social cards). Assets are
 * resized/re-encoded; /public paths and remote URLs pass through.
 */
export async function imageUrl(
  path?: string | null,
  options: { width?: number; format?: 'jpg' | 'webp' } = {},
): Promise<string | undefined> {
  const resolved = await resolveImage(path);
  if (!resolved) return undefined;
  if (resolved.kind === 'url') return resolved.src;
  const { width = 1600, format = 'webp' } = options;
  const result = await getImage({
    src: resolved.image,
    width: Math.min(width, resolved.image.width),
    format,
  });
  return result.src;
}
