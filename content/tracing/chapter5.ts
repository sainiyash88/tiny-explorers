import type { TracingLevel } from './chapter1';

// Animal outlines, all designed for a 300×300 viewBox
const VB = { width: 300, height: 300 };

const LEVELS: TracingLevel[] = [
  {
    id: 1,
    title: 'Cat',
    instruction: 'Trace the cat!',
    path: 'M 75 195 L 75 118 L 95 55 L 128 100 L 150 88 L 172 100 L 205 55 L 225 118 L 225 195 Q 198 258 150 258 Q 102 258 75 195',
    viewBox: VB,
    startPoint: { x: 75, y: 195 },
    closed: true,
    decorations: [
      { type: 'circle', cx: 118, cy: 148, r: 8 },
      { type: 'circle', cx: 182, cy: 148, r: 8 },
      { type: 'circle', cx: 150, cy: 175, r: 6 },
    ],
  },
  {
    id: 2,
    title: 'Fish',
    instruction: 'Trace the fish!',
    path: 'M 265 105 L 235 150 L 265 195 L 235 150 Q 215 220 128 220 Q 38 220 38 150 Q 38 80 128 80 Q 215 80 235 150',
    viewBox: VB,
    startPoint: { x: 265, y: 105 },
    closed: true,
    decorations: [
      { type: 'circle', cx: 88, cy: 138, r: 8 },
    ],
  },
  {
    id: 3,
    title: 'Rabbit',
    instruction: 'Trace the rabbit!',
    path: 'M 105 105 L 90 30 Q 100 20 118 28 L 125 105 Q 135 82 150 80 Q 165 82 175 105 L 182 28 Q 200 20 210 30 L 195 105 Q 232 118 232 162 Q 232 245 150 245 Q 68 245 68 162 Q 68 118 105 105',
    viewBox: VB,
    startPoint: { x: 105, y: 105 },
    closed: true,
    decorations: [
      { type: 'circle', cx: 128, cy: 148, r: 8 },
      { type: 'circle', cx: 172, cy: 148, r: 8 },
      { type: 'circle', cx: 150, cy: 170, r: 5 },
    ],
  },
  {
    id: 4,
    title: 'Turtle',
    instruction: 'Trace the turtle!',
    path: 'M 150 32 Q 170 22 188 36 Q 246 50 268 100 L 285 82 L 290 108 L 272 120 Q 280 158 274 198 Q 262 242 230 262 L 246 280 L 220 274 L 208 260 Q 182 272 150 274 Q 118 272 92 260 L 80 274 L 54 280 L 70 262 Q 38 242 26 198 Q 20 158 28 120 L 10 108 L 15 82 L 32 100 Q 54 50 112 36 Q 130 22 150 32',
    viewBox: VB,
    startPoint: { x: 150, y: 32 },
    closed: true,
    decorations: [
      { type: 'circle', cx: 168, cy: 52, r: 6 },
    ],
  },
  {
    id: 5,
    title: 'Butterfly',
    instruction: 'Trace the butterfly!',
    path: 'M 150 128 Q 105 55 55 75 Q 22 95 35 138 Q 48 182 150 172 Q 102 198 85 232 Q 68 258 98 265 Q 128 270 150 235 Q 172 270 202 265 Q 232 258 215 232 Q 198 198 150 172 Q 252 182 265 138 Q 278 95 245 75 Q 195 55 150 128',
    viewBox: VB,
    startPoint: { x: 150, y: 128 },
    closed: true,
  },
  {
    id: 6,
    title: 'Bear',
    instruction: 'Trace the bear!',
    path: 'M 150 17 Q 167 9 182 17 Q 198 7 212 23 Q 220 39 208 53 Q 198 63 188 59 Q 208 75 220 97 Q 230 123 224 147 Q 238 163 255 183 Q 272 205 266 231 Q 260 253 240 261 Q 224 269 210 259 Q 198 253 196 241 Q 182 259 180 271 Q 178 283 162 285 Q 150 287 138 285 Q 122 283 120 271 Q 118 259 104 241 Q 102 253 90 259 Q 76 269 60 261 Q 40 253 34 231 Q 28 205 45 183 Q 62 163 76 147 Q 70 123 80 97 Q 92 75 112 59 Q 102 63 92 53 Q 80 39 88 23 Q 102 7 118 17 Q 133 9 150 17',
    viewBox: VB,
    startPoint: { x: 150, y: 17 },
    closed: true,
    decorations: [
      { type: 'circle', cx: 128, cy: 81, r: 8 },
      { type: 'circle', cx: 172, cy: 81, r: 8 },
      { type: 'circle', cx: 150, cy: 105, r: 11 },
    ],
  },
  {
    id: 7,
    title: 'Snail',
    instruction: 'Trace the snail!',
    path: 'M 130 148 Q 158 148 158 122 Q 158 95 130 95 Q 98 95 92 125 Q 85 162 110 185 Q 138 210 178 202 Q 222 188 225 148 Q 228 95 190 65 Q 148 32 100 45 Q 42 62 35 122 Q 28 185 68 228 Q 108 268 165 268 L 265 268',
    viewBox: VB,
    startPoint: { x: 130, y: 148 },
  },
  {
    id: 8,
    title: 'Mouse',
    instruction: 'Trace the mouse!',
    path: 'M 218 110 Q 208 95 195 88 Q 182 80 172 75 Q 165 55 155 42 Q 148 30 132 28 Q 115 22 102 32 Q 88 42 92 58 Q 98 72 112 80 Q 95 82 80 98 Q 62 118 58 148 Q 52 180 60 210 Q 68 235 90 250 Q 102 260 98 272 Q 90 282 75 285 Q 58 290 45 280 Q 30 268 38 252 Q 48 238 65 238 Q 85 242 108 248 Q 132 255 158 250 Q 185 245 205 230 Q 228 215 230 192 Q 232 168 225 145 Q 222 128 218 110',
    viewBox: VB,
    startPoint: { x: 218, y: 110 },
    closed: true,
    decorations: [
      { type: 'circle', cx: 178, cy: 90, r: 8 },
      { type: 'circle', cx: 220, cy: 115, r: 5 },
    ],
  },
  {
    id: 9,
    title: 'Snake',
    instruction: 'Trace the snake!',
    path: 'M 68 28 Q 55 45 62 70 Q 70 92 98 102 Q 128 112 158 100 Q 188 88 212 108 Q 238 128 238 158 Q 238 188 218 210 Q 198 232 172 240 Q 145 248 118 240 Q 90 232 78 210 Q 68 188 80 165 Q 92 142 118 132 Q 145 122 168 132 Q 192 142 205 165 Q 218 188 215 212 Q 212 238 225 258 Q 235 272 252 278',
    viewBox: VB,
    startPoint: { x: 68, y: 28 },
    decorations: [
      { type: 'circle', cx: 72, cy: 42, r: 7 },
    ],
  },
];

export default LEVELS;
