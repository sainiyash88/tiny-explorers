import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { CountLevel } from '@/content/braingym/chapter1';

interface Props {
  level: CountLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

export default function CountGame({ level, disabled, onComplete }: Props) {
  const [chosen, setChosen] = useState<number | null>(null);

  function handleChoice(n: number) {
    if (chosen !== null) return;
    setChosen(n);
    setTimeout(() => onComplete(n === level.count), 700);
  }

  function bgFor(n: number) {
    if (chosen !== n) return Colors.bgCard;
    return n === level.count ? '#D4EDDA' : '#FFE0E0';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{level.question}</Text>

      <View style={styles.emojiGrid}>
        {Array.from({ length: level.count }).map((_, i) => (
          <Text key={i} style={styles.emoji}>{level.emoji}</Text>
        ))}
      </View>

      <View style={styles.choices}>
        {level.choices.map((n) => (
          <TouchableOpacity
            key={n}
            style={[styles.choiceBtn, { backgroundColor: bgFor(n) }]}
            onPress={() => handleChoice(n)}
            activeOpacity={0.75}
          >
            <Text style={styles.choiceText}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.xl, paddingHorizontal: Spacing.lg },
  question: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  emojiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: Spacing.sm, maxWidth: 300 },
  emoji: { fontSize: 52 },
  choices: { flexDirection: 'row', gap: Spacing.lg },
  choiceBtn: {
    width: 90, height: 90, borderRadius: Radii.md,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  choiceText: { fontSize: 36, fontWeight: '900', color: Colors.textPrimary },
});
