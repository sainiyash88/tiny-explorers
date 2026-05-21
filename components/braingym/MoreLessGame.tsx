import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { MoreLessLevel } from '@/content/braingym/chapter1';

interface Props {
  level: MoreLessLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

export default function MoreLessGame({ level, disabled, onComplete }: Props) {
  const [chosen, setChosen] = useState<'left' | 'right' | null>(null);

  function handleChoice(side: 'left' | 'right') {
    if (disabled || chosen) return;
    setChosen(side);
    setTimeout(() => onComplete(side === level.correctSide), 700);
  }

  function bgFor(side: 'left' | 'right') {
    if (chosen !== side) return Colors.bgCard;
    return chosen === level.correctSide ? '#D4EDDA' : '#FFE0E0';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{level.question}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.card, { backgroundColor: bgFor('left') }]} onPress={() => handleChoice('left')} activeOpacity={0.75}>
          <View style={styles.emojiRow}>
            {Array.from({ length: level.leftCount }).map((_, i) => (
              <Text key={i} style={styles.emoji}>{level.leftEmoji}</Text>
            ))}
          </View>
          <Text style={styles.countLabel}>{level.leftCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: bgFor('right') }]} onPress={() => handleChoice('right')} activeOpacity={0.75}>
          <View style={styles.emojiRow}>
            {Array.from({ length: level.rightCount }).map((_, i) => (
              <Text key={i} style={styles.emoji}>{level.rightEmoji}</Text>
            ))}
          </View>
          <Text style={styles.countLabel}>{level.rightCount}</Text>
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
    width: 140, minHeight: 160, borderRadius: Radii.md,
    justifyContent: 'center', alignItems: 'center',
    gap: Spacing.sm, padding: Spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  emojiRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 120 },
  emoji: { fontSize: 32 },
  countLabel: { fontSize: FontSizes.lg, fontWeight: '900', color: Colors.textPrimary },
});
