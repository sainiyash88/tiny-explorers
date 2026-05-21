export interface StrokeSegment {
  path: string;
  startPoint: { x: number; y: number };
}

export interface TracingLevel {
  id: number;
  title: string;
  instruction: string;
  /** SVG path string — single-stroke levels */
  path?: string;
  /** Viewbox dimensions the path was designed for */
  viewBox: { width: number; height: number };
  /** Start indicator position — single-stroke levels */
  startPoint?: { x: number; y: number };
  /** True if the path loops back to the start (circle, square, triangle) */
  closed?: boolean;
  /** Decorative elements rendered on canvas (eyes, nose, etc.) — not part of tracing */
  decorations?: Array<{ type: 'circle'; cx: number; cy: number; r: number }>;
  /** Multi-stroke levels: each element is one pen-down stroke in order */
  strokes?: StrokeSegment[];
}

// All paths designed for a 300×300 viewBox
const VB = { width: 300, height: 300 };

const LEVELS: TracingLevel[] = [
  {
    id: 1,
    title: 'Straight Line',
    instruction: 'Draw a straight line from left to right!',
    path: 'M 30 150 L 270 150',
    viewBox: VB,
    startPoint: { x: 30, y: 150 },
  },
  {
    id: 2,
    title: 'Vertical Line',
    instruction: 'Draw a line from top to bottom!',
    path: 'M 150 30 L 150 270',
    viewBox: VB,
    startPoint: { x: 150, y: 30 },
  },
  {
    id: 3,
    title: 'Diagonal Line',
    instruction: 'Draw a line from corner to corner!',
    path: 'M 40 40 L 260 260',
    viewBox: VB,
    startPoint: { x: 40, y: 40 },
  },
  {
    id: 4,
    title: 'Gentle Curve',
    instruction: 'Follow the curvy path!',
    path: 'M 30 200 Q 150 50 270 200',
    viewBox: VB,
    startPoint: { x: 30, y: 200 },
  },
  {
    id: 5,
    title: 'S Curve',
    instruction: 'Trace the S shape!',
    path: 'M 150 30 C 240 30 60 150 150 150 C 240 150 60 270 150 270',
    viewBox: VB,
    startPoint: { x: 150, y: 30 },
  },
  {
    id: 6,
    title: 'Circle',
    instruction: 'Go all the way around the circle!',
    path: 'M 150 50 A 100 100 0 1 1 149.9 50',
    viewBox: VB,
    startPoint: { x: 150, y: 50 },
    closed: true,
  },
  {
    id: 7,
    title: 'Square',
    instruction: 'Trace around the square!',
    path: 'M 60 60 L 240 60 L 240 240 L 60 240 Z',
    viewBox: VB,
    startPoint: { x: 60, y: 60 },
    closed: true,
  },
  {
    id: 8,
    title: 'Triangle',
    instruction: 'Trace the triangle!',
    path: 'M 150 40 L 270 250 L 30 250 Z',
    viewBox: VB,
    startPoint: { x: 150, y: 40 },
    closed: true,
  },
  {
    id: 9,
    title: 'Rectangle',
    instruction: 'Trace around the rectangle!',
    path: 'M 40 90 L 260 90 L 260 210 L 40 210 Z',
    viewBox: VB,
    startPoint: { x: 40, y: 90 },
    closed: true,
  },
  {
    id: 10,
    title: 'Star',
    instruction: 'Trace the star!',
    path: 'M 150 30 L 178 112 L 265 112 L 194 163 L 220 245 L 150 196 L 80 245 L 106 163 L 35 112 L 122 112 Z',
    viewBox: VB,
    startPoint: { x: 150, y: 30 },
    closed: true,
  },
  {
    id: 11,
    title: 'Zig Zag',
    instruction: 'Follow the zig zag path!',
    path: 'M 20 200 L 75 100 L 130 200 L 185 100 L 240 200 L 280 100',
    viewBox: VB,
    startPoint: { x: 20, y: 200 },
  },
  {
    id: 12,
    title: 'Diamond',
    instruction: 'Trace around the diamond!',
    path: 'M 150 25 L 250 150 L 150 275 L 50 150 Z',
    viewBox: VB,
    startPoint: { x: 150, y: 25 },
    closed: true,
  },
];

export default LEVELS;
