import type { BrainLevel } from './chapter1';

const LEVELS: BrainLevel[] = [
  // ── Animal & Fruit patterns ───────────────────────────────────────
  {
    id: 1, type: 'pattern', title: 'Animal Pattern', instruction: 'What comes next?',
    mascot: 'monkey',
    sequence: ['🐱', '🐶', '🐱', '🐶', '🐱'],
    blankIndex: 4, answer: '🐱', choices: ['🐱', '🐶', '🐸'],
  },
  {
    id: 2, type: 'pattern', title: 'Fruit Pattern', instruction: 'What comes next?',
    mascot: 'apple',
    sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'],
    blankIndex: 4, answer: '🍎', choices: ['🍌', '🍎', '🍊'],
  },
  {
    id: 3, type: 'pattern', title: 'Sky Pattern', instruction: 'What comes next?',
    mascot: 'parrot',
    sequence: ['🌙', '☀️', '⭐', '🌙', '☀️'],
    blankIndex: 4, answer: '☀️', choices: ['⭐', '🌙', '☀️'],
  },
  // ── Colour patterns ──────────────────────────────────────────────
  {
    id: 4, type: 'pattern', title: 'Red & Blue', instruction: 'What colour comes next?',
    mascot: 'rabbit',
    sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'],
    blankIndex: 4, answer: '🔴', choices: ['🔴', '🔵', '🟡'],
  },
  {
    id: 5, type: 'pattern', title: 'Yellow & Green', instruction: 'What colour comes next?',
    mascot: 'butterfly',
    sequence: ['💛', '💚', '💛', '💚', '💛'],
    blankIndex: 4, answer: '💛', choices: ['💚', '💛', '❤️'],
  },
  {
    id: 6, type: 'pattern', title: 'Three Colours', instruction: 'What colour comes next?',
    mascot: 'fish',
    sequence: ['🌟', '❤️', '💜', '🌟', '❤️'],
    blankIndex: 4, answer: '❤️', choices: ['💜', '🌟', '❤️'],
  },
  // ── Shape patterns ───────────────────────────────────────────────
  {
    id: 7, type: 'pattern', title: 'Shapes Pattern', instruction: 'What shape comes next?',
    mascot: 'cat',
    // ABC repeating (square→circle→triangle), 2 full rows
    sequence: ['#square', '#circle', '#triangle', '#square', '#circle', '#triangle', '#square', '#circle', '?'],
    blankIndex: 8, answer: '#triangle', choices: ['#square', '#circle', '#triangle'],
  },
  // ── Colour identification ─────────────────────────────────────────
  {
    id: 9, type: 'findcolor', title: 'Find the Color!', instruction: 'Tap each color when asked!',
    mascot: 'frog',
    items: [
      { emoji: '❤️',  label: 'Red' },
      { emoji: '🟠',  label: 'Orange' },
      { emoji: '💛',  label: 'Yellow' },
      { emoji: '🟢',  label: 'Green' },
      { emoji: '💙',  label: 'Blue' },
      { emoji: '🟣',  label: 'Purple' },
      { emoji: '🩷',  label: 'Pink' },
    ],
  },
  // ── Shape identification ──────────────────────────────────────────
  {
    id: 10, type: 'findcolor', title: 'Find the Shape!', instruction: 'Tap each shape when asked!',
    mascot: 'elephant',
    items: [
      { emoji: '', label: 'Triangle',  svgShape: 'triangle' },
      { emoji: '', label: 'Circle',    svgShape: 'circle' },
      { emoji: '', label: 'Square',    svgShape: 'square' },
      { emoji: '', label: 'Rectangle', svgShape: 'rectangle' },
    ],
  },
];

export default LEVELS;
