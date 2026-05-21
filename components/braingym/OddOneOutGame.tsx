import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { OddOneOutLevel } from '@/content/braingym/chapter1';

interface Props {
  level: OddOneOutLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

function ShapeIcon({ shape, size }: { shape: string; size: number }) {
  const s = size * 0.72;
  if (shape === 'circle') {
    return (
      <Svg width={s} height={s} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="42" fill="#4FC3F7" />
      </Svg>
    );
  }
  if (shape === 'square') {
    return (
      <Svg width={s} height={s} viewBox="0 0 100 100">
        <Rect x="10" y="10" width="80" height="80" rx="6" fill="#EF5350" />
      </Svg>
    );
  }
  if (shape === 'rectangle') {
    // Constrain to card width — use full available width, half the height
    const rw = size * 0.88;
    const rh = size * 0.44;
    return (
      <Svg width={rw} height={rh} viewBox="0 0 170 85">
        <Rect x="6" y="6" width="158" height="73" rx="6" fill="#66BB6A" />
      </Svg>
    );
  }
  if (shape === 'triangle') {
    return (
      <Svg width={s} height={s} viewBox="0 0 100 100">
        <Polygon points="50,8 94,88 6,88" fill="#FFA726" />
      </Svg>
    );
  }
  return null;
}

export default function OddOneOutGame({ level, disabled, onComplete }: Props) {
  const [chosen, setChosen] = useState<number | null>(null);
  const { width } = useWindowDimensions();

  const cols = 2;
  const cardSize = Math.min(140, (width - Spacing.lg * 2 - Spacing.md * (cols - 1)) / cols);
  const emojiSize = level.items.length > 4 ? 40 : 52;

  function handleChoice(idx: number) {
    if (chosen !== null) return;
    setChosen(idx);
    setTimeout(() => onComplete(idx === level.oddIndex), 700);
  }

  function bgFor(idx: number) {
    if (chosen !== idx) return Colors.bgCard;
    return idx === level.oddIndex ? '#D4EDDA' : '#FFE0E0';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{level.question}</Text>

      <View style={[styles.grid, { maxWidth: cardSize * cols + Spacing.md }]}>
        {level.items.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, { width: cardSize, height: cardSize, backgroundColor: bgFor(idx) }]}
            onPress={() => handleChoice(idx)}
            activeOpacity={0.75}
          >
            {item.svgShape
              ? <ShapeIcon shape={item.svgShape} size={cardSize} />
              : <Text style={[styles.emoji, { fontSize: emojiSize }]}>{item.emoji}</Text>
            }
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.lg, paddingHorizontal: Spacing.lg },
  question: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center' },
  card: {
    borderRadius: Radii.md,
    justifyContent: 'center', alignItems: 'center', gap: Spacing.xs,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  emoji: { fontSize: 52 },
  label: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.textMuted, textAlign: 'center' },
});
