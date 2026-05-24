import type { BrainLevel } from './chapter1';

const LEVELS: BrainLevel[] = [
  {
    id: 1, type: 'matchfollow', title: 'Match Numbers!', instruction: 'Match each number to the dots!',
    mascot: 'giraffe',
    question: 'Draw a line to match! ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'one',   left: '1', right: '🌸'           },
      { pairId: 'two',   left: '2', right: '🍦🍦'         },
      { pairId: 'three', left: '3', right: '⭐⭐⭐'       },
      { pairId: 'four',  left: '4', right: '🐦🐦🐦🐦'     },
      { pairId: 'five',  left: '5', right: '🎈🎈🎈🎈🎈'   },
    ],
  },
  {
    id: 2, type: 'matchfollow', title: 'Animal Food!', instruction: 'Match the animal to its food!',
    mascot: 'cow',
    question: 'Who eats what? ✏️', wrapTiles: true,
    pairs: [
      { pairId: 'rabbit',   left: '🐇', right: '🥕' },
      { pairId: 'cow',      left: '🐄', right: '🌿' },
      { pairId: 'lion',     left: '🦁', right: '🥩' },
      { pairId: 'chicken',  left: '🐔', right: '🌽' },
      { pairId: 'elephant', left: '🐘', right: '🎋' },
    ],
  },
  {
    id: 3, type: 'matchfollow', title: 'Baby Animals!', instruction: 'Match each parent to its baby!',
    mascot: 'lion',
    question: 'Who is the parent? ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'duck',   left: '🦆', right: '🐥' },
      { pairId: 'dog',    left: '🐕', right: '🐶' },
      { pairId: 'cat',    left: '🐈', right: '🐱' },
      { pairId: 'rabbit', left: '🐇', right: '🐰' },
      { pairId: 'pig',    left: '🐖', right: '🐷' },
    ],
  },
  {
    id: 4, type: 'matchfollow', title: 'Animal Products!', instruction: 'Match each animal to what it gives us!',
    mascot: 'sheep',
    question: 'What do we get from them? ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'sheep', left: '🐑', right: '🧶' },
      { pairId: 'cow',   left: '🐄', right: '🥛' },
      { pairId: 'hen',   left: '🐔', right: '🥚' },
      { pairId: 'bee',   left: '🐝', right: '🍯' },
    ],
  },
  {
    id: 5, type: 'matchfollow', title: 'Shapes & Objects!', instruction: 'Match each shape to its object!',
    mascot: 'elephant',
    question: 'Find the matching object! ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'diamond',   left: '', leftSvgShape: 'diamond',   right: '🪁' },
      { pairId: 'square',    left: '', leftSvgShape: 'square',    right: '🪟' },
      { pairId: 'circle',    left: '', leftSvgShape: 'circle',    right: '⚽' },
      { pairId: 'triangle',  left: '', leftSvgShape: 'triangle',  right: '🍕' },
      { pairId: 'rectangle', left: '', leftSvgShape: 'rectangle', right: '✉️' },
    ],
  },
  {
    id: 6, type: 'matchfollow', title: 'Shadow Match!', instruction: 'Match each object to its shadow!',
    mascot: 'elephant',
    question: 'Find the shadow! 🌑',
    wrapTiles: true,
    shadowMode: true,
    pairs: [
      { pairId: 'elephant', left: '🐘', right: '', rightSilhouette: 'elephant' },
      { pairId: 'car',      left: '🚗', right: '', rightSilhouette: 'car'      },
      { pairId: 'orange',   left: '🍊', right: '', rightSilhouette: 'orange'   },
      { pairId: 'carrot',   left: '🥕', right: '', rightSilhouette: 'carrot'   },
      { pairId: 'tree',     left: '🌲', right: '', rightSilhouette: 'tree'     },
    ],
  },
  {
    id: 7, type: 'maze', title: 'Mouse Maze!', instruction: 'Help the mouse find the cheese!',
    mascot: 'elephant',
    startEmoji: '🐭', endEmoji: '🧀',
    start: { row: 0, col: 0 },
    end:   { row: 5, col: 5 },
    // 0 = open path, 1 = wall
    // Solution: (0,0)→(1,0)→(2,0)→(2,1)→(2,2)→(3,2)→(3,3)→(3,4)→(3,5)→(4,5)→(5,5)
    // Dead end 1: (3,2)→(4,2)→(4,1)→(4,0)→(5,0) — tempts going down too early
    // Dead end 2: (3,5)→(2,5)→(1,5)→(1,4)→(0,4)→(0,3)→(0,2) — tempts going up near end
    grid: [
      [0, 1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 0, 0],
    ],
  },
  {
    id: 8, type: 'maze', title: 'Dog House!', instruction: 'Help the dog find its house!',
    mascot: 'elephant',
    startEmoji: '🐕', endEmoji: '🏠',
    start: { row: 0, col: 0 },
    end:   { row: 6, col: 6 },
    // Solution (23 steps): (0,0)→down col 0 to (5,0)→right to (5,2)→up to (3,2)→right to (3,4)
    //   →up to (0,4)→right to (0,6)→down col 6 to (6,6)
    // Dead end 1: (2,0)→(2,1) — tempts going right early
    // Dead end 2: (5,2)→(6,2)→(6,3) — tempts going down near middle
    // Dead end 3: (3,4)→(4,4) — tempts going down before the climb
    // Dead end 4: (0,4)→(0,3) — tempts going left near top
    grid: [
      [0, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 0],
    ],
  },
  {
    id: 9, type: 'maze', title: 'Hungry Cow!', instruction: 'Help the cow find the grass!',
    mascot: 'cow',
    startEmoji: '🐄', endEmoji: '🌿',
    start: { row: 0, col: 5 },
    end:   { row: 6, col: 0 },
    // Solution (18 steps): (0,5)→(1,5)→(1,4)→(1,3)→(0,3)→(0,2)→(0,1)→(0,0)
    //   →(1,0)→(2,0)→(2,1)→(2,2)→(3,2)→(4,2)→(4,1)→(4,0)→(5,0)→(6,0)
    // Dead end 1: (1,4)→(2,4)         — surrounded by walls
    // Dead end 2: (4,2)→(4,3)         — cul-de-sac on the right
    // Dead end 3: (3,2) tempts going up into a loop back (blocked by walls)
    grid: [
      [0, 0, 0, 0, 1, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 1],
      [1, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 10, type: 'maze', title: 'Monkey Hungry!', instruction: 'Help the monkey find the banana!',
    mascot: 'giraffe',
    startEmoji: '🐒', endEmoji: '🍌',
    start: { row: 0, col: 0 },
    end:   { row: 5, col: 6 },
    // Solution (16 steps): (0,0)→(1,0)→(2,0)→(2,1)→(2,2)→(2,3)→(1,3)→(0,3)→(0,4)
    //   →(1,4)→(1,5)→(2,5)→(2,6)→(3,6)→(4,6)→(5,6)
    // Dead end 1: (0,4) — tempts going to (0,3) back only, but (0,4) is actually a spur: only (1,4) connects forward
    // Dead end 2: (2,3)→(3,3)→(4,3)→(4,4)→(5,4)→(5,5) — tempts going down before climbing back up
    grid: [
      [0, 1, 1, 0, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 0, 0, 1, 0],
      [1, 1, 1, 1, 0, 0, 0],
    ],
  },
  {
    id: 11, type: 'maze', title: 'Bicycle Time!', instruction: 'Help the boy reach his bicycle!',
    mascot: 'elephant',
    startEmoji: '👦', endEmoji: '🚲',
    start: { row: 4, col: 0 },
    end:   { row: 0, col: 7 },
    // Solution (16 steps): (4,0)→(3,0)→(2,0)→(2,1)→(2,2)→(2,3)→(1,3)→(0,3)
    //   →(0,4)→(0,5)→(1,5)→(2,5)→(2,6)→(1,6)→(0,6)→(0,7)
    // Dead end 1: (2,3)→(3,3)→(4,3)→(4,4)→(4,5) — tempts going down-right
    // Dead end 2: (1,3)→(1,4) — short spur going right too early
    grid: [
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 0, 0, 1],
      [0, 1, 1, 0, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 1, 1],
    ],
  },
  {
    id: 12, type: 'maze', title: 'Race to the Road!', instruction: 'Drive the car to the finish line!',
    mascot: 'lion',
    startEmoji: '🚗', endEmoji: '🏁',
    start: { row: 0, col: 2 },
    end:   { row: 7, col: 2 },
    // Solution (12 steps): (0,2)→(1,2)→(1,1)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(4,2)→(5,2)→(6,2)→(7,2)
    // Dead end 1: (1,2)→(1,3)→(1,4)→(2,4) — tempts going right at the start
    // Dead end 2: (6,2)→(6,3)→(6,4)→(5,4)→(4,4) — tempts going right near finish
    grid: [
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 1, 1],
    ],
  },
];

export default LEVELS;
