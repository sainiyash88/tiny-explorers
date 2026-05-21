import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import PuzzleBoard from '@/components/puzzles/PuzzleBoard';
import RewardOverlay from '@/components/ui/RewardOverlay';
import { useProgress } from '@/hooks/useProgress';
import { useSound } from '@/hooks/useSound';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MascotGuide from '@/components/ui/MascotGuide';
import CHAPTER1_LEVELS from '@/content/puzzles/chapter1';
import CHAPTER2_LEVELS from '@/content/puzzles/chapter2';
import CHAPTER3_LEVELS from '@/content/puzzles/chapter3';
import CHAPTER4_LEVELS from '@/content/puzzles/chapter4';
import PUZZLE_IMAGES from '@/assets/images/puzzles';

const CHAPTER_CONTENT: Record<number, typeof CHAPTER1_LEVELS> = {
  1: CHAPTER1_LEVELS,
  2: CHAPTER2_LEVELS,
  3: CHAPTER3_LEVELS,
  4: CHAPTER4_LEVELS,
};

export default function PuzzlesLevel() {
  const { chapter, level } = useLocalSearchParams<{ chapter: string; level: string }>();
  const chapterNum = parseInt(chapter, 10);
  const levelNum = parseInt(level, 10);

  useBackgroundMusic('activity');
  const { markComplete } = useProgress('puzzles', chapterNum);
  const { playSuccess, playFail } = useSound();
  const levels = CHAPTER_CONTENT[chapterNum];
  const levelData = levels?.find((l) => l.id === levelNum);

  useEffect(() => {
    if (!levelData) return;
    Speech.speak(' ', { rate: 0.75, pitch: 1.1 });
    const warmup = setTimeout(() => Speech.stop(), 150);
    const speak = setTimeout(() => {
      Speech.speak(levelData.instruction, { rate: 0.75, pitch: 1.1 });
    }, 600);
    return () => {
      clearTimeout(warmup);
      clearTimeout(speak);
      Speech.stop();
    };
  }, [levelNum, levelData]);

  const [showReward, setShowReward] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  const completionScale = useRef(new Animated.Value(0.2)).current;
  const completionOpacity = useRef(new Animated.Value(0)).current;

  const handleComplete = useCallback(() => {
    if (!levelData) return;
    markComplete(levelNum, 1);

    // Show assembled animal
    setShowCompletion(true);
    completionScale.setValue(0.2);
    completionOpacity.setValue(0);

    Speech.speak(levelData.title, { rate: 0.75, pitch: 1.1 });

    Animated.parallel([
      Animated.spring(completionScale, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(completionOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.timing(completionOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setShowCompletion(false);
        playSuccess();
        setShowReward(true);
      });
    }, 2000);
  }, [levelNum, levelData, markComplete, playSuccess]);

  const handleNext = useCallback(() => {
    setShowReward(false);
    const nextLevel = levelNum + 1;
    const hasNext = levels && nextLevel <= levels.length;
    if (hasNext) {
      router.replace(`/puzzles/level?chapter=${chapterNum}&level=${nextLevel}`);
    } else {
      router.back();
    }
  }, [levelNum, chapterNum, levels]);

  const handleRetry = useCallback(() => {
    setShowReward(false);
    setBoardKey((k) => k + 1);
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
      <MascotGuide activity="puzzles" size={70} position="top-right" />
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.titleArea} pointerEvents="none">
          <Text style={styles.animal}>{levelData.animal}</Text>
          <Text style={styles.levelLabel}>{levelData.title}</Text>
        </View>
      </View>

      <View style={styles.instructionBar}>
        <Text style={styles.instruction}>{levelData.instruction}</Text>
      </View>

      <PuzzleBoard
        key={boardKey}
        puzzle={levelData}
        onComplete={handleComplete}
        onWrongDrop={playFail}
      />

      {/* Assembled animal reveal */}
      {showCompletion && (
        <Animated.View style={[styles.completionOverlay, { opacity: completionOpacity }]}>
          <Animated.View style={{ transform: [{ scale: completionScale }], alignItems: 'center' }}>
            <Image
              source={PUZZLE_IMAGES[levelData.imageKey]}
              style={styles.completionImage}
              resizeMode="contain"
            />
            <Text style={styles.completionTitle}>{levelData.title}!</Text>
          </Animated.View>
        </Animated.View>
      )}

      <RewardOverlay
        visible={showReward}
        onNext={handleNext}
        onRetry={handleRetry}
        onSelectLevel={() => router.back()}
        isLastLevel={isLastLevel}
        mascot="elephant"
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
    width: MIN_TAP_TARGET, height: MIN_TAP_TARGET,
    borderRadius: Radii.full, backgroundColor: Colors.bgCard,
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon: { fontSize: FontSizes.lg, color: Colors.textPrimary },
  titleArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  animal: { fontSize: 32 },
  levelLabel: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.textPrimary },

  instructionBar: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.tilePuzzles,
    borderRadius: Radii.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  instruction: {
    fontSize: FontSizes.md, fontWeight: '700',
    color: Colors.white, textAlign: 'center',
  },

  completionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  completionImage: {
    width: 280,
    height: 280,
  },
  completionTitle: {
    marginTop: 16,
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
});
