import type { MatchLevel } from './chapter1';

const LEVELS: MatchLevel[] = [
  {
    id: 1, title: 'Road Vehicles', instruction: 'Match the vehicles!', mascot: 'Car', cols: 2,
    cards: [
      { id: 'car-a', pairId: 'car', emoji: '🚗', label: 'Car',       color: '#E53935' },
      { id: 'car-b', pairId: 'car', emoji: '🚗', label: 'Car',       color: '#E53935' },
      { id: 'bus-a', pairId: 'bus', emoji: '🚌', label: 'Bus',       color: '#F9A825' },
      { id: 'bus-b', pairId: 'bus', emoji: '🚌', label: 'Bus',       color: '#F9A825' },
      { id: 'trk-a', pairId: 'trk', emoji: '🚚', label: 'Truck',     color: '#1565C0' },
      { id: 'trk-b', pairId: 'trk', emoji: '🚚', label: 'Truck',     color: '#1565C0' },
      { id: 'bik-a', pairId: 'bik', emoji: '🚲', label: 'Bicycle',   color: '#2E7D32' },
      { id: 'bik-b', pairId: 'bik', emoji: '🚲', label: 'Bicycle',   color: '#2E7D32' },
    ],
  },
  {
    id: 2, title: 'Sky & Sea', instruction: 'Find the sky and sea vehicles!', mascot: 'Airplane', cols: 2,
    cards: [
      { id: 'air-a', pairId: 'air', emoji: '✈️', label: 'Airplane',  color: '#0288D1' },
      { id: 'air-b', pairId: 'air', emoji: '✈️', label: 'Airplane',  color: '#0288D1' },
      { id: 'shi-a', pairId: 'shi', emoji: '🚢', label: 'Ship',      color: '#00838F' },
      { id: 'shi-b', pairId: 'shi', emoji: '🚢', label: 'Ship',      color: '#00838F' },
      { id: 'hel-a', pairId: 'hel', emoji: '🚁', label: 'Helicopter',color: '#E65100' },
      { id: 'hel-b', pairId: 'hel', emoji: '🚁', label: 'Helicopter',color: '#E65100' },
      { id: 'roc-a', pairId: 'roc', emoji: '🚀', label: 'Rocket',    color: '#6A1B9A' },
      { id: 'roc-b', pairId: 'roc', emoji: '🚀', label: 'Rocket',    color: '#6A1B9A' },
    ],
  },
  {
    id: 3, title: 'Emergency!', instruction: 'Match the emergency vehicles!', mascot: 'Ambulance', cols: 2,
    cards: [
      { id: 'amb-a', pairId: 'amb', emoji: '🚑', label: 'Ambulance',    color: '#E53935' },
      { id: 'amb-b', pairId: 'amb', emoji: '🚑', label: 'Ambulance',    color: '#E53935' },
      { id: 'fir-a', pairId: 'fir', emoji: '🚒', label: 'Fire Engine',  color: '#FF6F00' },
      { id: 'fir-b', pairId: 'fir', emoji: '🚒', label: 'Fire Engine',  color: '#FF6F00' },
      { id: 'pol-a', pairId: 'pol', emoji: '🚓', label: 'Police Car',   color: '#1565C0' },
      { id: 'pol-b', pairId: 'pol', emoji: '🚓', label: 'Police Car',   color: '#1565C0' },
      { id: 'hel-a', pairId: 'hel', emoji: '🚁', label: 'Helicopter',   color: '#2E7D32' },
      { id: 'hel-b', pairId: 'hel', emoji: '🚁', label: 'Helicopter',   color: '#2E7D32' },
    ],
  },
  {
    id: 4, title: 'Two Wheels', instruction: 'Find the two-wheel vehicles!', mascot: 'Motorbike', cols: 2,
    cards: [
      { id: 'mot-a', pairId: 'mot', emoji: '🏍️', label: 'Motorbike',  color: '#E65100' },
      { id: 'mot-b', pairId: 'mot', emoji: '🏍️', label: 'Motorbike',  color: '#E65100' },
      { id: 'sco-a', pairId: 'sco', emoji: '🛵', label: 'Scooter',    color: '#F9A825' },
      { id: 'sco-b', pairId: 'sco', emoji: '🛵', label: 'Scooter',    color: '#F9A825' },
      { id: 'cyc-a', pairId: 'cyc', emoji: '🚴', label: 'Cycling',    color: '#2E7D32' },
      { id: 'cyc-b', pairId: 'cyc', emoji: '🚴', label: 'Cycling',    color: '#2E7D32' },
      { id: 'kic-a', pairId: 'kic', emoji: '🛴', label: 'Kid Scooter', color: '#6A1B9A' },
      { id: 'kic-b', pairId: 'kic', emoji: '🛴', label: 'Kid Scooter', color: '#6A1B9A' },
    ],
  },
  {
    id: 5, title: 'Construction', instruction: 'Match the construction vehicles!', mascot: 'Tractor', cols: 2,
    cards: [
      { id: 'bul-a', pairId: 'bul', emoji: '🚜', label: 'Tractor',    color: '#F9A825' },
      { id: 'bul-b', pairId: 'bul', emoji: '🚜', label: 'Tractor',    color: '#F9A825' },
      { id: 'exc-a', pairId: 'exc', emoji: '🏗️', label: 'Crane',      color: '#1565C0' },
      { id: 'exc-b', pairId: 'exc', emoji: '🏗️', label: 'Crane',      color: '#1565C0' },
      { id: 'jcb-a', pairId: 'jcb', emoji: '🚧', label: 'JCB', color: '#E65100', svgKey: 'jcb' },
      { id: 'jcb-b', pairId: 'jcb', emoji: '🚧', label: 'JCB', color: '#E65100', svgKey: 'jcb' },
      { id: 'trk-a', pairId: 'trk', emoji: '🚛', label: 'Truck',       color: '#37474F' },
      { id: 'trk-b', pairId: 'trk', emoji: '🚛', label: 'Truck',       color: '#37474F' },
    ],
  },
  {
    id: 6, title: 'Vehicle Master', instruction: 'You know all vehicles!', mascot: 'Rocket', cols: 2,
    cards: [
      { id: 'sub-a', pairId: 'sub', emoji: '🚇', label: 'Metro',      color: '#5C6BC0' },
      { id: 'sub-b', pairId: 'sub', emoji: '🚇', label: 'Metro',      color: '#5C6BC0' },
      { id: 'tra-a', pairId: 'tra', emoji: '🚂', label: 'Train',       color: '#558B2F' },
      { id: 'tra-b', pairId: 'tra', emoji: '🚂', label: 'Train',       color: '#558B2F' },
      { id: 'rac-a', pairId: 'rac', emoji: '🏎️', label: 'Race Car',   color: '#E53935' },
      { id: 'rac-b', pairId: 'rac', emoji: '🏎️', label: 'Race Car',   color: '#E53935' },
      { id: 'fer-a', pairId: 'fer', emoji: '⛵', label: 'Sailboat',   color: '#26C6DA' },
      { id: 'fer-b', pairId: 'fer', emoji: '⛵', label: 'Sailboat',   color: '#26C6DA' },
    ],
  },
];

export default LEVELS;
