import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { PatternLevel } from '@/content/braingym/chapter1';

function ShapeIcon({ shape, size }: { shape: string; size: number }) {
  const s = size * 0.6;
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

function renderItem(item: string, size: number) {
  if (item.startsWith('#')) return <ShapeIcon shape={item.slice(1)} size={size} />;
  return <Text style={{ fontSize: size * 0.42 }}>{item}</Text>;
}

interface Props {
  level: PatternLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

export default function PatternGame({ level, disabled, onComplete }: Props) {
  const { width } = useWindowDimensions();
  const [chosen, setChosen] = useState<string | null>(null);

  const count = level.sequence.length;
  // Max 5 tiles per row; chunk sequence into rows automatically
  const tilesPerRow = count <= 5 ? count : 5;
  const tileSize = Math.min(
    Math.floor((width - Spacing.lg * 2 - Spacing.sm * (tilesPerRow - 1)) / tilesPerRow),
    64
  );

  function handleChoice(emoji: string) {
    if (disabled || chosen) return;
    setChosen(emoji);
    setTimeout(() => onComplete(emoji === level.answer), 700);
  }

  const tiles = level.sequence.map((item, i) => (
    <View
      key={i}
      style={[
        styles.sequenceTile,
        { width: tileSize, height: tileSize },
        i === level.blankIndex && styles.blankTile,
      ]}
    >
      {i === level.blankIndex ? (
        chosen ? renderItem(chosen, tileSize) : <Text style={styles.blankText}>?</Text>
      ) : (
        renderItem(item, tileSize)
      )}
    </View>
  ));

  // Split into rows of tilesPerRow
  const rows: typeof tiles[] = [];
  for (let i = 0; i < tiles.length; i += tilesPerRow) {
    rows.push(tiles.slice(i, i + tilesPerRow));
  }

  return (
    <View style={styles.container}>
      {/* Sequence — auto multi-row */}
      <View style={styles.sequenceBlock}>
        {rows.map((row, ri) => (
          <View key={ri} style={[styles.sequenceRow, { gap: Spacing.sm }]}>{row}</View>
        ))}
      </View>

      <Text style={styles.chooseLabel}>Choose one:</Text>

      {/* Choice buttons */}
      <View style={styles.choices}>
        {level.choices.map((emoji) => {
          const isCorrect = emoji === level.answer;
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
              {renderItem(emoji, 90)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.xl, paddingHorizontal: Spacing.lg },
  sequenceBlock: { alignItems: 'center', gap: Spacing.sm },
  sequenceRow: { flexDirection: 'row', alignItems: 'center' },
  sequenceTile: {
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
  seqEmoji: { fontSize: 28 },
  blankText: { fontSize: 28, fontWeight: '800', color: Colors.tileBrainGym },
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
