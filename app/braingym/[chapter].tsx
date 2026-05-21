import { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { ACTIVITIES } from '@/constants/config';
import { useEntitlementStore } from '@/store/entitlementStore';
import { useProgress } from '@/hooks/useProgress';
import CHAPTER1_LEVELS from '@/content/braingym/chapter1';
import CHAPTER2_LEVELS from '@/content/braingym/chapter2';
import CHAPTER3_LEVELS from '@/content/braingym/chapter3';
import CHAPTER4_LEVELS from '@/content/braingym/chapter4';
import MascotGuide from '@/components/ui/MascotGuide';
import BrainGymTileIcon from '@/components/braingym/BrainGymTileIcon';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

const CHAPTER_CONTENT: Record<number, typeof CHAPTER1_LEVELS> = {
  1: CHAPTER1_LEVELS,
  2: CHAPTER2_LEVELS,
  3: CHAPTER3_LEVELS,
  4: CHAPTER4_LEVELS,
};


export default function BrainGymChapter() {
  useBackgroundMusic('chapter');
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const chapterNum = parseInt(chapter, 10);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const canAccess = useEntitlementStore((s) => s.canAccessChapter);
  const { isComplete } = useProgress('braingym', chapterNum);

  const activity = ACTIVITIES.find((a) => a.id === 'braingym')!;
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
      <MascotGuide activity="braingym" phrase="Pick a level!" />
      <View style={[styles.header, { backgroundColor: Colors.tileBrainGym }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{'🧠 ' + chapterConfig.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {levels.map((level) => {
          const done = isComplete(level.id);
          return (
            <TouchableOpacity
              key={level.id}
              style={[styles.tile, { width: tileSize, height: tileSize }, done && styles.tileDone]}
              onPress={() => router.push(`/braingym/level?chapter=${chapterNum}&level=${level.id}`)}
              activeOpacity={0.8}
            >
              <BrainGymTileIcon level={level} size={tileSize * 0.5} />
              <Text style={styles.tileTitle} numberOfLines={2}>{level.title}</Text>
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
    width: MIN_TAP_TARGET,
    height: MIN_TAP_TARGET,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: FontSizes.lg, color: Colors.textPrimary },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.textPrimary },
  grid: { padding: Spacing.lg, flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  tile: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    padding: Spacing.sm,
  },
  tileDone: { backgroundColor: '#F0FFF4', borderWidth: 2, borderColor: Colors.tileBrainGym },
  tileTitle: { fontSize: FontSizes.xs, color: Colors.textMuted, textAlign: 'center' },
  doneMark: { fontSize: 14, color: Colors.tileBrainGym, fontWeight: '800' },
});
