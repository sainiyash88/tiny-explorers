import { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import AnimalCartoon from '@/components/ui/animals/AnimalCartoon';

// ─── Confetti ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B', '#CC5DE8', '#4ECDC4'];
const SHAPES = ['square', 'circle', 'rect'] as const;

interface ConfettiPiece {
  x: number; color: string; shape: typeof SHAPES[number];
  size: number; duration: number; delay: number; wobble: number;
}

function buildConfetti(count: number, width: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    size: 7 + Math.random() * 9,
    duration: 1400 + Math.random() * 800,
    delay: Math.random() * 600,
    wobble: (Math.random() - 0.5) * 60,
  }));
}

function ConfettiPieceView({ p }: { p: ConfettiPiece }) {
  const y = useSharedValue(-30);
  const x = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    y.value = withDelay(p.delay, withTiming(720, { duration: p.duration, easing: Easing.in(Easing.quad) }));
    x.value = withDelay(p.delay, withTiming(p.wobble, { duration: p.duration }));
    rotate.value = withDelay(p.delay, withTiming(360 * (Math.random() > 0.5 ? 1 : -1), { duration: p.duration }));
    opacity.value = withDelay(p.delay + p.duration * 0.65, withTiming(0, { duration: p.duration * 0.35 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute', left: p.x, top: 0,
    width: p.shape === 'rect' ? p.size * 0.5 : p.size,
    height: p.shape === 'rect' ? p.size * 1.6 : p.size,
    borderRadius: p.shape === 'circle' ? p.size : 2,
    backgroundColor: p.color,
    opacity: opacity.value,
    transform: [{ translateY: y.value }, { translateX: x.value }, { rotate: `${rotate.value}deg` }],
  }));

  return <Animated.View style={style} />;
}

// ─── Sparkle badge ───────────────────────────────────────────────────────────

function SparkleEmoji({ emoji, delay, size = 32 }: { emoji: string; delay: number; size?: number }) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(-20);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 8, stiffness: 280 }));
    rotate.value = withDelay(delay, withSpring(0, { damping: 10, stiffness: 200 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return <Animated.Text style={[{ fontSize: size }, style]}>{emoji}</Animated.Text>;
}

function CelebrationBadge() {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(15);

  useEffect(() => {
    scale.value = withDelay(120, withSequence(
      withSpring(1.25, { damping: 5, stiffness: 320 }),
      withSpring(1, { damping: 10, stiffness: 200 }),
    ));
    rotate.value = withDelay(120, withSpring(0, { damping: 8, stiffness: 180 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.badgeRow}>
      <SparkleEmoji emoji="✨" delay={320} size={28} />
      <Animated.Text style={[styles.badgeEmoji, style]}>🏅</Animated.Text>
      <SparkleEmoji emoji="✨" delay={440} size={28} />
    </View>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const MESSAGES = [
  'Amazing work! 🎉',
  'You nailed it! 🙌',
  'Brilliant! 💡',
  'Superstar! 🌟',
  'Fantastic! 🚀',
];

interface Props {
  visible: boolean;
  stars?: number; // kept for API compat, unused
  onNext: () => void;
  onRetry: () => void;
  onSelectLevel: () => void;
  isLastLevel: boolean;
  mascot?: string;
}

export default function RewardOverlay({ visible, onNext, onRetry, onSelectLevel, isLastLevel, mascot }: Props) {
  const { width } = useWindowDimensions();
  const confetti = useMemo(() => buildConfetti(45, width), [width]);
  const message = useMemo(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)], [visible]);

  const backdropOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.72);
  const cardOpacity = useSharedValue(0);
  const cardY = useSharedValue(40);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.ease) });
      cardOpacity.value = withTiming(1, { duration: 220 });
      cardY.value = withSpring(0, { damping: 18, stiffness: 260 });
      cardScale.value = withSpring(1, { damping: 11, stiffness: 240 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 180 });
      cardOpacity.value = withTiming(0, { duration: 160 });
      cardScale.value = withTiming(0.72, { duration: 160 });
      cardY.value = withTiming(40, { duration: 160 });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdropOpacity.value }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }, { scale: cardScale.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.backdrop, backdropStyle]}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {confetti.map((p, i) => <ConfettiPieceView key={i} p={p} />)}
      </View>

      <Animated.View style={[styles.card, cardStyle]}>
        {/* Header band */}
        <View style={styles.headerBand}>
          {mascot && <AnimalCartoon name={mascot} size={80} />}
          <Text style={styles.headerText}>{message}</Text>
        </View>

        {/* Badge celebration */}
        <View style={styles.celebrationArea}>
          <CelebrationBadge />
          <View style={styles.sparkleRow}>
            <SparkleEmoji emoji="🌟" delay={500} size={24} />
            <SparkleEmoji emoji="💫" delay={600} size={24} />
            <SparkleEmoji emoji="⚡" delay={700} size={24} />
            <SparkleEmoji emoji="💫" delay={800} size={24} />
            <SparkleEmoji emoji="🌟" delay={900} size={24} />
          </View>
        </View>

        {/* Next button */}
        <TouchableOpacity style={styles.nextBtn} onPress={onNext} activeOpacity={0.82}>
          <Text style={styles.nextText}>
            {isLastLevel ? '🏆  Chapter Done!' : 'Next Level  →'}
          </Text>
        </TouchableOpacity>

        {/* Secondary actions */}
        <View style={styles.secondaryRow}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={onRetry} activeOpacity={0.7}>
            <Text style={styles.secondaryText}>↺  Try Again</Text>
          </TouchableOpacity>
          <View style={styles.dot} />
          <TouchableOpacity style={styles.secondaryBtn} onPress={onSelectLevel} activeOpacity={0.7}>
            <Text style={styles.secondaryText}>☰  All Levels</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,30,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    width: 320,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
    elevation: 20,
  },
  headerBand: {
    backgroundColor: '#6BCB77',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    alignItems: 'center',
    gap: 6,
  },
  headerText: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.4,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  celebrationArea: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
    backgroundColor: '#FAFAFA',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badgeEmoji: {
    fontSize: 72,
  },
  sparkleRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  nextBtn: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radii.full,
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    backgroundColor: '#6BCB77',
  },
  nextText: {
    fontSize: FontSizes.md,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  secondaryBtn: {
    paddingHorizontal: Spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  dot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: Colors.locked,
  },
});
