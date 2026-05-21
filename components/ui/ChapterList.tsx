import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { useEntitlementStore } from '@/store/entitlementStore';
import { useProgressStore } from '@/store/progressStore';
import type { ActivityId, ActivityConfig } from '@/constants/config';

interface Props {
  activity: ActivityConfig;
}

export default function ChapterList({ activity }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isPremium = useEntitlementStore((s) => s.isPremium);
  const canAccess = (free: boolean) => free || isPremium;
  const chapterProgress = useProgressStore((s) => s.chapterProgress);

  const handleChapterPress = (chapterId: number, free: boolean) => {
    if (!canAccess(free)) {
      router.push('/paywall');
      return;
    }
    router.push(`/${activity.id}/${chapterId}`);
  };

  return (
    <View style={styles.container}>
      {activity.chapters.map((chapter) => {
        const accessible = canAccess(chapter.free);
        const progress = chapterProgress(activity.id, chapter.id, chapter.levelCount);
        const pct = Math.round(progress * 100);

        return (
          <TouchableOpacity
            key={chapter.id}
            style={[
              styles.card,
              isTablet && styles.cardTablet,
              !accessible && styles.cardLocked,
            ]}
            onPress={() => handleChapterPress(chapter.id, chapter.free)}
            activeOpacity={0.8}
          >
            <View style={styles.row}>
              <Text style={styles.chapterNum}>Ch {chapter.id}</Text>
              <Text style={[styles.title, !accessible && styles.titleLocked]}>
                {chapter.title}
              </Text>
              {chapter.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>🧩 {chapter.badge}</Text>
                </View>
              )}
              {!accessible && <Text style={styles.lock}>🔒</Text>}
            </View>
            {accessible && (
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${pct}%` }]} />
              </View>
            )}
            {accessible && (
              <Text style={styles.progressText}>{pct}% complete</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.md },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.md,
    padding: Spacing.md,
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTablet: { padding: Spacing.lg },
  cardLocked: { backgroundColor: Colors.locked, opacity: 0.7 },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  chapterNum: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    fontWeight: '600',
    width: 44,
  },
  title: { flex: 1, fontSize: FontSizes.md, color: Colors.textPrimary, fontWeight: '700' },
  titleLocked: { color: Colors.lockedText },
  lock: { fontSize: FontSizes.md },
  badge: {
    backgroundColor: '#EEF4FF',
    borderRadius: Radii.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    color: '#5B7FD4',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.locked,
    borderRadius: Radii.full,
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radii.full,
  },
  progressText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
