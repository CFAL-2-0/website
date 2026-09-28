/**
 * Hero media layer configuration. The hero renders one of these in its
 * absolutely-positioned media layer; typography/layout never change.
 */
interface HeroMediaBase {
  /** CSS object-position for cropping, e.g. "70% 50%". */
  position?: string;
  /** Optional credit/caption rendered in the technical overlay. */
  caption?: string;
}

export interface HeroImageMedia extends HeroMediaBase {
  type: 'image';
  /** Relative to src/assets/images/, or an absolute /public or https URL. */
  src: string;
  /** Leave empty for purely decorative imagery. */
  alt?: string;
}

export interface HeroVideoMedia extends HeroMediaBase {
  type: 'video';
  /** Video files live in /public (e.g. /media/hero/flow.mp4). */
  sources: { src: string; type: string }[];
  /** Still frame shown before playback and to reduced-motion users. */
  poster?: string;
}

export interface HeroCanvasMedia extends HeroMediaBase {
  type: 'canvas';
  /** Still frame shown until (and if) the visualization mounts. */
  poster?: string;
}

export interface HeroNoMedia extends HeroMediaBase {
  type: 'none';
}

export type HeroMediaConfig = HeroImageMedia | HeroVideoMedia | HeroCanvasMedia | HeroNoMedia;
