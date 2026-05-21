import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import * as Speech from 'expo-speech';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { FindColorLevel } from '@/content/braingym/chapter1';
import { useSound } from '@/hooks/useSound';

function ShapeIcon({ shape, size }: { shape: string; size: number }) {
  const s = size * 0.55;
  if (shape === 'circle')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><Circle cx="50" cy="50" r="42" fill="#4FC3F7" /></Svg>;
  if (shape === 'square')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><Rect x="10" y="10" width="80" height="80" rx="6" fill="#EF5350" /></Svg>;
  if (shape === 'rectangle')
    return <Svg width={s * 1.8} height={s * 0.9} viewBox="0 0 180 90"><Rect x="6" y="6" width="168" height="78" rx="6" fill="#66BB6A" /></Svg>;
  if (shape === 'triangle')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><Polygon points="50,8 94,88 6,88" fill="#FFA726" /></Svg>;
  return null;
}

interface Props {
  level: FindColorLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FindColorGame({ level, disabled, onComplete }: Props) {
  const { width } = useWindowDimensions();
  const { playFail } = useSound();

  // Shuffled order of indices to ask
  const orderRef = useRef<number[]>(shuffle(level.items.map((_, i) => i)));

  const [step, setStep] = useState(0);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);

  const currentIdx = orderRef.current[step];
  const currentLabel = level.items[currentIdx]?.label ?? '';

  function speak(label: string) {
    Speech.stop();
    Speech.speak(`Tap ${label}!`, { rate: 0.75, pitch: 1.1 });
  }

  // First step waits for the level instruction to finish; subsequent steps are quick
  useEffect(() => {
    if (step >= level.items.length) return;
    const delay = step === 0 ? 2800 : 500;
    const t = setTimeout(() => speak(currentLabel), delay);
    return () => clearTimeout(t);
  }, [step, currentLabel]);

  function handleTap(idx: number) {
    if (disabled || tapped.has(idx) || wrongFlash !== null) return;

    if (idx === currentIdx) {
      const nextTapped = new Set(tapped).add(idx);
      setTapped(nextTapped);
      const nextStep = step + 1;
      if (nextStep >= level.items.length) {
        setTimeout(() => onComplete(true), 500);
      } else {
        setStep(nextStep);
      }
    } else {
      playFail(() => speak(currentLabel));
      setWrongFlash(idx);
      setTimeout(() => setWrongFlash(null), 600);
    }
  }

  const cols = level.items.length <= 4 ? 2 : 3;
  const cardSize = Math.min(100, (width - Spacing.lg * 2 - Spacing.sm * (cols - 1)) / cols);
  const emojiSize = cardSize * 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>
          Tap <Text style={styles.colorName}>{currentLabel}</Text>!
        </Text>
        <Text style={styles.progress}>{step}/{level.items.length}</Text>
      </View>

      <View style={[styles.grid, { gap: Spacing.sm }]}>
        {level.items.map((item, idx) => {
          const isDone = tapped.has(idx);
          const isWrong = wrongFlash === idx;
          let bg = Colors.bgCard;
          if (isDone) bg = '#D4EDDA';
          if (isWrong) bg = '#FFE0E0';

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.card,
                { width: cardSize, height: cardSize, backgroundColor: bg },
                isDone && styles.cardDone,
                isWrong && styles.cardWrong,
              ]}
              onPress={() => handleTap(idx)}
              activeOpacity={isDone ? 1 : 0.75}
              disabled={isDone}
            >
              {item.svgShape
                ? <ShapeIcon shape={item.svgShape} size={cardSize} />
                : <Text style={{ fontSize: emojiSize }}>{item.emoji}</Text>
              }
              <Text style={styles.label}>{item.label}</Text>
              {isDone && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.xl, paddingHorizontal: Spacing.lg },
  promptBox: {
    backgroundColor: '#FFF9C4',
    borderRadius: Radii.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  promptText: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  colorName: { color: '#E65100' },
  progress: { fontSize: FontSizes.xs, color: Colors.textMuted, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  card: {
    borderRadius: Radii.md,
    justifyContent: 'center', alignItems: 'center', gap: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  cardDone: { borderWidth: 2, borderColor: '#4CAF50' },
  cardWrong: { borderWidth: 2, borderColor: '#F44336' },
  label: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.textMuted },
  check: { position: 'absolute', top: 4, right: 6, fontSize: 14, color: '#4CAF50', fontWeight: '800' },
});
