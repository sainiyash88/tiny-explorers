import type { BrainLevel } from './chapter1';

const LEVELS: BrainLevel[] = [
  // ── Patterns (complex: 8–9 items, ABC repeating, blank near end) ──────
  {
    id: 1, type: 'pattern', title: 'Weather Pattern!', instruction: 'What comes next in the pattern?',
    mascot: 'elephant',
    // ABC ABC AB? → answer C
    sequence: ['🌞', '🌜', '⛅', '🌞', '🌜', '⛅', '🌞', '🌜', '?'],
    blankIndex: 8, answer: '⛅', choices: ['🌞', '🌜', '⛅'],
  },
  {
    id: 2, type: 'pattern', title: 'Animal Parade!', instruction: 'What comes next in the pattern?',
    mascot: 'lion',
    // ABCD repeating (4 unique animals): 🐶🐱🐸🐰🐶🐱🐸🐰🐶🐱🐸[?] → answer 🐰
    sequence: ['🐶', '🐱', '🐸', '🐰', '🐶', '🐱', '🐸', '🐰', '🐶', '🐱', '🐸', '?'],
    blankIndex: 11, answer: '🐰', choices: ['🐶', '🐸', '🐰'],
  },
  {
    id: 3, type: 'pattern', title: 'Veggie Pattern!', instruction: 'What comes next in the pattern?',
    mascot: 'giraffe',
    // ABCD repeating (4 unique vegetables): 🥕🥦🌽🍆 × 3, blank at end
    sequence: ['🥕', '🥦', '🌽', '🍆', '🥕', '🥦', '🌽', '🍆', '🥕', '🥦', '🌽', '?'],
    blankIndex: 11, answer: '🍆', choices: ['🥕', '🌽', '🍆'],
  },

  // ── Match the Following (5–6 pairs, higher-order concepts) ───────────
  {
    id: 4, type: 'matchfollow', title: 'Animal Homes!', instruction: 'Match each animal to where it lives!',
    mascot: 'rabbit',
    question: 'Where do they live? ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'bird',   left: '🐦', right: '🪹' },
      { pairId: 'bee',    left: '🐝', right: '', rightSilhouette: 'honeycomb' },
      { pairId: 'fish',   left: '🐟', right: '🌊' },
      { pairId: 'turtle', left: '🐢', right: '🏖️' },
      { pairId: 'owl',    left: '🦉', right: '🌳' },
    ],
  },
  {
    id: 5, type: 'matchfollow', title: 'Where Do They Go?', instruction: 'Match each vehicle to where it travels!',
    mascot: 'elephant',
    question: 'Where does it travel? ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'train',  left: '🚂', right: '🛤️' },
      { pairId: 'ship',   left: '🚢', right: '🌊' },
      { pairId: 'plane',  left: '✈️', right: '☁️' },
      { pairId: 'car',    left: '🚗', right: '🛣️' },
      { pairId: 'rocket', left: '🚀', right: '⭐' },
    ],
  },
  {
    id: 6, type: 'matchfollow', title: 'Food Colours!', instruction: 'Match each food to its colour!',
    mascot: 'lion',
    question: 'What colour is it? ✏️',
    wrapTiles: true,
    pairs: [
      { pairId: 'apple',      left: '🍎', right: '🔴' },
      { pairId: 'lemon',      left: '🍋', right: '🟡' },
      { pairId: 'grapes',     left: '🍇', right: '🟣' },
      { pairId: 'carrot',     left: '🥕', right: '🟠' },
      { pairId: 'broccoli',   left: '🥦', right: '🟢' },
      { pairId: 'blueberry',  left: '🫐', right: '🔵' },
    ],
  },

  // ── Mazes (hardest — large grids, long solutions, multiple dead ends) ─
  {
    id: 7, type: 'maze', title: 'Rabbit Hunt!', instruction: 'Help the rabbit find the carrot!',
    mascot: 'rabbit',
    startEmoji: '🐇', endEmoji: '🥕',
    start: { row: 0, col: 0 },
    end:   { row: 7, col: 7 },
    // Solution (15 steps): (0,0)→(0,1)→(1,1)→(1,2)→(2,2)→(3,2)→(4,2)→(4,3)→(4,4)
    //   →(5,4)→(6,4)→(6,5)→(6,6)→(7,6)→(7,7)
    // Dead end 1 (off 4,4): (4,5)→(3,5)→(2,5)→(2,6)→(1,6)→(1,5) — big right-side cluster
    // Dead end 2 (off 6,4): (6,3)→(6,2)→(7,2)→(7,1) — tempts going left near finish
    grid: [
      [0, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0],
    ],
  },
  {
    id: 8, type: 'maze', title: 'Penguin & Fish!', instruction: 'Help the penguin reach the fish!',
    mascot: 'giraffe',
    startEmoji: '🐧', endEmoji: '🐟',
    start: { row: 0, col: 0 },
    end:   { row: 6, col: 8 },
    // Solution (14 steps): (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(4,2)→(4,3)
    //   →(5,3)→(6,3)→(6,4)→(6,5)→(6,6)→(6,7)→(6,8)
    // Dead end 1 (off 4,3→4,4): (4,4)→(4,5)→(3,5)→(2,5)→(2,4)→(2,3)→(1,3) — long upper-right climb
    // Dead end 2 (off 6,3): (6,2)→(6,1) — short left spur near finish
    // Dead end 3 (off 0,0): (0,1) — tiny spur at start
    grid: [
      [0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    id: 9, type: 'maze', title: 'Bee & Flower!', instruction: 'Help the bee find the flower!',
    mascot: 'cow',
    startEmoji: '🐝', endEmoji: '🌸',
    start: { row: 7, col: 7 },
    end:   { row: 0, col: 0 },
    // Solution (25 steps): (7,7)→(7,6)→(7,5)→(6,5)→(5,5)→(5,6)→(5,7)→(4,7)
    //   →(3,7)→(3,6)→(3,5)→(3,4)→(4,4)→(5,4)→(6,4)→(6,3)→(6,2)→(5,2)
    //   →(4,2)→(4,1)→(4,0)→(3,0)→(2,0)→(1,0)→(0,0)
    // Dead end 1 (off 3,4): (2,4)→(1,4)→(1,5)→(0,5)→(0,6)→(0,7) — upper-right dead end
    // Dead end 2 (off 6,2): (7,2)→(7,1)→(7,0) — bottom-left dead end
    grid: [
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 0],
      [1, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
  },
];

export default LEVELS;
