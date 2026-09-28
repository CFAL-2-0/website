/**
 * Integration point for a future canvas / WebGL hero visualization.
 *
 * Enabled by setting `homeHero.type = 'canvas'` in src/site.config.ts.
 * The canvas fills the hero's media layer, sits above the optional poster
 * image and below the readability overlay, so hero typography is unaffected.
 *
 * Contract:
 * - Draw into `canvas`; this helper keeps its backing store sized to the
 *   element's CSS box × devicePixelRatio.
 * - When `reducedMotion` is true, render a single still frame (or nothing —
 *   the poster image remains visible underneath).
 * - Return a cleanup function that cancels animation frames / listeners.
 *
 * Nothing is drawn yet: until a visualization is implemented the poster image
 * shows through the transparent canvas.
 */
export interface HeroVisualizationOptions {
  reducedMotion: boolean;
}

export function mountHeroVisualization(
  canvas: HTMLCanvasElement,
  _options: HeroVisualizationOptions,
): () => void {
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  // Implement rendering here (e.g. obtain canvas.getContext('webgl2') and
  // start a requestAnimationFrame loop), respecting `_options.reducedMotion`.

  return () => observer.disconnect();
}
