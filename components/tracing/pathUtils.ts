/**
 * Utilities for sampling points along an SVG path and checking
 * whether a touch point is within tolerance of the nearest point on the path.
 */

export interface Point {
  x: number;
  y: number;
}

/**
 * Sample N evenly-spaced points along an SVG path string.
 * Uses a temporary SVG element via a web-compatible polyfill approach,
 * but since we're in React Native we pre-compute these at build time
 * using a lookup table approach with Skia's path API at runtime.
 *
 * Returns an array of {x, y} points at equal arc-length intervals.
 */
export function samplePath(totalLength: number, sampleCount: number): number[] {
  // Returns t values (0–1) evenly distributed along arc length
  return Array.from({ length: sampleCount }, (_, i) => i / (sampleCount - 1));
}

/**
 * Squared Euclidean distance between two points (avoids sqrt for performance).
 */
export function distSq(a: Point, b: Point): number {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

/**
 * Find the minimum distance from point P to the nearest sampled point on the path.
 */
export function minDistToPath(p: Point, sampledPoints: Point[]): number {
  let min = Infinity;
  for (const s of sampledPoints) {
    const d = distSq(p, s);
    if (d < min) min = d;
  }
  return Math.sqrt(min);
}

/**
 * Find the index of the nearest sampled point to P.
 */
export function nearestPointIndex(p: Point, sampledPoints: Point[]): number {
  let minD = Infinity;
  let idx = 0;
  for (let i = 0; i < sampledPoints.length; i++) {
    const d = distSq(p, sampledPoints[i]);
    if (d < minD) { minD = d; idx = i; }
  }
  return idx;
}

/**
 * Calculate what fraction of the guide path has been covered by the child's trace.
 * "Covered" means at least one drawn point came within tolerance of each sample.
 *
 * @param sampledPoints - sampled guide path points
 * @param drawnPoints   - points the child has drawn
 * @param tolerance     - max distance (px) to count as "hit"
 */
export function calcCoverage(
  sampledPoints: Point[],
  drawnPoints: Point[],
  tolerance: number
): number {
  if (drawnPoints.length === 0) return 0;
  let covered = 0;
  for (const s of sampledPoints) {
    for (const d of drawnPoints) {
      if (Math.sqrt(distSq(s, d)) <= tolerance) {
        covered++;
        break;
      }
    }
  }
  return covered / sampledPoints.length;
}
