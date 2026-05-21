import type { PuzzleLevel, PuzzlePieceData } from './chapter1';

function makePieces(name: string): PuzzlePieceData[] {
  const pieces: PuzzlePieceData[] = [];
  let i = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const k = `${name}-3x2-${i++}`;
      pieces.push({ id: k, imageKey: k, col, row });
    }
  }
  return pieces;
}

const LEVELS: PuzzleLevel[] = [
  {
    id: 1, title: 'Airplane', animal: '✈️',
    instruction: 'Put the airplane together!',
    cols: 3, rows: 2, imageKey: 'airplane',
    pieces: makePieces('airplane'),
  },
  {
    id: 2, title: 'Ambulance', animal: '🚑',
    instruction: 'Put the ambulance together!',
    cols: 3, rows: 2, imageKey: 'ambulance',
    pieces: makePieces('ambulance'),
  },
  {
    id: 3, title: 'Bus', animal: '🚌',
    instruction: 'Put the bus together!',
    cols: 3, rows: 2, imageKey: 'bus',
    pieces: makePieces('bus'),
  },
  {
    id: 4, title: 'Car', animal: '🚗',
    instruction: 'Put the car together!',
    cols: 3, rows: 2, imageKey: 'car',
    pieces: makePieces('car'),
  },
  {
    id: 5, title: 'Fire Engine', animal: '🚒',
    instruction: 'Put the fire engine together!',
    cols: 3, rows: 2, imageKey: 'fire_engine',
    pieces: makePieces('fire_engine'),
  },
  {
    id: 6, title: 'Police Car', animal: '🚔',
    instruction: 'Put the police car together!',
    cols: 3, rows: 2, imageKey: 'police_car',
    pieces: makePieces('police_car'),
  },
  {
    id: 7, title: 'Ship', animal: '🚢',
    instruction: 'Put the ship together!',
    cols: 3, rows: 2, imageKey: 'ship',
    pieces: makePieces('ship'),
  },
  {
    id: 8, title: 'Train', animal: '🚂',
    instruction: 'Put the train together!',
    cols: 3, rows: 2, imageKey: 'train',
    pieces: makePieces('train'),
  },
  {
    id: 9, title: 'Truck', animal: '🚛',
    instruction: 'Put the truck together!',
    cols: 3, rows: 2, imageKey: 'truck',
    pieces: makePieces('truck'),
  },
];

export default LEVELS;
