import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { BigSmallLevel } from '@/content/braingym/chapter1';

interface Props {
  level: BigSmallLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

export default function BigSmallGame({ level, disabled, onComplete }: Props) {
  const [chosen, setChosen] = useState<'big' | 'small' | null>(null);

  function handleChoice(choice: 'big' | 'small') {
    if (disabled || chosen) return;
    setChosen(choice);
    setTimeout(() => onComplete(choice === level.correctAnswer), 700);
  }

  function bgFor(choice: 'big' | 'small') {
    if (chosen !== choice) return Colors.bgCard;
    return chosen === level.correctAnswer ? '#D4EDDA' : '#FFE0E0';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{level.question}</Text>

      <View style={styles.row}>
        {/* Big card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: bgFor('big') }]}
          onPress={() => handleChoice('big')}
          activeOpacity={0.75}
        >
          <Text style={styles.bigEmoji}>{level.emoji}</Text>
          <Text style={styles.sizeLabel}>BIG</Text>
        </TouchableOpacity>

        {/* Small card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: bgFor('small') }]}
          onPress={() => handleChoice('small')}
          activeOpacity={0.75}
        >
          <Text style={styles.smallEmoji}>{level.emoji}</Text>
          <Text style={styles.sizeLabel}>SMALL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.xl, paddingHorizontal: Spacing.lg },
  question: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  row: { flexDirection: 'row', gap: Spacing.xl, alignItems: 'center' },
  card: {
    width: 140,
    height: 160,
    borderRadius: Radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bigEmoji: { fontSize: 72 },
  smallEmoji: { fontSize: 28 },
  sizeLabel: { fontSize: FontSizes.xs, fontWeight: '800', color: Colors.textMuted, letterSpacing: 1 },
});
