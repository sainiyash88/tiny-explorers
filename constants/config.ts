export type ActivityId = 'tracing' | 'puzzles' | 'matching' | 'braingym';

export interface ChapterConfig {
  id: number;
  title: string;
  levelCount: number;
  free: boolean;
  /** For paid chapters: asset bundle key used for remote download */
  assetKey?: string;
  /** Optional label shown on chapter card, e.g. "2 pieces" */
  badge?: string;
}

export interface ActivityConfig {
  id: ActivityId;
  title: string;
  emoji: string;
  description: string;
  chapters: ChapterConfig[];
}

export const ACTIVITIES: ActivityConfig[] = [
  {
    id: 'tracing',
    title: 'Tracing World',
    emoji: '✏️',
    description: 'Trace paths with your finger!',
    chapters: [
      { id: 1, title: 'Shapes', levelCount: 12, free: true },
      { id: 2, title: 'Letters A–Z', levelCount: 26, free: false, assetKey: 'tracing_ch2' },
      { id: 3, title: 'Small Letters a–z', levelCount: 26, free: false, assetKey: 'tracing_ch3' },
      { id: 4, title: 'Numbers 0–9', levelCount: 10, free: false, assetKey: 'tracing_ch4' },
      { id: 5, title: 'Animals', levelCount: 9, free: false, assetKey: 'tracing_ch5' },
    ],
  },
  {
    id: 'puzzles',
    title: 'Puzzle Park',
    emoji: '🧩',
    description: 'Put the pieces together!',
    chapters: [
      { id: 1, title: '🍎 Fruits', levelCount: 15, free: true, badge: '2 pieces' },
      { id: 2, title: '🥕 Vegetables', levelCount: 12, free: false, badge: '3 pieces' },
      { id: 3, title: '🐘 Animals', levelCount: 9, free: false, badge: '4 pieces' },
      { id: 4, title: '🚗 Vehicles', levelCount: 9, free: false, badge: '6 pieces' },
    ],
  },
  {
    id: 'matching',
    title: 'Match It!',
    emoji: '🃏',
    description: 'Find the matching pairs!',
    chapters: [
      { id: 1, title: 'Animals',  levelCount: 9, free: true,  badge: '2×2 grid' },
      { id: 2, title: 'Fruits',   levelCount: 9, free: false, assetKey: 'matching_ch2', badge: '2×3 grid' },
      { id: 3, title: 'Vehicles', levelCount: 6, free: false, assetKey: 'matching_ch3', badge: '2×4 grid' },
      { id: 4, title: 'Emotions', levelCount: 6, free: false, assetKey: 'matching_ch4', badge: '3×4 grid' },
    ],
  },
  {
    id: 'braingym',
    title: 'Brain Gym',
    emoji: '🧠',
    description: 'Think and solve!',
    chapters: [
      { id: 1, title: 'Brain Warm Up', levelCount: 12, free: true },
      { id: 2, title: 'Basic Patterns', levelCount: 9, free: false, assetKey: 'braingym_ch2' },
      { id: 3, title: 'Brain Match', levelCount: 12, free: false, assetKey: 'braingym_ch3' },
      { id: 4, title: 'Mixed Challenge', levelCount: 9, free: false, assetKey: 'braingym_ch4' },
    ],
  },
];

/** RevenueCat product identifier */
export const IAP_PRODUCT_ID = 'tinyexplorers_full_access';
/** RevenueCat entitlement identifier */
export const IAP_ENTITLEMENT_ID = 'premium';
/** RevenueCat Android public SDK key */
export const REVENUECAT_ANDROID_KEY = 'goog_evpYfObnMVhmeTnGmWhXYfpbiyU';

/** Tracing tolerance: max px a finger can stray from path before nudge */
export const TRACING_TOLERANCE_PX = 30;
