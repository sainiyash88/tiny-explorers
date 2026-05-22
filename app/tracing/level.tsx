import { useCallback, useEffect, useRef, useState } from 'react';
import * as Speech from 'expo-speech';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import TracingCanvas, { type TracingCanvasHandle } from '@/components/tracing/TracingCanvas';
import RewardOverlay from '@/components/ui/RewardOverlay';
import { useProgress } from '@/hooks/useProgress';
import MascotGuide from '@/components/ui/MascotGuide';
import { useSound } from '@/hooks/useSound';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import CHAPTER1_LEVELS from '@/content/tracing/chapter1';
import CHAPTER2_LEVELS from '@/content/tracing/chapter2';
import CHAPTER3_LEVELS from '@/content/tracing/chapter3';
import CHAPTER4_LEVELS from '@/content/tracing/chapter4';
import CHAPTER5_LEVELS from '@/content/tracing/chapter5';
import { TRACING_TOLERANCE_PX } from '@/constants/config';

const CHAPTER_CONTENT: Record<number, typeof CHAPTER1_LEVELS> = {
  1: CHAPTER1_LEVELS,
  2: CHAPTER2_LEVELS,
  3: CHAPTER3_LEVELS,
  4: CHAPTER4_LEVELS,
  5: CHAPTER5_LEVELS,
};

export default function TracingLevel() {
  const { chapter, level } = useLocalSearchParams<{ chapter: string; level: string }>();
  const chapterNum = parseInt(chapter, 10);
  const levelNum = parseInt(level, 10);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  useBackgroundMusic('activity');
  const { markComplete } = useProgress('tracing', chapterNum);
  const { playSuccess, playFail } = useSound();

  const levels = CHAPTER_CONTENT[chapterNum];
  const levelData = levels?.find((l) => l.id === levelNum);

  const [showReward, setShowReward] = useState(false);
  const [tracingReady, setTracingReady] = useState(false);
  const offPathCount = useRef(0);

  const canvasRef = useRef<TracingCanvasHandle>(null);

  // Shake animation for instruction bar
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shakeBar = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -4, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  const resetCanvas = useCallback(() => {
    offPathCount.current = 0;
    canvasRef.current?.reset();
    setShowReward(false);
  }, []);

  const handleComplete = useCallback(() => {
    markComplete(levelNum, 1);
    playSuccess();
    setShowReward(true);
  }, [levelNum, markComplete, playSuccess]);

  const handleOffPath = useCallback(() => {
    offPathCount.current += 1;
    shakeBar();
  }, [shakeBar]);

  const handleNext = useCallback(() => {
    setShowReward(false);
    const nextLevel = levelNum + 1;
    const hasNext = levels && nextLevel <= levels.length;
    if (hasNext) {
      router.replace(`/tracing/level?chapter=${chapterNum}&level=${nextLevel}`);
    } else {
      router.back();
    }
  }, [levelNum, chapterNum, levels]);

  useEffect(() => {
    offPathCount.current = 0;
  }, [levelNum]);

  // Announce the level name when it loads; block tracing until speech finishes
  useEffect(() => {
    if (!levelData) return;
    setTracingReady(false);
    const raw = levelData.title;
    const spoken = raw.startsWith('Letter ') ? raw.slice(7)
                 : raw.startsWith('Number ') ? raw.slice(7)
                 : raw;
    const timer = setTimeout(() => {
      Speech.speak(spoken, {
        rate: 0.85,
        pitch: 1.1,
        onDone: () => setTracingReady(true),
        onStopped: () => setTracingReady(true),
        onError: () => setTracingReady(true),
      });
    }, 600);
    // Fallback: some Android TTS engines never fire callbacks — unlock after 4s max
    const fallback = setTimeout(() => setTracingReady(true), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      Speech.stop();
    };
  }, [levelData?.title]);

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
      <MascotGuide activity="tracing" size={70} position="top-right" />
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.levelLabel} pointerEvents="none">{'Level ' + levelNum}</Text>
      </View>

      <Animated.View
        style={[styles.instructionBar, { transform: [{ translateX: shakeAnim }] }]}
      >
        <Text style={isTablet ? styles.instructionTablet : styles.instruction}>
          {levelData.instruction}
        </Text>
      </Animated.View>

      <View style={styles.canvasArea}>
        <TracingCanvas
          ref={canvasRef}
          key={String(chapterNum) + '-' + String(levelNum)}
          level={levelData}
          tolerance={TRACING_TOLERANCE_PX}
          disabled={!tracingReady}
          onComplete={handleComplete}
          onOffPath={handleOffPath}
          onStrokeFail={playFail}
        />
      </View>

      <View style={styles.hintRow}>
        <View style={styles.hintDot} />
        <Text style={styles.hint}>Start</Text>
        <View style={styles.hintSpacer} />
        <View style={[styles.hintDot, levelData.closed ? null : styles.hintDotGreen]} />
        <Text style={styles.hint}>Finish</Text>
      </View>

      <RewardOverlay
        visible={showReward}
        onNext={handleNext}
        onRetry={resetCanvas}
        onSelectLevel={() => router.back()}
        isLastLevel={isLastLevel}
        mascot="giraffe"
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
  levelLabel: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },

  instructionBar: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primaryLight,
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
  instructionTablet: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },

  canvasArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },

  hintRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.lg,
    gap: 4,
  },
  hintDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.secondary,
  },
  hintDotGreen: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
  },
  hintSpacer: { width: Spacing.xl, height: 1 },
  hint: { fontSize: FontSizes.sm, color: Colors.textMuted, fontWeight: '600' },
});
