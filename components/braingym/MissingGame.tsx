import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { MissingLevel } from '@/content/braingym/chapter1';

interface Props {
  level: MissingLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

export default function MissingGame({ level, disabled, onComplete }: Props) {
  const [chosen, setChosen] = useState<string | null>(null);
  const answer = level.items[level.missingIndex];

  function handleChoice(emoji: string) {
    if (disabled || chosen) return;
    setChosen(emoji);
    setTimeout(() => onComplete(emoji === answer), 700);
  }

  return (
    <View style={styles.container}>
      {/* Full item row with one blank */}
      <View style={styles.itemRow}>
        {level.items.map((item, i) => (
          <View
            key={i}
            style={[styles.itemTile, i === level.missingIndex && styles.blankTile]}
          >
            {i === level.missingIndex ? (
              chosen ? (
                <Text style={styles.itemEmoji}>{chosen}</Text>
              ) : (
                <Text style={styles.blankText}>?</Text>
              )
            ) : (
              <Text style={styles.itemEmoji}>{item}</Text>
            )}
          </View>
        ))}
      </View>

      <Text style={styles.chooseLabel}>Which one is missing?</Text>

      {/* Choices */}
      <View style={styles.choices}>
        {level.choices.map((emoji) => {
          const isCorrect = emoji === answer;
          const isChosen = emoji === chosen;
          let bg = Colors.bgCard;
          if (isChosen) bg = isCorrect ? '#D4EDDA' : '#FFE0E0';
          return (
            <TouchableOpacity
              key={emoji}
              style={[styles.choiceBtn, { backgroundColor: bg }]}
              onPress={() => handleChoice(emoji)}
              activeOpacity={0.7}
            >
              <Text style={styles.choiceEmoji}>{emoji}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.xl, paddingHorizontal: Spacing.lg },
  itemRow: { flexDirection: 'row', gap: Spacing.md, flexWrap: 'wrap', justifyContent: 'center' },
  itemTile: {
    width: 80,
    height: 80,
    borderRadius: Radii.sm,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  blankTile: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.tileBrainGym,
    backgroundColor: '#F0FFF4',
  },
  itemEmoji: { fontSize: 38 },
  blankText: { fontSize: 36, fontWeight: '800', color: Colors.tileBrainGym },
  chooseLabel: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  choices: { flexDirection: 'row', gap: Spacing.lg },
  choiceBtn: {
    width: 90,
    height: 90,
    borderRadius: Radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  choiceEmoji: { fontSize: 44 },
});
