import type { MatchLevel } from './chapter1';

const LEVELS: MatchLevel[] = [
  {
    id: 1, title: 'Sweet Fruits', instruction: 'Match the fruits!', mascot: 'Apple', cols: 2,
    cards: [
      { id: 'app-a', pairId: 'app', emoji: '🍎', label: 'Apple',  color: '#E53935' },
      { id: 'app-b', pairId: 'app', emoji: '🍎', label: 'Apple',  color: '#E53935' },
      { id: 'ban-a', pairId: 'ban', emoji: '🍌', label: 'Banana', color: '#F9A825' },
      { id: 'ban-b', pairId: 'ban', emoji: '🍌', label: 'Banana', color: '#F9A825' },
      { id: 'man-a', pairId: 'man', emoji: '🥭', label: 'Mango',  color: '#4CAF50' },
      { id: 'man-b', pairId: 'man', emoji: '🥭', label: 'Mango',  color: '#4CAF50' },
    ],
  },
  {
    id: 2, title: 'Berry Time', instruction: 'Find the berry pairs!', mascot: 'Strawberry', cols: 2,
    cards: [
      { id: 'str-a', pairId: 'str', emoji: '🍓', label: 'Strawberry', color: '#E53935' },
      { id: 'str-b', pairId: 'str', emoji: '🍓', label: 'Strawberry', color: '#E53935' },
      { id: 'blk-a', pairId: 'blk', emoji: '🫐', label: 'Blackberry', color: '#1A237E' },
      { id: 'blk-b', pairId: 'blk', emoji: '🫐', label: 'Blackberry', color: '#1A237E' },
      { id: 'che-a', pairId: 'che', emoji: '🍒', label: 'Cherry',     color: '#7B1FA2' },
      { id: 'che-b', pairId: 'che', emoji: '🍒', label: 'Cherry',     color: '#7B1FA2' },
    ],
  },
  {
    id: 3, title: 'Tropical Mix', instruction: 'Match the tropical fruits!', mascot: 'Pineapple', cols: 2,
    cards: [
      { id: 'pin-a', pairId: 'pin', emoji: '🍍', label: 'Pineapple',  color: '#F9A825' },
      { id: 'pin-b', pairId: 'pin', emoji: '🍍', label: 'Pineapple',  color: '#F9A825' },
      { id: 'coc-a', pairId: 'coc', emoji: '🥥', label: 'Coconut',    color: '#8D6E63' },
      { id: 'coc-b', pairId: 'coc', emoji: '🥥', label: 'Coconut',    color: '#8D6E63' },
      { id: 'wat-a', pairId: 'wat', emoji: '🍉', label: 'Watermelon', color: '#43A047' },
      { id: 'wat-b', pairId: 'wat', emoji: '🍉', label: 'Watermelon', color: '#43A047' },
    ],
  },
  {
    id: 4, title: 'Citrus Grove', instruction: 'Find the citrus pairs!', mascot: 'Lemon', cols: 2,
    cards: [
      { id: 'lem-a', pairId: 'lem', emoji: '🍋', label: 'Lemon',      color: '#FDD835' },
      { id: 'lem-b', pairId: 'lem', emoji: '🍋', label: 'Lemon',      color: '#FDD835' },
      { id: 'ora-a', pairId: 'ora', emoji: '🍊', label: 'Orange',     color: '#E65100' },
      { id: 'ora-b', pairId: 'ora', emoji: '🍊', label: 'Orange',     color: '#E65100' },
      { id: 'lim-a', pairId: 'lim', emoji: '🍋‍🟩', label: 'Lime',      color: '#388E3C' },
      { id: 'lim-b', pairId: 'lim', emoji: '🍋‍🟩', label: 'Lime',      color: '#388E3C' },
    ],
  },
  {
    id: 5, title: 'Fruit Fiesta', instruction: 'Match all the fruits!', mascot: 'Peach', cols: 2,
    cards: [
      { id: 'blu-a', pairId: 'blu', emoji: '🫐', label: 'Blueberry', color: '#3949AB' },
      { id: 'blu-b', pairId: 'blu', emoji: '🫐', label: 'Blueberry', color: '#3949AB' },
      { id: 'kiv-a', pairId: 'kiv', emoji: '🥝', label: 'Kiwi',      color: '#558B2F' },
      { id: 'kiv-b', pairId: 'kiv', emoji: '🥝', label: 'Kiwi',      color: '#558B2F' },
      { id: 'pea-a', pairId: 'pea', emoji: '🍑', label: 'Peach',     color: '#FF8A65' },
      { id: 'pea-b', pairId: 'pea', emoji: '🍑', label: 'Peach',     color: '#FF8A65' },
    ],
  },
  {
    id: 6, title: 'Fruit Champion', instruction: 'You are a fruit expert!', mascot: 'Grapes', cols: 2,
    cards: [
      { id: 'av-a',  pairId: 'av',  emoji: '🥑', label: 'Avocado',    color: '#558B2F' },
      { id: 'av-b',  pairId: 'av',  emoji: '🥑', label: 'Avocado',    color: '#558B2F' },
      { id: 'mel-a', pairId: 'mel', emoji: '🍈', label: 'Melon',      color: '#FF7043' },
      { id: 'mel-b', pairId: 'mel', emoji: '🍈', label: 'Melon',      color: '#FF7043' },
      { id: 'fig-a', pairId: 'fig', emoji: '🍇', label: 'Fig',        color: '#6A1B9A' },
      { id: 'fig-b', pairId: 'fig', emoji: '🍇', label: 'Fig',        color: '#6A1B9A' },
    ],
  },
  {
    id: 7, title: 'Juicy Picks', instruction: 'Match the juicy fruits!', mascot: 'Watermelon', cols: 2,
    cards: [
      { id: 'wam-a', pairId: 'wam', emoji: '🍉', label: 'Watermelon', color: '#E53935' },
      { id: 'wam-b', pairId: 'wam', emoji: '🍉', label: 'Watermelon', color: '#E53935' },
      { id: 'plu-a', pairId: 'plu', emoji: '🍑', label: 'Plum',       color: '#6A1B9A' },
      { id: 'plu-b', pairId: 'plu', emoji: '🍑', label: 'Plum',       color: '#6A1B9A' },
      { id: 'tan-a', pairId: 'tan', emoji: '🍊', label: 'Tangerine',  color: '#FB8C00' },
      { id: 'tan-b', pairId: 'tan', emoji: '🍊', label: 'Tangerine',  color: '#FB8C00' },
    ],
  },
  {
    id: 8, title: 'Orchard Fun', instruction: 'Find the orchard pairs!', mascot: 'Orange', cols: 2,
    cards: [
      { id: 'grn-a', pairId: 'grn', emoji: '🍏', label: 'Green Apple', color: '#43A047' },
      { id: 'grn-b', pairId: 'grn', emoji: '🍏', label: 'Green Apple', color: '#43A047' },
      { id: 'chr-a', pairId: 'chr', emoji: '🍒', label: 'Cherry',      color: '#C62828' },
      { id: 'chr-b', pairId: 'chr', emoji: '🍒', label: 'Cherry',      color: '#C62828' },
      { id: 'pyr-a', pairId: 'pyr', emoji: '🍐', label: 'Pear',        color: '#F9A825' },
      { id: 'pyr-b', pairId: 'pyr', emoji: '🍐', label: 'Pear',        color: '#F9A825' },
    ],
  },
  {
    id: 9, title: 'Fruit Master', instruction: 'Match them all — you\'re a master!', mascot: 'Banana', cols: 2,
    cards: [
      { id: 'kwi-a', pairId: 'kwi', emoji: '🥝', label: 'Kiwi',       color: '#558B2F' },
      { id: 'kwi-b', pairId: 'kwi', emoji: '🥝', label: 'Kiwi',       color: '#558B2F' },
      { id: 'fig2-a', pairId: 'fig2', emoji: '🫐', label: 'Blueberry', color: '#3949AB' },
      { id: 'fig2-b', pairId: 'fig2', emoji: '🫐', label: 'Blueberry', color: '#3949AB' },
      { id: 'bn2-a', pairId: 'bn2', emoji: '🍌', label: 'Banana',     color: '#F9A825' },
      { id: 'bn2-b', pairId: 'bn2', emoji: '🍌', label: 'Banana',     color: '#F9A825' },
    ],
  },
];

export default LEVELS;
