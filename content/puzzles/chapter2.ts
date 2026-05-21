import type { PuzzleLevel, PuzzlePieceData } from './chapter1';

function makePieces(name: string): PuzzlePieceData[] {
  const pieces: PuzzlePieceData[] = [];
  for (let col = 0; col < 3; col++) {
    const k = `${name}-3c-${col}`;
    pieces.push({ id: k, imageKey: k, col, row: 0 });
  }
  return pieces;
}

const LEVELS: PuzzleLevel[] = [
  {
    id: 1, title: 'Brinjal', animal: '🍆',
    instruction: 'Put the brinjal together!',
    cols: 3, rows: 1, imageKey: 'brinjal',
    pieces: makePieces('brinjal'),
  },
  {
    id: 2, title: 'Carrot', animal: '🥕',
    instruction: 'Put the carrot together!',
    cols: 3, rows: 1, imageKey: 'carrot',
    pieces: makePieces('carrot'),
  },
  {
    id: 3, title: 'Cauliflower', animal: '🥦',
    instruction: 'Put the cauliflower together!',
    cols: 3, rows: 1, imageKey: 'cauliflower',
    pieces: makePieces('cauliflower'),
  },
  {
    id: 4, title: 'Green Peas', animal: '🫛',
    instruction: 'Put the green peas together!',
    cols: 3, rows: 1, imageKey: 'green_peas',
    pieces: makePieces('green_peas'),
  },
  {
    id: 5, title: 'Lady Finger', animal: '🌿',
    instruction: 'Put the lady finger together!',
    cols: 3, rows: 1, imageKey: 'lady_finger',
    pieces: makePieces('lady_finger'),
  },
  {
    id: 6, title: 'Onion', animal: '🧅',
    instruction: 'Put the onion together!',
    cols: 3, rows: 1, imageKey: 'onion',
    pieces: makePieces('onion'),
  },
  {
    id: 7, title: 'Potato', animal: '🥔',
    instruction: 'Put the potato together!',
    cols: 3, rows: 1, imageKey: 'potato',
    pieces: makePieces('potato'),
  },
  {
    id: 8, title: 'Pumpkin', animal: '🎃',
    instruction: 'Put the pumpkin together!',
    cols: 3, rows: 1, imageKey: 'pumpkin',
    pieces: makePieces('pumpkin'),
  },
  {
    id: 9, title: 'Tomato', animal: '🍅',
    instruction: 'Put the tomato together!',
    cols: 3, rows: 1, imageKey: 'tamato',
    pieces: makePieces('tamato'),
  },
  {
    id: 10, title: 'Broccoli', animal: '🥦',
    instruction: 'Put the broccoli together!',
    cols: 3, rows: 1, imageKey: 'broccoli',
    pieces: makePieces('broccoli'),
  },
  {
    id: 11, title: 'Cabbage', animal: '🥬',
    instruction: 'Put the cabbage together!',
    cols: 3, rows: 1, imageKey: 'cabbage',
    pieces: makePieces('cabbage'),
  },
  {
    id: 12, title: 'Capsicum', animal: '🫑',
    instruction: 'Put the capsicum together!',
    cols: 3, rows: 1, imageKey: 'capsicum',
    pieces: makePieces('capsicum'),
  },
];

export default LEVELS;
