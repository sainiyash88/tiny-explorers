import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal } from 'react-native';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export default function ScreenBreakOverlay({ visible, onDismiss }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <Animated.View style={[styles.card, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.emoji}>👀</Text>
          <Text style={styles.title}>Time for a break!</Text>
          <Text style={styles.body}>
            You've been playing for 30 minutes.{'\n'}
            Look away from the screen and rest your eyes for a bit! 🌿
          </Text>
          <TouchableOpacity style={styles.btn} onPress={onDismiss}>
            <Text style={styles.btnText}>OK, I'll take a break!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  emoji: { fontSize: 64 },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '900',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  body: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  btn: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radii.full,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: FontSizes.sm,
    fontWeight: '800',
    color: Colors.bgMain,
  },
});
