import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import MatchGrid from '@/components/matching/MatchGrid';
import RewardOverlay from '@/components/ui/RewardOverlay';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MascotGuide from '@/components/ui/MascotGuide';
import CHAPTER1_LEVELS from '@/content/matching/chapter1';
import CHAPTER2_LEVELS from '@/content/matching/chapter2';
import CHAPTER3_LEVELS from '@/content/matching/chapter3';
import CHAPTER4_LEVELS from '@/content/matching/chapter4';

const CHAPTER_CONTENT: Record<number, typeof CHAPTER1_LEVELS> = {
  1: CHAPTER1_LEVELS,
  2: CHAPTER2_LEVELS,
  3: CHAPTER3_LEVELS,
  4: CHAPTER4_LEVELS,
};

export default function MatchingLevel() {
  const { chapter, level } = useLocalSearchParams<{ chapter: string; level: string }>();
  const chapterNum = parseInt(chapter, 10);
  const levelNum = parseInt(level, 10);

  useBackgroundMusic('activity');
  const { markComplete } = useProgress('matching', chapterNum);
  const { playSuccess, playFail } = useSound();
  const levels = CHAPTER_CONTENT[chapterNum];
  const levelData = levels?.find((l) => l.id === levelNum);

  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    if (!levelData) return;
    setGameReady(false);
    Speech.speak(' ', { rate: 0.75, pitch: 1.1 });
    const warmup = setTimeout(() => Speech.stop(), 150);
    const speak = setTimeout(() => {
      Speech.speak(levelData.instruction, {
        rate: 0.75, pitch: 1.1,
        onDone: () => setGameReady(true),
        onStopped: () => setGameReady(true),
        onError: () => setGameReady(true),
      });
    }, 600);
    return () => {
      clearTimeout(warmup);
      clearTimeout(speak);
      Speech.stop();
    };
  }, [levelNum, levelData]);

  const [showReward, setShowReward] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const [peekTrigger, setPeekTrigger] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);

  const handleComplete = useCallback(
    () => {
      markComplete(levelNum, 1);
      playSuccess();
      setShowReward(true);
    },
    [levelNum, markComplete, playSuccess]
  );

  const handleNext = useCallback(() => {
    setShowReward(false);
    const nextLevel = levelNum + 1;
    const hasNext = levels && nextLevel <= levels.length;
    if (hasNext) {
      router.replace(`/matching/level?chapter=${chapterNum}&level=${nextLevel}`);
    } else {
      router.back();
    }
  }, [levelNum, chapterNum, levels]);

  const handleRetry = useCallback(() => {
    setShowReward(false);
    setGridKey((k) => k + 1);
  }, []);

  if (!levelData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Level not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLastLevel = levels ? levelNum >= levels.length : true;

  return (
    <SafeAreaView style={styles.container}>
      <MascotGuide activity="matching" size={70} position="top-right" />
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.titleArea} pointerEvents="none">
          <Text style={styles.levelLabel}>{levelData.title}</Text>
        </View>
      </View>

      <View style={styles.instructionBar}>
        <Text style={styles.instruction}>{levelData.instruction}</Text>
      </View>

      <TouchableOpacity
        style={[styles.peekBtn, isPeeking && styles.peekBtnDisabled]}
        onPress={() => !isPeeking && setPeekTrigger((t) => t + 1)}
        activeOpacity={isPeeking ? 1 : 0.7}
      >
        <Text style={styles.peekBtnText}>👀 Peek at cards</Text>
      </TouchableOpacity>

      <MatchGrid
        key={gridKey}
        level={levelData}
        disabled={!gameReady}
        onComplete={handleComplete}
        onMismatch={playFail}
        peekTrigger={peekTrigger}
        onPeekingChange={setIsPeeking}
      />

      <RewardOverlay
        visible={showReward}
        onNext={handleNext}
        onRetry={handleRetry}
        onSelectLevel={() => router.back()}
        isLastLevel={isLastLevel}
        mascot="monkey"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgMain },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: FontSizes.md, color: Colors.textMuted },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: MIN_TAP_TARGET,
    height: MIN_TAP_TARGET,
    borderRadius: Radii.full,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: FontSizes.lg, color: Colors.textPrimary },
  titleArea: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  levelLabel: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.textPrimary },

  instructionBar: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.tileMatching,
    borderRadius: Radii.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  instruction: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  peekBtn: {
    alignSelf: 'center',
    marginTop: Spacing.sm,
    backgroundColor: '#FFF9C4',
    borderRadius: Radii.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#F9A825',
  },
  peekBtnDisabled: {
    opacity: 0.4,
  },
  peekBtnText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#7B6000',
  },
});
