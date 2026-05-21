import { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import DropZone from './DropZone';
import PuzzlePiece from './PuzzlePiece';
import PUZZLE_IMAGES from '@/assets/images/puzzles';
import type { PuzzleLevel } from '@/content/puzzles/chapter1';

interface Props {
  puzzle: PuzzleLevel;
  disabled?: boolean;
  onComplete: () => void;
  onWrongDrop?: () => void;
}

interface ZoneLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

const SNAP_RADIUS = 80;

function fisherYates<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function PuzzleBoard({ puzzle, disabled, onComplete, onWrongDrop }: Props) {
  const { width: screenW } = useWindowDimensions();
  const isTablet = screenW >= 768;

  const boardPadding = Spacing.lg * 2;
  const zoneGap = Spacing.md;
  const pieceSize = Math.min(
    Math.floor((screenW - boardPadding - zoneGap * (puzzle.cols - 1)) / puzzle.cols),
    isTablet ? 160 : 110
  );

  const [placedIds, setPlacedIds] = useState<Set<string>>(new Set());
  const [snappedId, setSnappedId] = useState<string | null>(null);
  const [wrongDropId, setWrongDropId] = useState<string | null>(null);
  const mistakeCount = useRef(0);

  const zoneLayouts = useRef<Map<string, ZoneLayout>>(new Map());

  const zoneKey = (col: number, row: number) => `${col}-${row}`;
  const pieceByZone = new Map(puzzle.pieces.map((p) => [zoneKey(p.col, p.row), p]));

  const handleZoneLayout = useCallback(
    (col: number, row: number, x: number, y: number, w: number, h: number) => {
      zoneLayouts.current.set(zoneKey(col, row), { x, y, width: w, height: h });
    },
    []
  );

  const handleDragStart = useCallback((_id: string) => {
    setSnappedId(null);
    setWrongDropId(null);
  }, []);

  const handleDrop = useCallback(
    (pieceId: string, dropX: number, dropY: number) => {
      if (disabled || placedIds.has(pieceId)) return;

      const piece = puzzle.pieces.find((p) => p.id === pieceId);
      if (!piece) return;

      let bestKey: string | null = null;
      let bestDist = Infinity;

      zoneLayouts.current.forEach((layout, key) => {
        const cx = layout.x + layout.width / 2;
        const cy = layout.y + layout.height / 2;
        const dist = Math.sqrt((dropX - cx) ** 2 + (dropY - cy) ** 2);
        if (dist < bestDist) {
          bestDist = dist;
          bestKey = key;
        }
      });

      if (!bestKey || bestDist > SNAP_RADIUS) return;

      const correctKey = zoneKey(piece.col, piece.row);

      if (bestKey === correctKey) {
        setPlacedIds((prev) => {
          const next = new Set(prev);
          next.add(pieceId);
          if (next.size === puzzle.pieces.length) {
            setTimeout(() => onComplete(), 600);
          }
          return next;
        });
        setSnappedId(pieceId);
      } else {
        mistakeCount.current += 1;
        setWrongDropId(pieceId);
        onWrongDrop?.();
        setTimeout(() => setWrongDropId(null), 600);
      }
    },
    [disabled, placedIds, puzzle.pieces, onComplete]
  );

  const shuffledRef = useRef(fisherYates([...puzzle.pieces]));

  return (
    <View style={styles.container}>
      {/* Target grid */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Put the pieces here</Text>
        <View style={[styles.grid, { gap: zoneGap }]}>
          {Array.from({ length: puzzle.rows }, (_, row) => (
            <View key={row} style={[styles.gridRow, { gap: zoneGap }]}>
              {Array.from({ length: puzzle.cols }, (_, col) => {
                const zonePiece = pieceByZone.get(zoneKey(col, row));
                const isFilled = zonePiece ? placedIds.has(zonePiece.id) : false;
                const wasJustSnapped = zonePiece?.id === snappedId;
                return (
                  <View
                    key={col}
                    ref={(view) => {
                      if (view) {
                        view.measure((_fx, _fy, w, h, px, py) => {
                          handleZoneLayout(col, row, px, py, w, h);
                        });
                      }
                    }}
                  >
                    <DropZone
                      size={pieceSize}
                      filled={isFilled}
                      imageSource={zonePiece ? PUZZLE_IMAGES[zonePiece.imageKey] : undefined}
                      justSnapped={wasJustSnapped}
                    />
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Piece tray */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Drag a piece up</Text>
        <View style={[styles.tray, { gap: zoneGap }]}>
          {shuffledRef.current.map((piece) => (
            <PuzzlePiece
              key={piece.id}
              id={piece.id}
              imageKey={piece.imageKey}
              size={pieceSize}
              placed={placedIds.has(piece.id)}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', paddingHorizontal: Spacing.lg },
  section: { alignItems: 'center', gap: Spacing.sm },
  sectionLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grid: { alignItems: 'center' },
  gridRow: { flexDirection: 'row' },
  divider: {
    height: 2,
    backgroundColor: Colors.locked,
    borderRadius: 1,
    marginHorizontal: Spacing.xl,
  },
  tray: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
