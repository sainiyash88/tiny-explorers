import type { TracingLevel } from './chapter1';

// Numbers 0–9, all designed for a 300×300 viewBox
const VB = { width: 300, height: 300 };

const LEVELS: TracingLevel[] = [
  {
    id: 1,
    title: 'Number 0',
    instruction: 'Trace the number 0!',
    path: 'M 150 40 A 100 110 0 1 1 149.9 40',
    viewBox: VB,
    startPoint: { x: 150, y: 40 },
    closed: true,
  },
  {
    id: 2,
    title: 'Number 1',
    instruction: 'Trace the number 1!',
    path: 'M 110 85 L 150 40 L 150 260',
    viewBox: VB,
    startPoint: { x: 110, y: 85 },
  },
  {
    id: 3,
    title: 'Number 2',
    instruction: 'Trace the number 2!',
    path: 'M 80 100 Q 80 40 150 40 Q 222 40 222 105 Q 222 170 80 240 L 222 240',
    viewBox: VB,
    startPoint: { x: 80, y: 100 },
  },
  {
    id: 4,
    title: 'Number 3',
    instruction: 'Trace the number 3!',
    path: 'M 80 75 Q 80 40 150 40 Q 222 40 222 105 Q 222 155 148 155 Q 222 155 222 210 Q 222 262 148 262 Q 80 262 78 228',
    viewBox: VB,
    startPoint: { x: 80, y: 75 },
  },
  {
    id: 5,
    title: 'Number 4',
    instruction: 'Trace the number 4!',
    viewBox: VB,
    strokes: [
      { path: 'M 100 40 L 100 165 L 215 165', startPoint: { x: 100, y: 40 } },
      { path: 'M 190 40 L 190 260',           startPoint: { x: 190, y: 40 } },
    ],
  },
  {
    id: 6,
    title: 'Number 5',
    instruction: 'Trace the number 5!',
    path: 'M 225 50 L 80 50 L 75 155 Q 115 125 160 130 Q 235 138 235 198 Q 235 268 148 268 Q 75 268 65 218',
    viewBox: VB,
    startPoint: { x: 225, y: 50 },
  },
  {
    id: 7,
    title: 'Number 6',
    instruction: 'Trace the number 6!',
    path: 'M 210 65 Q 110 20 65 145 Q 40 255 155 268 Q 240 268 240 195 Q 240 125 155 125 Q 75 125 72 198',
    viewBox: VB,
    startPoint: { x: 210, y: 65 },
  },
  {
    id: 8,
    title: 'Number 7',
    instruction: 'Trace the number 7!',
    path: 'M 65 50 L 235 50 L 105 260',
    viewBox: VB,
    startPoint: { x: 65, y: 50 },
  },
  {
    id: 9,
    title: 'Number 8',
    instruction: 'Trace the number 8!',
    path: 'M 150 155 Q 230 155 230 100 Q 230 40 150 40 Q 70 40 70 100 Q 70 155 150 155 Q 230 155 230 212 Q 230 265 150 265 Q 70 265 70 212 Q 70 155 150 155',
    viewBox: VB,
    startPoint: { x: 150, y: 155 },
    closed: true,
  },
  {
    id: 10,
    title: 'Number 9',
    instruction: 'Trace the number 9!',
    path: 'M 238 118 Q 238 40 150 40 Q 62 40 62 118 Q 62 192 150 192 Q 238 192 238 122 L 238 265',
    viewBox: VB,
    startPoint: { x: 238, y: 118 },
  },
];

export default LEVELS;
