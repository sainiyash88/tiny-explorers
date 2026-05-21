import { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { ACTIVITIES } from '@/constants/config';
import { useEntitlementStore } from '@/store/entitlementStore';
import { useProgress } from '@/hooks/useProgress';
import CHAPTER1_LEVELS from '@/content/puzzles/chapter1';
import CHAPTER2_LEVELS from '@/content/puzzles/chapter2';
import CHAPTER3_LEVELS from '@/content/puzzles/chapter3';
import CHAPTER4_LEVELS from '@/content/puzzles/chapter4';
import MascotGuide from '@/components/ui/MascotGuide';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import PUZZLE_IMAGES from '@/assets/images/puzzles';

const CHAPTER_CONTENT: Record<number, typeof CHAPTER1_LEVELS> = {
  1: CHAPTER1_LEVELS,
  2: CHAPTER2_LEVELS,
  3: CHAPTER3_LEVELS,
  4: CHAPTER4_LEVELS,
};

export default function PuzzlesChapter() {
  useBackgroundMusic('chapter');
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const chapterNum = parseInt(chapter, 10);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const canAccess = useEntitlementStore((s) => s.canAccessChapter);
  const { isComplete } = useProgress('puzzles', chapterNum);

  const activity = ACTIVITIES.find((a) => a.id === 'puzzles')!;
  const chapterConfig = activity.chapters.find((c) => c.id === chapterNum);

  useEffect(() => {
    if (!chapterConfig || !canAccess(chapterConfig.free)) {
      router.replace('/parent-gate?next=paywall');
    }
  }, [chapterNum]);

  if (!chapterConfig || !canAccess(chapterConfig.free)) return null;

  const levels = CHAPTER_CONTENT[chapterNum];
  if (!levels) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.comingSoon}>{'Chapter ' + chapterNum + ' coming soon!'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const cols = isTablet ? 4 : 3;
  const tileSize = (width - Spacing.lg * 2 - Spacing.sm * (cols - 1)) / cols;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <MascotGuide activity="puzzles" phrase="Pick a level!" />
      <View style={[styles.header, { backgroundColor: Colors.tilePuzzles }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{'🧩 ' + chapterConfig.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {levels.map((level) => {
          const done = isComplete(level.id);
          return (
            <TouchableOpacity
              key={level.id}
              style={[styles.tile, { width: tileSize, height: tileSize }, done && styles.tileDone]}
              onPress={() => router.push(`/puzzles/level?chapter=${chapterNum}&level=${level.id}`)}
              activeOpacity={0.8}
            >
              {PUZZLE_IMAGES[level.imageKey] ? (
                <Image
                  source={PUZZLE_IMAGES[level.imageKey]}
                  style={{ width: tileSize * 0.82, height: tileSize * 0.55 }}
                  resizeMode="contain"
                />
              ) : (
                <AnimalCartoon name={level.title} size={tileSize * 0.5} />
              )}
              <Text style={styles.tileTitle} numberOfLines={1}>{level.title}</Text>
              {done && <Text style={styles.doneMark}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgMain },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  comingSoon: { fontSize: FontSizes.lg, color: Colors.textMuted },
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    width: MIN_TAP_TARGET, height: MIN_TAP_TARGET,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon: { fontSize: FontSizes.lg, color: Colors.white },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.white },
  grid: { padding: Spacing.lg, flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  tile: {
    backgroundColor: Colors.bgCard, borderRadius: Radii.md,
    justifyContent: 'center', alignItems: 'center', gap: 4,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3, padding: Spacing.sm,
  },
  tileDone: { backgroundColor: '#E3F5FF', borderWidth: 2, borderColor: Colors.tilePuzzles },
  tileTitle: { fontSize: FontSizes.xs, color: Colors.textMuted, textAlign: 'center' },
  doneMark: { fontSize: 14, color: Colors.tilePuzzles, fontWeight: '800' },
});
