import { useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, LayoutChangeEvent } from 'react-native';
import { Canvas, Path, Skia, type SkPath } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/theme';
import type { MazeLevel } from '@/content/braingym/chapter1';
import { useSound } from '@/hooks/useSound';

interface Props {
  level: MazeLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

interface Cell { row: number; col: number }

function cellKey(c: Cell) { return `${c.row},${c.col}`; }
function isAdjacent(a: Cell, b: Cell) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
}

const BG_COLOR    = '#fdf6e3';
const WALL_COLOR  = '#3d2e1e';
const TRAIL_COLOR = '#C8E6C9';
const WALL_WIDTH  = 4;
const OUTER_WIDTH = 5;

function buildWallPath(grid: number[][], cW: number, cH: number): SkPath {
  const rows = grid.length;
  const cols = grid[0].length;
  const p = Skia.Path.Make();

  function isOpen(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    return grid[r][c] === 0;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!isOpen(r, c)) continue;
      const x0 = c * cW, y0 = r * cH;
      const x1 = x0 + cW, y1 = y0 + cH;
      if (!isOpen(r - 1, c)) { p.moveTo(x0, y0); p.lineTo(x1, y0); }
      if (!isOpen(r + 1, c)) { p.moveTo(x0, y1); p.lineTo(x1, y1); }
      if (!isOpen(r, c - 1)) { p.moveTo(x0, y0); p.lineTo(x0, y1); }
      if (!isOpen(r, c + 1)) { p.moveTo(x1, y0); p.lineTo(x1, y1); }
    }
  }
  return p;
}

export default function MazeGame({ level, disabled, onComplete }: Props) {
  const { playFail } = useSound();
  const { width } = useWindowDimensions();
  const rows = level.grid.length;
  const cols = level.grid[0].length;

  const [availH, setAvailH] = useState(0);
  const mazeW = width - Spacing.sm * 2;
  const mazeH = availH > 0 ? availH : 0;
  const cellW = mazeW / cols;
  const cellH = mazeH > 0 ? mazeH / rows : 0;

  const cellWRef = useRef(cellW);
  const cellHRef = useRef(cellH);
  cellWRef.current = cellW;
  cellHRef.current = cellH;

  const wallPath = useMemo(
    () => cellW > 0 && cellH > 0 ? buildWallPath(level.grid, cellW, cellH) : null,
    [cellW, cellH]
  );

  // Character position — starts at start cell, persists on finger lift
  const [charCell, setCharCell] = useState<Cell>(level.start);
  const [visitedKeys, setVisitedKeys] = useState<Set<string>>(new Set([cellKey(level.start)]));
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const charCellRef = useRef<Cell>(level.start);
  const dragging = useRef(false);

  function touchToCell(x: number, y: number): Cell | null {
    const cW = cellWRef.current, cH = cellHRef.current;
    const col = Math.floor(x / cW);
    const row = Math.floor(y / cH);
    if (row < 0 || row >= rows || col < 0 || col >= cols) return null;
    return { row, col };
  }

  function isOpen(cell: Cell) { return level.grid[cell.row]?.[cell.col] === 0; }
  function isEnd(cell: Cell)  { return cell.row === level.end.row && cell.col === level.end.col; }

  const moveCharTo = useCallback((cell: Cell) => {
    charCellRef.current = cell;
    setCharCell({ ...cell });
    setVisitedKeys(prev => new Set([...prev, cellKey(cell)]));
    if (isEnd(cell)) {
      setCompleted(true);
      setTimeout(() => onComplete(true), 600);
    }
  }, [onComplete]);

  const handleBegin = useCallback((x: number, y: number) => {
    if (disabled || completed) return;
    const cell = touchToCell(x, y);
    if (!cell) return;
    // Only start drag if touching on or adjacent to current character cell
    if (cellKey(cell) === cellKey(charCellRef.current) || isAdjacent(cell, charCellRef.current)) {
      dragging.current = true;
      if (cellKey(cell) !== cellKey(charCellRef.current) && isOpen(cell)) {
        moveCharTo(cell);
      }
    }
  }, [completed, moveCharTo]);

  const handleUpdate = useCallback((x: number, y: number) => {
    if (!dragging.current || completed) return;
    const cell = touchToCell(x, y);
    if (!cell) return;
    if (cellKey(cell) === cellKey(charCellRef.current)) return;
    if (!isAdjacent(charCellRef.current, cell)) return;

    if (!isOpen(cell)) {
      setErrorKey(cellKey(cell));
      playFail();
      setTimeout(() => setErrorKey(null), 400);
      return;
    }

    moveCharTo(cell);
  }, [completed, moveCharTo]);

  const handleEnd = useCallback(() => {
    dragging.current = false;
    // Character stays wherever it is — no reset
  }, []);

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onBegin(e => { 'worklet'; runOnJS(handleBegin)(e.x, e.y); })
    .onUpdate(e => { 'worklet'; runOnJS(handleUpdate)(e.x, e.y); })
    .onEnd(() => { 'worklet'; runOnJS(handleEnd)(); })
    .onFinalize(() => { 'worklet'; runOnJS(handleEnd)(); });

  function onMazeLayout(e: LayoutChangeEvent) {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && h !== availH) setAvailH(h);
  }

  const emojiSize = Math.min(cellW, cellH) * 0.65;

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.mazeArea} onLayout={onMazeLayout}>
          {mazeH > 0 && (
            <View style={[styles.mazeWrapper, { width: mazeW, height: mazeH, backgroundColor: BG_COLOR }]}>

              {/* Visited trail */}
              {Array.from(visitedKeys).map(k => {
                const [r, c] = k.split(',').map(Number);
                const isChar = r === charCell.row && c === charCell.col;
                const isGoal = r === level.end.row && c === level.end.col;
                return (
                  <View key={k} pointerEvents="none" style={[styles.cell, {
                    left: c * cellW + 2, top: r * cellH + 2,
                    width: cellW - 4, height: cellH - 4,
                    borderRadius: Math.min(cellW, cellH) * 0.2,
                    backgroundColor: isChar || isGoal ? 'transparent' : TRAIL_COLOR,
                  }]} />
                );
              })}

              {/* Error flash on wall */}
              {errorKey && (() => {
                const [r, c] = errorKey.split(',').map(Number);
                return (
                  <View pointerEvents="none" style={[styles.cell, {
                    left: c * cellW, top: r * cellH,
                    width: cellW, height: cellH,
                    backgroundColor: '#ef535044',
                  }]} />
                );
              })()}

              {/* End emoji — always visible */}
              <Text pointerEvents="none" style={[styles.emoji, {
                left: level.end.col * cellW, top: level.end.row * cellH,
                width: cellW, height: cellH, fontSize: emojiSize,
              }]}>
                {level.endEmoji}
              </Text>

              {/* Moving character */}
              <Text pointerEvents="none" style={[styles.emoji, {
                left: charCell.col * cellW, top: charCell.row * cellH,
                width: cellW, height: cellH, fontSize: emojiSize,
              }]}>
                {level.startEmoji}
              </Text>

              {/* Wall lines + outer border via Skia */}
              <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
                {wallPath && (
                  <Path path={wallPath} color={WALL_COLOR}
                    style="stroke" strokeWidth={WALL_WIDTH} strokeCap="square" />
                )}
                <Path
                  path={(() => {
                    const p = Skia.Path.Make();
                    p.addRect(Skia.XYWHRect(OUTER_WIDTH / 2, OUTER_WIDTH / 2, mazeW - OUTER_WIDTH, mazeH - OUTER_WIDTH));
                    return p;
                  })()}
                  color={WALL_COLOR} style="stroke" strokeWidth={OUTER_WIDTH}
                />
              </Canvas>
            </View>
          )}
        </View>
      </GestureDetector>

      <Text style={styles.hint}>
        {completed ? '🎉 Well done!' : `Drag ${level.startEmoji} to ${level.endEmoji}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingHorizontal: Spacing.sm, paddingBottom: Spacing.sm },
  mazeArea:  { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  mazeWrapper: { position: 'relative', borderRadius: Radii.md, overflow: 'hidden' },
  cell:  { position: 'absolute' },
  emoji: { position: 'absolute', textAlign: 'center', textAlignVertical: 'center' },
  hint:  { fontSize: FontSizes.xs, color: Colors.textMuted, textAlign: 'center' },
});
