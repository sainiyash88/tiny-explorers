/**
 * Chapter 1 — Fruits      — 2×1 (2 pieces, FREE)  — 15 levels
 * Chapter 2 — Vegetables  — 3×1 (3 pieces, paid)  —  9 levels
 * Chapter 3 — Animals     — 2×2 (4 pieces, paid)  —  9 levels
 * Chapter 4 — Vehicles    — 3×2 (6 pieces, paid)  —  9 levels
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const PUZZLE_DIR  = path.join(__dirname, '../assets/images/puzzles');
const CONTENT_DIR = path.join(__dirname, '../content/puzzles');

// ── Item lists ────────────────────────────────────────────────────────────────

const FRUITS = [
  { name: 'apple',       emoji: '🍎', label: 'Apple' },
  { name: 'avacado',     emoji: '🥑', label: 'Avocado' },
  { name: 'banana',      emoji: '🍌', label: 'Banana' },
  { name: 'dragonfruit', emoji: '🍈', label: 'Dragon Fruit' },
  { name: 'grapes',      emoji: '🍇', label: 'Grapes' },
  { name: 'guava',       emoji: '🍈', label: 'Guava' },
  { name: 'kiwi',        emoji: '🥝', label: 'Kiwi' },
  { name: 'litchi',      emoji: '🍈', label: 'Litchi' },
  { name: 'mango',       emoji: '🥭', label: 'Mango' },
  { name: 'orange',      emoji: '🍊', label: 'Orange' },
  { name: 'papaya',      emoji: '🍈', label: 'Papaya' },
  { name: 'pineapple',   emoji: '🍍', label: 'Pineapple' },
  { name: 'plum',        emoji: '🫐', label: 'Plum' },
  { name: 'strawberry',  emoji: '🍓', label: 'Strawberry' },
  { name: 'watermelon',  emoji: '🍉', label: 'Watermelon' },
];

const VEGETABLES = [
  { name: 'brinjal',     emoji: '🍆', label: 'Brinjal' },
  { name: 'carrot',      emoji: '🥕', label: 'Carrot' },
  { name: 'cauliflower', emoji: '🥦', label: 'Cauliflower' },
  { name: 'green_peas',  emoji: '🫛', label: 'Green Peas' },
  { name: 'lady_finger', emoji: '🌿', label: 'Lady Finger' },
  { name: 'onion',       emoji: '🧅', label: 'Onion' },
  { name: 'potato',      emoji: '🥔', label: 'Potato' },
  { name: 'pumpkin',     emoji: '🎃', label: 'Pumpkin' },
  { name: 'tamato',      emoji: '🍅', label: 'Tomato' },
];

const ANIMALS = [
  { name: 'lion',     emoji: '🦁', label: 'Lion' },
  { name: 'elephant', emoji: '🐘', label: 'Elephant' },
  { name: 'bear',     emoji: '🐻', label: 'Bear' },
  { name: 'horse',    emoji: '🐴', label: 'Horse' },
  { name: 'monkey',   emoji: '🐒', label: 'Monkey' },
  { name: 'cow',      emoji: '🐄', label: 'Cow' },
  { name: 'sheep',    emoji: '🐑', label: 'Sheep' },
  { name: 'camel',    emoji: '🐪', label: 'Camel' },
  { name: 'fish',     emoji: '🐟', label: 'Fish' },
];

const VEHICLES = [
  { name: 'airplane',    emoji: '✈️',  label: 'Airplane' },
  { name: 'ambulance',   emoji: '🚑', label: 'Ambulance' },
  { name: 'bus',         emoji: '🚌', label: 'Bus' },
  { name: 'car',         emoji: '🚗', label: 'Car' },
  { name: 'fire_engine', emoji: '🚒', label: 'Fire Engine' },
  { name: 'police_car',  emoji: '🚔', label: 'Police Car' },
  { name: 'ship',        emoji: '🚢', label: 'Ship' },
  { name: 'train',       emoji: '🚂', label: 'Train' },
  { name: 'truck',       emoji: '🚛', label: 'Truck' },
];

const CHAPTERS = [
  { num: 1, items: FRUITS,      cols: 2, rows: 1 },
  { num: 2, items: VEGETABLES,  cols: 3, rows: 1 },
  { num: 3, items: ANIMALS,     cols: 2, rows: 2 },
  { num: 4, items: VEHICLES,    cols: 3, rows: 2 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function sliceKey(name, cols, rows, i) {
  if (rows === 1) return `${name}-${cols}c-${i}`;   // e.g. apple-2c-0, apple-2c-1
  return `${name}-${cols}x${rows}-${i}`;
}

// ── Clean ─────────────────────────────────────────────────────────────────────

function cleanSlices() {
  let deleted = 0;
  for (const f of fs.readdirSync(PUZZLE_DIR)) {
    if (f === 'index.ts' || !/\.jpg$/.test(f)) continue;
    if (/^[a-z_]+\.jpg$/.test(f)) continue;   // keep source files
    fs.unlinkSync(path.join(PUZZLE_DIR, f));
    deleted++;
  }
  console.log(`Deleted ${deleted} old slice files.`);
}

// ── Split ─────────────────────────────────────────────────────────────────────

async function splitItem(name, cols, rows) {
  const input = path.join(PUZZLE_DIR, `${name}.jpg`);
  if (!fs.existsSync(input)) { console.warn(`  MISSING: ${name}.jpg`); return; }
  const { width, height } = await sharp(input).metadata();
  const sw = Math.floor(width / cols);
  const sh = Math.floor(height / rows);
  let i = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = col * sw, top = row * sh;
      const w = col === cols - 1 ? width - left : sw;
      const h = row === rows - 1 ? height - top : sh;
      await sharp(input).extract({ left, top, width: w, height: h })
        .jpeg({ quality: 95 })
        .toFile(path.join(PUZZLE_DIR, `${sliceKey(name, cols, rows, i)}.jpg`));
      i++;
    }
  }
  process.stdout.write(`  ${name} (${i} slices)\n`);
}

// ── index.ts ──────────────────────────────────────────────────────────────────

function generateIndex() {
  const lines = [
    "import { ImageSourcePropType } from 'react-native';",
    '',
    'const PUZZLE_IMAGES: Record<string, ImageSourcePropType> = {',
  ];
  for (const { items, cols, rows } of CHAPTERS) {
    for (const { name } of items) {
      lines.push(`  '${name}': require('./${name}.jpg'),`);
      for (let i = 0; i < cols * rows; i++) {
        const k = sliceKey(name, cols, rows, i);
        lines.push(`  '${k}': require('./${k}.jpg'),`);
      }
    }
  }
  lines.push('};', '', 'export default PUZZLE_IMAGES;', '');
  return lines.join('\n');
}

// ── Chapter TS ────────────────────────────────────────────────────────────────

const INTERFACES = `export interface PuzzlePieceData {
  id: string;
  imageKey: string;
  col: number;
  row: number;
}

export interface PuzzleLevel {
  id: number;
  title: string;
  animal: string;
  instruction: string;
  cols: number;
  rows: number;
  imageKey: string;
  pieces: PuzzlePieceData[];
}
`;

function generateChapter(num, items, cols, rows) {
  const lines = [];
  if (num === 1) {
    lines.push(INTERFACES);
  } else {
    lines.push(`import type { PuzzleLevel, PuzzlePieceData } from './chapter1';\n`);
  }

  lines.push(`function makePieces(name: string): PuzzlePieceData[] {`);
  lines.push(`  const pieces: PuzzlePieceData[] = [];`);
  if (rows === 1) {
    lines.push(`  for (let col = 0; col < ${cols}; col++) {`);
    lines.push(`    const k = \`\${name}-${cols}c-\${col}\`;`);
    lines.push(`    pieces.push({ id: k, imageKey: k, col, row: 0 });`);
    lines.push(`  }`);
  } else {
    lines.push(`  let i = 0;`);
    lines.push(`  for (let row = 0; row < ${rows}; row++) {`);
    lines.push(`    for (let col = 0; col < ${cols}; col++) {`);
    lines.push(`      const k = \`\${name}-${cols}x${rows}-\${i++}\`;`);
    lines.push(`      pieces.push({ id: k, imageKey: k, col, row });`);
    lines.push(`    }`);
    lines.push(`  }`);
  }
  lines.push(`  return pieces;`, `}`, ``);

  lines.push(`const LEVELS: PuzzleLevel[] = [`);
  items.forEach(({ name, emoji, label }, idx) => {
    lines.push(`  {`);
    lines.push(`    id: ${idx + 1}, title: '${label}', animal: '${emoji}',`);
    lines.push(`    instruction: 'Put the ${label.toLowerCase()} together!',`);
    lines.push(`    cols: ${cols}, rows: ${rows}, imageKey: '${name}',`);
    lines.push(`    pieces: makePieces('${name}'),`);
    lines.push(`  },`);
  });
  lines.push(`];`, ``, `export default LEVELS;`, ``);
  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('── Cleaning ──');
  cleanSlices();

  for (const { num, items, cols, rows } of CHAPTERS) {
    console.log(`\n── Chapter ${num}: ${cols}×${rows} ──`);
    for (const { name } of items) await splitItem(name, cols, rows);
  }

  console.log('\n── Writing index.ts ──');
  fs.writeFileSync(path.join(PUZZLE_DIR, 'index.ts'), generateIndex());

  console.log('── Writing chapter files ──');
  for (const { num, items, cols, rows } of CHAPTERS) {
    fs.writeFileSync(path.join(CONTENT_DIR, `chapter${num}.ts`), generateChapter(num, items, cols, rows));
    console.log(`  chapter${num}.ts`);
  }

  // Remove old ch5 if still present
  const ch5 = path.join(CONTENT_DIR, 'chapter5.ts');
  if (fs.existsSync(ch5)) { fs.unlinkSync(ch5); console.log('  Deleted chapter5.ts'); }

  console.log('\nDone!');
}

main().catch(console.error);
