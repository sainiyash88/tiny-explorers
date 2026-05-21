export interface PuzzlePieceData {
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

function makePieces(name: string): PuzzlePieceData[] {
  const pieces: PuzzlePieceData[] = [];
  for (let col = 0; col < 2; col++) {
    const k = `${name}-2c-${col}`;
    pieces.push({ id: k, imageKey: k, col, row: 0 });
  }
  return pieces;
}

const LEVELS: PuzzleLevel[] = [
  {
    id: 1, title: 'Apple', animal: '🍎',
    instruction: 'Put the apple together!',
    cols: 2, rows: 1, imageKey: 'apple',
    pieces: makePieces('apple'),
  },
  {
    id: 2, title: 'Avocado', animal: '🥑',
    instruction: 'Put the avocado together!',
    cols: 2, rows: 1, imageKey: 'avacado',
    pieces: makePieces('avacado'),
  },
  {
    id: 3, title: 'Banana', animal: '🍌',
    instruction: 'Put the banana together!',
    cols: 2, rows: 1, imageKey: 'banana',
    pieces: makePieces('banana'),
  },
  {
    id: 4, title: 'Dragon Fruit', animal: '🍈',
    instruction: 'Put the dragon fruit together!',
    cols: 2, rows: 1, imageKey: 'dragonfruit',
    pieces: makePieces('dragonfruit'),
  },
  {
    id: 5, title: 'Grapes', animal: '🍇',
    instruction: 'Put the grapes together!',
    cols: 2, rows: 1, imageKey: 'grapes',
    pieces: makePieces('grapes'),
  },
  {
    id: 6, title: 'Guava', animal: '🍈',
    instruction: 'Put the guava together!',
    cols: 2, rows: 1, imageKey: 'guava',
    pieces: makePieces('guava'),
  },
  {
    id: 7, title: 'Kiwi', animal: '🥝',
    instruction: 'Put the kiwi together!',
    cols: 2, rows: 1, imageKey: 'kiwi',
    pieces: makePieces('kiwi'),
  },
  {
    id: 8, title: 'Litchi', animal: '🍈',
    instruction: 'Put the litchi together!',
    cols: 2, rows: 1, imageKey: 'litchi',
    pieces: makePieces('litchi'),
  },
  {
    id: 9, title: 'Mango', animal: '🥭',
    instruction: 'Put the mango together!',
    cols: 2, rows: 1, imageKey: 'mango',
    pieces: makePieces('mango'),
  },
  {
    id: 10, title: 'Orange', animal: '🍊',
    instruction: 'Put the orange together!',
    cols: 2, rows: 1, imageKey: 'orange',
    pieces: makePieces('orange'),
  },
  {
    id: 11, title: 'Papaya', animal: '🍈',
    instruction: 'Put the papaya together!',
    cols: 2, rows: 1, imageKey: 'papaya',
    pieces: makePieces('papaya'),
  },
  {
    id: 12, title: 'Pineapple', animal: '🍍',
    instruction: 'Put the pineapple together!',
    cols: 2, rows: 1, imageKey: 'pineapple',
    pieces: makePieces('pineapple'),
  },
  {
    id: 13, title: 'Plum', animal: '🫐',
    instruction: 'Put the plum together!',
    cols: 2, rows: 1, imageKey: 'plum',
    pieces: makePieces('plum'),
  },
  {
    id: 14, title: 'Strawberry', animal: '🍓',
    instruction: 'Put the strawberry together!',
    cols: 2, rows: 1, imageKey: 'strawberry',
    pieces: makePieces('strawberry'),
  },
  {
    id: 15, title: 'Watermelon', animal: '🍉',
    instruction: 'Put the watermelon together!',
    cols: 2, rows: 1, imageKey: 'watermelon',
    pieces: makePieces('watermelon'),
  },
];

export default LEVELS;
