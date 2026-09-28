/**
 * Site-wide configuration: identity, navigation, contact details and the
 * homepage hero media. Most day-to-day content lives in `src/data/` and
 * `src/content/`; this file holds the handful of global settings.
 *
 * Empty strings mean "not supplied yet" — components render a visible
 * placeholder (or omit the item) instead of guessing.
 */
import type { HeroMediaConfig } from './lib/hero';

interface SiteConfig {
  name: string;
  shortName: string;
  department: string;
  university: string;
  universityShort: string;
  description: string;
  principalInvestigator: string;
  mission: { text: string; placeholder: boolean };
  contact: {
    email: string;
    phone: string;
    building: string;
    room: string;
    campus: string;
    addressLines: string[];
    mapUrl: string;
  };
  links: {
    university: string;
    universityResearch: string;
    department: string;
    labGoogleScholar: string;
  };
  socialImage: string;
  branding: {
    banner: string;
    bannerWidth: number;
    bannerHeight: number;
    mark: string;
    markWidth: number;
    markHeight: number;
  };
}

export const site: SiteConfig = {
  name: 'Computational Fluids and Aerodynamics Laboratory',
  shortName: 'CFAL',
  department: 'Department of Aerospace Engineering',
  university: 'Embry-Riddle Aeronautical University',
  universityShort: 'ERAU',
  description:
    'The Computational Fluids and Aerodynamics Laboratory (CFAL) in the Department of Aerospace Engineering at Embry-Riddle Aeronautical University.',

  /** `slug` of the principal investigator in src/data/people.yaml */
  principalInvestigator: 'michael-kinzel',

  /**
   * Homepage mission statement. DEMO CONTENT — REPLACE with approved text,
   * then set `placeholder: false`.
   */
  mission: {
    text: 'Sample mission statement: a short description of the laboratory’s purpose, research focus and approach will appear here once approved lab text is supplied.',
    placeholder: true,
  },

  /** Contact details — intentionally blank until confirmed. */
  contact: {
    email: '',
    phone: '',
    building: '',
    room: '',
    campus: '',
    addressLines: [],
    mapUrl: '',
  },

  /** External links. Blank values render as "to be added". */
  links: {
    university: 'https://erau.edu/',
    universityResearch: 'https://erau.edu/research-and-innovation',
    department: '',
    labGoogleScholar: '',
  },

  /** Default social-sharing image (in /public). */
  socialImage: '/images/og/cfal-default.png',

  /** Official banner supplied by the lab (in /public). */
  branding: {
    banner: '/images/branding/cfal-aerospace-header.png',
    bannerWidth: 696,
    bannerHeight: 84,
    mark: '/images/branding/cfal-mark.png',
    markWidth: 184,
    markHeight: 84,
  },
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Team', href: '/team/' },
  { label: 'Publications', href: '/publications/' },
  { label: 'News', href: '/news/' },
  { label: 'Join Us', href: '/join/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/**
 * Homepage hero media. Change `type` to swap the background layer without
 * touching the hero layout:
 *   { type: 'image',  src: 'hero/my-render.webp', alt: '' }
 *   { type: 'video',  sources: [{ src: '/media/hero/flow.webm', type: 'video/webm' },
 *                               { src: '/media/hero/flow.mp4',  type: 'video/mp4' }],
 *                     poster: 'hero/my-render.webp' }
 *   { type: 'canvas', poster: 'hero/my-render.webp' }   // see src/scripts/hero-visualization.ts
 *   { type: 'none' }                                      // navy + technical overlay only
 * Image paths are relative to src/assets/images/ (optimised at build time);
 * paths beginning with "/" are served as-is from /public.
 */
export const homeHero: HeroMediaConfig = {
  type: 'image',
  src: 'hero/hero-placeholder.webp',
  alt: '',
  position: '68% 50%',
  caption:
    'Placeholder visualization — analytic potential flow about a Joukowski airfoil. Replace with CFAL simulation imagery.',
};
