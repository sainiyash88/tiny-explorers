import type { PuzzleLevel, PuzzlePieceData } from './chapter1';

function makePieces(name: string): PuzzlePieceData[] {
  const pieces: PuzzlePieceData[] = [];
  let i = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const k = `${name}-2x2-${i++}`;
      pieces.push({ id: k, imageKey: k, col, row });
    }
  }
  return pieces;
}

const LEVELS: PuzzleLevel[] = [
  {
    id: 1, title: 'Lion', animal: '🦁',
    instruction: 'Put the lion together!',
    cols: 2, rows: 2, imageKey: 'lion',
    pieces: makePieces('lion'),
  },
  {
    id: 2, title: 'Elephant', animal: '🐘',
    instruction: 'Put the elephant together!',
    cols: 2, rows: 2, imageKey: 'elephant',
    pieces: makePieces('elephant'),
  },
  {
    id: 3, title: 'Bear', animal: '🐻',
    instruction: 'Put the bear together!',
    cols: 2, rows: 2, imageKey: 'bear',
    pieces: makePieces('bear'),
  },
  {
    id: 4, title: 'Horse', animal: '🐴',
    instruction: 'Put the horse together!',
    cols: 2, rows: 2, imageKey: 'horse',
    pieces: makePieces('horse'),
  },
  {
    id: 5, title: 'Monkey', animal: '🐒',
    instruction: 'Put the monkey together!',
    cols: 2, rows: 2, imageKey: 'monkey',
    pieces: makePieces('monkey'),
  },
  {
    id: 6, title: 'Cow', animal: '🐄',
    instruction: 'Put the cow together!',
    cols: 2, rows: 2, imageKey: 'cow',
    pieces: makePieces('cow'),
  },
  {
    id: 7, title: 'Sheep', animal: '🐑',
    instruction: 'Put the sheep together!',
    cols: 2, rows: 2, imageKey: 'sheep',
    pieces: makePieces('sheep'),
  },
  {
    id: 8, title: 'Camel', animal: '🐪',
    instruction: 'Put the camel together!',
    cols: 2, rows: 2, imageKey: 'camel',
    pieces: makePieces('camel'),
  },
  {
    id: 9, title: 'Fish', animal: '🐟',
    instruction: 'Put the fish together!',
    cols: 2, rows: 2, imageKey: 'fish',
    pieces: makePieces('fish'),
  },
];

export default LEVELS;
