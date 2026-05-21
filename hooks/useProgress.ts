import { useProgressStore } from '@/store/progressStore';
import type { ActivityId } from '@/constants/config';

export function useProgress(activity: ActivityId, chapter: number) {
  const markComplete = useProgressStore((s) => s.markComplete);
  const isComplete = useProgressStore((s) => s.isComplete);
  const getStars = useProgressStore((s) => s.getStars);

  return {
    markComplete: (level: number, stars: number) =>
      markComplete(activity, chapter, level, stars),
    isComplete: (level: number) => isComplete(activity, chapter, level),
    getStars: (level: number) => getStars(activity, chapter, level),
  };
}
