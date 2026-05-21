export type BrainActivityType = 'pattern' | 'missing' | 'bigsmall' | 'opposite' | 'count' | 'moreless' | 'matchfollow' | 'oddoneout' | 'finddiff' | 'maze' | 'findcolor';

export interface PatternLevel {
  id: number;
  type: 'pattern';
  title: string;
  instruction: string;
  mascot: string;
  sequence: string[];
  blankIndex: number;
  answer: string;
  choices: string[];
}

export interface MissingLevel {
  id: number;
  type: 'missing';
  title: string;
  instruction: string;
  mascot: string;
  items: string[];
  missingIndex: number;
  choices: string[];
}

export interface BigSmallLevel {
  id: number;
  type: 'bigsmall';
  title: string;
  instruction: string;
  mascot: string;
  emoji: string;
  correctAnswer: 'big' | 'small';
  question: string;
}

export interface OppositeLevel {
  id: number;
  type: 'opposite';
  title: string;
  instruction: string;
  mascot: string;
  question: string;
  leftEmoji: string;
  leftLabel: string;
  leftEmojiSize?: number;
  leftEmojiScale?: { x: number; y: number };
  leftSvgKey?: string;
  rightEmoji: string;
  rightLabel: string;
  rightEmojiSize?: number;
  rightEmojiScale?: { x: number; y: number };
  rightSvgKey?: string;
  correctSide: 'left' | 'right';
}

export interface CountLevel {
  id: number; type: 'count'; title: string; instruction: string; mascot: string;
  emoji: string; count: number; choices: number[]; question: string;
}

export interface MoreLessLevel {
  id: number; type: 'moreless'; title: string; instruction: string; mascot: string;
  leftEmoji: string; leftCount: number;
  rightEmoji: string; rightCount: number;
  question: string; correctSide: 'left' | 'right';
}

export interface MatchFollowPair {
  pairId: string; left: string; right: string; leftSvgShape?: string; rightSilhouette?: string;
}

export interface MatchFollowLevel {
  id: number; type: 'matchfollow'; title: string; instruction: string; mascot: string;
  question: string; pairs: MatchFollowPair[];
  wrapTiles?: boolean;
  shadowMode?: boolean;
}

export interface OddOneOutLevel {
  id: number; type: 'oddoneout'; title: string; instruction: string; mascot: string;
  question: string;
  items: Array<{ emoji: string; label: string; svgShape?: string }>;
  oddIndex: number;
}

export interface FindDiffLevel {
  id: number; type: 'finddiff'; title: string; instruction: string; mascot: string;
  question: string;
  baseGrid: string[][];
  diffGrid: string[][];
  diffCells: Array<{ row: number; col: number }>;
}

export interface MazeLevel {
  id: number; type: 'maze'; title: string; instruction: string; mascot: string;
  grid: number[][];
  start: { row: number; col: number };
  end: { row: number; col: number };
  startEmoji: string;
  endEmoji: string;
}

export interface FindColorLevel {
  id: number; type: 'findcolor'; title: string; instruction: string; mascot: string;
  items: { emoji: string; label: string; svgShape?: string }[];
}

export type BrainLevel = PatternLevel | MissingLevel | BigSmallLevel | OppositeLevel | CountLevel | MoreLessLevel | MatchFollowLevel | OddOneOutLevel | FindDiffLevel | MazeLevel | FindColorLevel;

const LEVELS: BrainLevel[] = [
  // ── Opposites ────────────────────────────────────────────────────
  {
    id: 1,
    type: 'opposite',
    title: 'Long & Short',
    instruction: 'Tap the LONG one!',
    mascot: 'longsnake',
    question: 'Which one is LONG? 🤔',
    leftEmoji: '🐍',
    leftLabel: 'LONG',
    leftSvgKey: 'longsnake',
    rightEmoji: '🐛',
    rightLabel: 'SHORT',
    rightEmojiSize: 38,
    correctSide: 'left',
  },
  {
    id: 2,
    type: 'opposite',
    title: 'Long & Short',
    instruction: 'Tap the SHORT one!',
    mascot: 'frog',
    question: 'Which one is SHORT? 🤔',
    leftEmoji: '🐍',
    leftLabel: 'LONG',
    leftSvgKey: 'longsnake',
    rightEmoji: '🐛',
    rightLabel: 'SHORT',
    rightEmojiSize: 38,
    correctSide: 'right',
  },
  {
    id: 3,
    type: 'opposite',
    title: 'Fat & Thin',
    instruction: 'Tap the FAT one!',
    mascot: 'elephant',
    question: 'Which one is FAT? 🤔',
    leftEmoji: '🐘',
    leftLabel: 'FAT',
    rightEmoji: '🦒',
    rightLabel: 'THIN',
    correctSide: 'left',
  },
  {
    id: 4,
    type: 'opposite',
    title: 'Fat & Thin',
    instruction: 'Tap the THIN one!',
    mascot: 'giraffe',
    question: 'Which one is THIN? 🤔',
    leftEmoji: '🐘',
    leftLabel: 'FAT',
    rightEmoji: '🦒',
    rightLabel: 'THIN',
    correctSide: 'right',
  },
  {
    id: 5,
    type: 'opposite',
    title: 'Hot & Cold',
    instruction: 'Tap the HOT one!',
    mascot: 'lion',
    question: 'Which one is HOT? 🤔',
    leftEmoji: '🔥',
    leftLabel: 'HOT',
    rightEmoji: '🍦',
    rightLabel: 'COLD',
    correctSide: 'left',
  },
  {
    id: 6,
    type: 'opposite',
    title: 'Hot & Cold',
    instruction: 'Tap the COLD one!',
    mascot: 'rabbit',
    question: 'Which one is COLD? 🤔',
    leftEmoji: '🔥',
    leftLabel: 'HOT',
    rightEmoji: '🍦',
    rightLabel: 'COLD',
    correctSide: 'right',
  },
  {
    id: 7,
    type: 'opposite',
    title: 'Light & Dark',
    instruction: 'Tap the LIGHT one!',
    mascot: 'butterfly',
    question: 'Which one is LIGHT? 🤔',
    leftEmoji: '☀️',
    leftLabel: 'LIGHT',
    rightEmoji: '🌑',
    rightLabel: 'DARK',
    correctSide: 'left',
  },
  {
    id: 8,
    type: 'opposite',
    title: 'Light & Dark',
    instruction: 'Tap the DARK one!',
    mascot: 'cat',
    question: 'Which one is DARK? 🤔',
    leftEmoji: '☀️',
    leftLabel: 'LIGHT',
    rightEmoji: '🌑',
    rightLabel: 'DARK',
    correctSide: 'right',
  },

  // ── Missing item levels ──────────────────────────────────────────
  {
    id: 9,
    type: 'missing',
    title: "What's Missing?",
    instruction: 'Something is missing! Tap it!',
    mascot: 'fish',
    items: ['🦁', '🐘', '🐒', '🦒'],
    missingIndex: 2,
    choices: ['🐸', '🐒', '🦁'],
  },
  {
    id: 10,
    type: 'missing',
    title: 'Find the Gap',
    instruction: 'Something is missing! Tap it!',
    mascot: 'banana',
    items: ['🍎', '🍌', '🍇', '🍊'],
    missingIndex: 1,
    choices: ['🍊', '🍇', '🍌'],
  },
  // ── Big / Small levels ───────────────────────────────────────────
  {
    id: 11,
    type: 'bigsmall',
    title: 'Big or Small?',
    instruction: 'Tap the BIG one!',
    mascot: 'strawberry',
    emoji: '🐘',
    correctAnswer: 'big',
    question: 'Tap the BIG elephant!',
  },
  {
    id: 12,
    type: 'bigsmall',
    title: 'Tiny or Giant?',
    instruction: 'Tap the SMALL one!',
    mascot: 'orange',
    emoji: '🐱',
    correctAnswer: 'small',
    question: 'Tap the SMALL cat!',
  },
];

export default LEVELS;
