import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ActivityId } from '@/constants/config';

interface LevelProgress {
  completed: boolean;
  stars: number; // 1–3
}

type ActivityProgress = Record<string, LevelProgress>; // key: `ch${chapter}_lv${level}`

interface ProgressState {
  progress: Record<ActivityId, ActivityProgress>;
  markComplete: (activity: ActivityId, chapter: number, level: number, stars: number) => void;
  isComplete: (activity: ActivityId, chapter: number, level: number) => boolean;
  getStars: (activity: ActivityId, chapter: number, level: number) => number;
  chapterProgress: (activity: ActivityId, chapter: number, totalLevels: number) => number;
  loadProgress: () => Promise<void>;
}

const STORAGE_KEY = 'kids_progress_v1';

const levelKey = (chapter: number, level: number) => `ch${chapter}_lv${level}`;

const emptyActivity = (): ActivityProgress => ({});

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {
    tracing: emptyActivity(),
    puzzles: emptyActivity(),
    matching: emptyActivity(),
    braingym: emptyActivity(),
  },

  markComplete: (activity, chapter, level, stars) => {
    const key = levelKey(chapter, level);
    const existing = get().progress[activity][key];
    // Only update if new stars are higher
    if (existing && existing.stars >= stars) return;

    const updated = {
      ...get().progress,
      [activity]: {
        ...get().progress[activity],
        [key]: { completed: true, stars },
      },
    };
    set({ progress: updated });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => null);
  },

  isComplete: (activity, chapter, level) => {
    return get().progress[activity][levelKey(chapter, level)]?.completed ?? false;
  },

  getStars: (activity, chapter, level) => {
    return get().progress[activity][levelKey(chapter, level)]?.stars ?? 0;
  },

  chapterProgress: (activity, chapter, totalLevels) => {
    const actProgress = get().progress[activity];
    let completed = 0;
    for (let i = 1; i <= totalLevels; i++) {
      if (actProgress[levelKey(chapter, i)]?.completed) completed++;
    }
    return totalLevels > 0 ? completed / totalLevels : 0;
  },

  loadProgress: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        set({ progress: { ...get().progress, ...saved } });
      }
    } catch {
      // corrupted storage — start fresh
    }
  },
}));
