import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { OppositeLevel } from '@/content/braingym/chapter1';
import AnimalCartoon from '@/components/ui/animals/AnimalCartoon';

interface Props {
  level: OppositeLevel;
  onComplete: (correct: boolean) => void;
}

export default function OppositeGame({ level, onComplete }: Props) {
  const [chosen, setChosen] = useState<'left' | 'right' | null>(null);

  function handleChoice(side: 'left' | 'right') {
    if (chosen) return;
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
        <TouchableOpacity
          style={[styles.card, { backgroundColor: bgFor('left') }]}
          onPress={() => handleChoice('left')}
          activeOpacity={0.75}
        >
          {level.leftSvgKey
            ? <AnimalCartoon name={level.leftSvgKey} size={56} />
            : <Text style={[styles.emoji, { fontSize: level.leftEmojiSize ?? 60 }, level.leftEmojiScale && { transform: [{ scaleX: level.leftEmojiScale.x }, { scaleY: level.leftEmojiScale.y }] }]}>{level.leftEmoji}</Text>
          }
          <Text style={styles.label}>{level.leftLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: bgFor('right') }]}
          onPress={() => handleChoice('right')}
          activeOpacity={0.75}
        >
          {level.rightSvgKey
            ? <AnimalCartoon name={level.rightSvgKey} size={56} />
            : <Text style={[styles.emoji, { fontSize: level.rightEmojiSize ?? 60 }, level.rightEmojiScale && { transform: [{ scaleX: level.rightEmojiScale.x }, { scaleY: level.rightEmojiScale.y }] }]}>{level.rightEmoji}</Text>
          }
          <Text style={styles.label}>{level.rightLabel}</Text>
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: { fontSize: 60 },
  label: { fontSize: FontSizes.sm, fontWeight: '800', color: Colors.textMuted, letterSpacing: 1, textAlign: 'center' },
});
