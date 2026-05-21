export interface MatchCard {
  id: string;
  pairId: string;
  emoji: string;
  label: string;
  color: string;
  svgKey?: string;
}

export interface MatchLevel {
  id: number;
  title: string;
  instruction: string;
  mascot: string;
  cols: number;
  cards: MatchCard[];
}

const LEVELS: MatchLevel[] = [
  {
    id: 1, title: 'Animal Pairs', instruction: 'Find the matching animals!', mascot: 'Lion', cols: 2,
    cards: [
      { id: 'lion-a', pairId: 'lion', emoji: '🦁', label: 'Lion',     color: '#F5A623' },
      { id: 'lion-b', pairId: 'lion', emoji: '🦁', label: 'Lion',     color: '#F5A623' },
      { id: 'ele-a',  pairId: 'ele',  emoji: '🐘', label: 'Elephant', color: '#7A8CB8' },
      { id: 'ele-b',  pairId: 'ele',  emoji: '🐘', label: 'Elephant', color: '#7A8CB8' },
    ],
  },
  {
    id: 2, title: 'Jungle Friends', instruction: 'Match the jungle animals!', mascot: 'Monkey', cols: 2,
    cards: [
      { id: 'monk-a', pairId: 'monk', emoji: '🐒', label: 'Monkey', color: '#A0522D' },
      { id: 'monk-b', pairId: 'monk', emoji: '🐒', label: 'Monkey', color: '#A0522D' },
      { id: 'frog-a', pairId: 'frog', emoji: '🐸', label: 'Frog',   color: '#4CAF50' },
      { id: 'frog-b', pairId: 'frog', emoji: '🐸', label: 'Frog',   color: '#4CAF50' },
    ],
  },
  {
    id: 3, title: 'Bird Pairs', instruction: 'Find the matching birds!', mascot: 'Parrot', cols: 2,
    cards: [
      { id: 'parr-a', pairId: 'parr', emoji: '🦜', label: 'Parrot',  color: '#E53935' },
      { id: 'parr-b', pairId: 'parr', emoji: '🦜', label: 'Parrot',  color: '#E53935' },
      { id: 'peng-a', pairId: 'peng', emoji: '🐧', label: 'Penguin', color: '#1E88E5' },
      { id: 'peng-b', pairId: 'peng', emoji: '🐧', label: 'Penguin', color: '#1E88E5' },
    ],
  },
  {
    id: 4, title: 'Ocean Animals', instruction: 'Match the sea creatures!', mascot: 'Fish', cols: 2,
    cards: [
      { id: 'fish-a', pairId: 'fish', emoji: '🐠', label: 'Fish', color: '#FF7043' },
      { id: 'fish-b', pairId: 'fish', emoji: '🐠', label: 'Fish', color: '#FF7043' },
      { id: 'crab-a', pairId: 'crab', emoji: '🦀', label: 'Crab', color: '#7B1FA2' },
      { id: 'crab-b', pairId: 'crab', emoji: '🦀', label: 'Crab', color: '#7B1FA2' },
    ],
  },
  {
    id: 5, title: 'Farm Animals', instruction: 'Find the matching farm animals!', mascot: 'Cow', cols: 2,
    cards: [
      { id: 'cow-a', pairId: 'cow', emoji: '🐄', label: 'Cow', color: '#8D6E63' },
      { id: 'cow-b', pairId: 'cow', emoji: '🐄', label: 'Cow', color: '#8D6E63' },
      { id: 'pig-a', pairId: 'pig', emoji: '🐷', label: 'Pig', color: '#F48FB1' },
      { id: 'pig-b', pairId: 'pig', emoji: '🐷', label: 'Pig', color: '#F48FB1' },
    ],
  },
  {
    id: 6, title: 'Insect Match', instruction: 'Match the little bugs!', mascot: 'Butterfly', cols: 2,
    cards: [
      { id: 'butt-a', pairId: 'butt', emoji: '🦋', label: 'Butterfly', color: '#AB47BC' },
      { id: 'butt-b', pairId: 'butt', emoji: '🦋', label: 'Butterfly', color: '#AB47BC' },
      { id: 'bee-a',  pairId: 'bee',  emoji: '🐝', label: 'Bee',       color: '#FDD835' },
      { id: 'bee-b',  pairId: 'bee',  emoji: '🐝', label: 'Bee',       color: '#FDD835' },
    ],
  },
  {
    id: 7, title: 'Safari Pals', instruction: 'Match the safari animals!', mascot: 'Giraffe', cols: 2,
    cards: [
      { id: 'gir-a', pairId: 'gir', emoji: '🦒', label: 'Giraffe', color: '#F9A825' },
      { id: 'gir-b', pairId: 'gir', emoji: '🦒', label: 'Giraffe', color: '#F9A825' },
      { id: 'zeb-a', pairId: 'zeb', emoji: '🦓', label: 'Zebra',   color: '#546E7A' },
      { id: 'zeb-b', pairId: 'zeb', emoji: '🦓', label: 'Zebra',   color: '#546E7A' },
    ],
  },
  {
    id: 8, title: 'Night Animals', instruction: 'Match the night creatures!', mascot: 'Cat', cols: 2,
    cards: [
      { id: 'owl-a', pairId: 'owl', emoji: '🦉', label: 'Owl',  color: '#6D4C41' },
      { id: 'owl-b', pairId: 'owl', emoji: '🦉', label: 'Owl',  color: '#6D4C41' },
      { id: 'bat-a', pairId: 'bat', emoji: '🦇', label: 'Bat',  color: '#4527A0' },
      { id: 'bat-b', pairId: 'bat', emoji: '🦇', label: 'Bat',  color: '#4527A0' },
    ],
  },
  {
    id: 9, title: 'Fluffy Friends', instruction: 'Match the fluffy animals!', mascot: 'Rabbit', cols: 2,
    cards: [
      { id: 'rab-a', pairId: 'rab', emoji: '🐰', label: 'Rabbit', color: '#F48FB1' },
      { id: 'rab-b', pairId: 'rab', emoji: '🐰', label: 'Rabbit', color: '#F48FB1' },
      { id: 'ham-a', pairId: 'ham', emoji: '🐹', label: 'Hamster', color: '#26C6DA' },
      { id: 'ham-b', pairId: 'ham', emoji: '🐹', label: 'Hamster', color: '#26C6DA' },
    ],
  },
];

export default LEVELS;
