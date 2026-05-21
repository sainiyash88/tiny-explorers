import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { useEntitlementStore } from '@/store/entitlementStore';

/** Simple arithmetic gate — ensures a parent/adult is operating the device */

function generateChallenge(): { question: string; answer: number } {
  const type = Math.floor(Math.random() * 4);
  let question: string, answer: number;

  if (type === 0) {
    // Two-step: (a + b) × c
    const a = Math.floor(Math.random() * 10) + 5;  // 5–14
    const b = Math.floor(Math.random() * 10) + 5;  // 5–14
    const c = Math.floor(Math.random() * 8) + 2;   // 2–9
    answer = (a + b) * c;
    question = `(${a} + ${b}) × ${c} = ?`;
  } else if (type === 1) {
    // Division with remainder-free result
    const b = Math.floor(Math.random() * 8) + 2;   // 2–9
    const c = Math.floor(Math.random() * 10) + 2;  // 2–11
    const a = b * c;
    answer = c;
    question = `${a} ÷ ${b} = ?`;
  } else if (type === 2) {
    // Mixed: a × b - c
    const a = Math.floor(Math.random() * 9) + 3;   // 3–11
    const b = Math.floor(Math.random() * 9) + 3;   // 3–11
    const c = Math.floor(Math.random() * 20) + 5;  // 5–24
    answer = a * b - c;
    question = `${a} × ${b} − ${c} = ?`;
  } else {
    // Square + addition: a² + b
    const a = Math.floor(Math.random() * 7) + 3;   // 3–9
    const b = Math.floor(Math.random() * 20) + 5;  // 5–24
    answer = a * a + b;
    question = `${a}² + ${b} = ?`;
  }

  return { question, answer };
}

const DIGIT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✓'];

export default function ParentGate() {
  const { next } = useLocalSearchParams<{ next?: string }>();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const { isPremium, setPremium } = useEntitlementStore();
  const [challenge] = useState(generateChallenge);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const navigate = () => {
    if (next === 'paywall') router.replace('/paywall');
    else router.replace('/home');
  };

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setInput((v) => v.slice(0, -1));
      setError(false);
    } else if (key === '✓') {
      const val = parseInt(input, 10);
      if (val === challenge.answer) {
        setUnlocked(true);
        if (!__DEV__) navigate();
      } else {
        setError(true);
        setInput('');
      }
    } else {
      if (input.length < 5) {
        setInput((v) => v + key);
        setError(false);
      }
    }
  };

  const btnSize = isTablet ? 88 : 72;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Close */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Parent Check</Text>
        <Text style={styles.sub}>Solve the problem to continue</Text>

        <View style={styles.questionBox}>
          <Text style={[styles.question, isTablet && styles.questionTablet]}>
            {challenge.question}
          </Text>
        </View>

        <View style={[styles.inputDisplay, error && styles.inputError]}>
          <Text style={styles.inputText}>{input || '—'}</Text>
        </View>

        {error && <Text style={styles.errorText}>Not quite — try again!</Text>}

        {/* Dev-only unlock toggle — stripped in production builds */}
        {__DEV__ && unlocked && (
          <View style={styles.devRow}>
            <TouchableOpacity
              style={[styles.devBtn, isPremium && styles.devBtnActive]}
              onPress={() => setPremium(!isPremium)}
              activeOpacity={0.8}
            >
              <Text style={styles.devText}>
                {isPremium ? '🔓 Unlocked' : '🔒 Unlock All'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.devContinueBtn} onPress={navigate} activeOpacity={0.8}>
              <Text style={styles.devContinueText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Numpad */}
        <View style={[styles.numpad, isTablet && styles.numpadTablet]}>
          {DIGIT_KEYS.map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.key,
                { width: btnSize, height: btnSize },
                key === '✓' && styles.keyConfirm,
                key === '⌫' && styles.keyDelete,
              ]}
              onPress={() => handleKey(key)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.keyText,
                  key === '✓' && styles.keyTextConfirm,
                ]}
              >
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: MIN_TAP_TARGET,
    height: MIN_TAP_TARGET,
    borderRadius: Radii.full,
    backgroundColor: Colors.locked,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: FontSizes.md, color: Colors.textPrimary },

  heading: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary },
  sub: { fontSize: FontSizes.sm, color: Colors.textMuted, marginTop: -Spacing.sm },

  questionBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  question: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.white },
  questionTablet: { fontSize: FontSizes.xxl },

  inputDisplay: {
    width: 160,
    height: 60,
    borderRadius: Radii.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputError: { borderColor: Colors.error },
  inputText: { fontSize: FontSizes.xl, fontWeight: '700', color: Colors.textPrimary },
  errorText: { fontSize: FontSizes.sm, color: Colors.error, fontWeight: '600' },

  numpad: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center', maxWidth: 280 },
  numpadTablet: { maxWidth: 340 },
  key: {
    borderRadius: Radii.md,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  keyConfirm: { backgroundColor: Colors.primary },
  keyDelete: { backgroundColor: Colors.secondaryLight },
  keyText: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary },
  keyTextConfirm: { color: Colors.white },

  devRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  devBtn: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bgCard,
  },
  devBtnActive: { backgroundColor: Colors.primaryLight },
  devText: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.primary },
  devContinueBtn: {
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary,
  },
  devContinueText: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.white },
});
