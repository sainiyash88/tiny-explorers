import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import PatternGame from '@/components/braingym/PatternGame';
import MissingGame from '@/components/braingym/MissingGame';
import BigSmallGame from '@/components/braingym/BigSmallGame';
import OppositeGame from '@/components/braingym/OppositeGame';
import CountGame from '@/components/braingym/CountGame';
import MoreLessGame from '@/components/braingym/MoreLessGame';
import MatchFollowGame from '@/components/braingym/MatchFollowGame';
import OddOneOutGame from '@/components/braingym/OddOneOutGame';
import FindDiffGame from '@/components/braingym/FindDiffGame';
import MazeGame from '@/components/braingym/MazeGame';
import FindColorGame from '@/components/braingym/FindColorGame';
import RewardOverlay from '@/components/ui/RewardOverlay';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MascotGuide from '@/components/ui/MascotGuide';
import CHAPTER1_LEVELS from '@/content/braingym/chapter1';
import CHAPTER2_LEVELS from '@/content/braingym/chapter2';
import CHAPTER3_LEVELS from '@/content/braingym/chapter3';
import CHAPTER4_LEVELS from '@/content/braingym/chapter4';

const CHAPTER_CONTENT: Record<number, typeof CHAPTER1_LEVELS> = {
  1: CHAPTER1_LEVELS,
  2: CHAPTER2_LEVELS,
  3: CHAPTER3_LEVELS,
  4: CHAPTER4_LEVELS,
};

export default function BrainGymLevel() {
  const { chapter, level } = useLocalSearchParams<{ chapter: string; level: string }>();
  const chapterNum = parseInt(chapter, 10);
  const levelNum = parseInt(level, 10);

  useBackgroundMusic('activity');
  const { markComplete } = useProgress('braingym', chapterNum);
  const { playSuccess, playFail } = useSound();
  const levels = CHAPTER_CONTENT[chapterNum];
  const levelData = levels?.find((l) => l.id === levelNum);

  const [showReward, setShowReward] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    setGameReady(false);
    Speech.speak(' ', { rate: 0.75, pitch: 1.1 });
    const warmup = setTimeout(() => Speech.stop(), 150);
    const speak = setTimeout(() => {
      if (levelData) Speech.speak(levelData.instruction, {
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
  }, [levelNum]);

  const handleComplete = useCallback(
    (correct: boolean) => {
      if (correct) {
        markComplete(levelNum, 1);
        playSuccess();
        setShowReward(true);
      } else {
        playFail();
        setTimeout(() => setGameKey((k) => k + 1), 900);
      }
    },
    [levelNum, markComplete, playSuccess, playFail]
  );

  const handleNext = useCallback(() => {
    setShowReward(false);
    const nextLevel = levelNum + 1;
    const hasNext = levels && nextLevel <= levels.length;
    if (hasNext) {
      router.replace(`/braingym/level?chapter=${chapterNum}&level=${nextLevel}`);
    } else {
      router.back();
    }
  }, [levelNum, chapterNum, levels]);

  const handleRetry = useCallback(() => {
    setShowReward(false);
    setGameKey((k) => k + 1);
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

  function renderGame() {
    if (!levelData) return null;
    const gameProps = { key: gameKey, level: levelData, disabled: !gameReady, onComplete: handleComplete };
    if (levelData.type === 'pattern')    return <PatternGame    {...gameProps} />;
    if (levelData.type === 'missing')    return <MissingGame    {...gameProps} />;
    if (levelData.type === 'bigsmall')   return <BigSmallGame   {...gameProps} />;
    if (levelData.type === 'opposite')   return <OppositeGame   {...gameProps} />;
    if (levelData.type === 'count')      return <CountGame      {...gameProps} />;
    if (levelData.type === 'moreless')   return <MoreLessGame   {...gameProps} />;
    if (levelData.type === 'matchfollow') return <MatchFollowGame {...gameProps} />;
    if (levelData.type === 'oddoneout')  return <OddOneOutGame  {...gameProps} />;
    if (levelData.type === 'finddiff')   return <FindDiffGame   {...gameProps} />;
    if (levelData.type === 'maze')       return <MazeGame       {...gameProps} />;
    if (levelData.type === 'findcolor')  return <FindColorGame  {...gameProps} />;
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MascotGuide activity="braingym" size={70} position="top-right" />
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

      {renderGame()}

      <RewardOverlay
        visible={showReward}
        onNext={handleNext}
        onRetry={handleRetry}
        onSelectLevel={() => router.back()}
        isLastLevel={isLastLevel}
        mascot="lion"
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
    backgroundColor: Colors.tileBrainGym,
    borderRadius: Radii.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  instruction: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});
