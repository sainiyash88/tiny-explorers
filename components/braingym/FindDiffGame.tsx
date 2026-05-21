import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { FindDiffLevel } from '@/content/braingym/chapter1';

interface Props {
  level: FindDiffLevel;
  onComplete: (correct: boolean) => void;
}

export default function FindDiffGame({ level, onComplete }: Props) {
  const totalDiffs = level.diffCells.length;
  const [found, setFound] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  function cellKey(row: number, col: number) { return `${row}-${col}`; }

  function isDiff(row: number, col: number) {
    return level.diffCells.some(c => c.row === row && c.col === col);
  }

  function handleTap(row: number, col: number) {
    if (found.size === totalDiffs) return;
    const key = cellKey(row, col);
    if (found.has(key)) return;

    if (isDiff(row, col)) {
      const next = new Set(found);
      next.add(key);
      setFound(next);
      if (next.size === totalDiffs) {
        setTimeout(() => onComplete(true), 600);
      }
    } else {
      setWrong(key);
      setTimeout(() => setWrong(null), 600);
    }
  }

  function cellBg(row: number, col: number, isRight: boolean) {
    const key = cellKey(row, col);
    if (isRight && found.has(key)) return '#D4EDDA';
    if (isRight && wrong === key) return '#FFE0E0';
    return Colors.bgCard;
  }

  const rows = level.baseGrid.length;
  const cols = level.baseGrid[0].length;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{level.question}</Text>

      <View style={styles.gridsRow}>
        {/* Base grid (left) */}
        <View style={styles.gridWrap}>
          <Text style={styles.gridLabel}>Original</Text>
          <View style={styles.grid}>
            {Array.from({ length: rows }).map((_, r) => (
              <View key={r} style={styles.row}>
                {Array.from({ length: cols }).map((_, c) => (
                  <View key={c} style={[styles.cell, { backgroundColor: Colors.bgCard }]}>
                    <Text style={styles.emoji}>{level.baseGrid[r][c]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.vs}>vs</Text>

        {/* Diff grid (right — tappable) */}
        <View style={styles.gridWrap}>
          <Text style={styles.gridLabel}>Find it! 👆</Text>
          <View style={styles.grid}>
            {Array.from({ length: rows }).map((_, r) => (
              <View key={r} style={styles.row}>
                {Array.from({ length: cols }).map((_, c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.cell, { backgroundColor: cellBg(r, c, true) }]}
                    onPress={() => handleTap(r, c)}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.emoji}>{level.diffGrid[r][c]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.progress}>{found.size} / {totalDiffs} found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.lg, paddingHorizontal: Spacing.md },
  question: { fontSize: FontSizes.sm, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  gridsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  gridWrap: { alignItems: 'center', gap: Spacing.xs },
  gridLabel: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.textMuted },
  grid: { gap: 6 },
  row: { flexDirection: 'row', gap: 6 },
  cell: {
    width: 58, height: 58, borderRadius: Radii.sm,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
  },
  emoji: { fontSize: 32 },
  vs: { fontSize: FontSizes.md, fontWeight: '900', color: Colors.textMuted },
  progress: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.textMuted },
});
