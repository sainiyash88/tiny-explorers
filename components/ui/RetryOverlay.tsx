import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';

interface Props {
  visible: boolean;
  onRetry: () => void;
  onSelectLevel: () => void;
}

export default function RetryOverlay({ visible, onRetry, onSelectLevel }: Props) {
  const bgOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      bgOpacity.value = withTiming(1, { duration: 250 });
      cardScale.value = withSpring(1, { damping: 12, stiffness: 200 });
    } else {
      bgOpacity.value = withTiming(0, { duration: 200 });
      cardScale.value = withTiming(0.8, { duration: 200 });
    }
  }, [visible]);

  const bgStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }));
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: cardScale.value }] }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.backdrop, bgStyle]}>
      <Animated.View style={[styles.card, cardStyle]}>
        <Text style={styles.emoji}>🐒</Text>
        <Text style={styles.heading}>Almost there!</Text>
        <Text style={styles.message}>
          Keep going — trace all the way to the green dot!
        </Text>
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry} activeOpacity={0.85}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allLevelsBtn} onPress={onSelectLevel} activeOpacity={0.7}>
          <Text style={styles.allLevelsText}>All Levels</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.bgOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    width: 300,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  emoji: { fontSize: 56 },
  heading: { fontSize: FontSizes.lg, fontWeight: '900', color: Colors.textPrimary },
  message: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryBtn: {
    backgroundColor: Colors.secondary,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  retryText: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.white },
  allLevelsBtn: {
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  allLevelsText: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.textMuted },
});
