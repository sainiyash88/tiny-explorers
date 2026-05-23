import { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Canvas, Path, Circle, Skia, type SkPath } from '@shopify/react-native-skia';
import Svg, { Circle as SvgCircle, Rect, Polygon } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Colors, FontSizes, Radii, Spacing } from '@/constants/theme';
import type { MatchFollowLevel } from '@/content/braingym/chapter1';
import SilhouetteIcon from './SilhouetteIcon';
import { useSound } from '@/hooks/useSound';


function ShapeIcon({ shape }: { shape: string }) {
  const s = 44;
  if (shape === 'circle')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><SvgCircle cx="50" cy="50" r="42" fill="#4FC3F7" /></Svg>;
  if (shape === 'square')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><Rect x="10" y="10" width="80" height="80" rx="6" fill="#EF5350" /></Svg>;
  if (shape === 'triangle')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><Polygon points="50,8 94,88 6,88" fill="#FFA726" /></Svg>;
  if (shape === 'rectangle')
    return <Svg width={s * 1.6} height={s * 0.7} viewBox="0 0 160 70"><Rect x="4" y="4" width="152" height="62" rx="6" fill="#66BB6A" /></Svg>;
  if (shape === 'diamond')
    return <Svg width={s} height={s} viewBox="0 0 100 100"><Polygon points="50,6 94,50 50,94 6,50" fill="#AB47BC" /></Svg>;
  return null;
}

interface Props {
  level: MatchFollowLevel;
  disabled?: boolean;
  onComplete: (correct: boolean) => void;
}

interface Pos { x: number; y: number }

const DOT_RADIUS = 6;
const SNAP_THRESHOLD = 40; // px — how close finger must land to a dot

export default function MatchFollowGame({ level, disabled, onComplete }: Props) {
  const { playFail } = useSound();
  // Layout measurements — row offsets + item sizes (all relative to matchArea)
  const rowOffsets = useRef<Record<string, Pos>>({});
  const leftItemLayouts = useRef<Record<string, { x: number; y: number; w: number; h: number }>>({});
  const rightItemLayouts = useRef<Record<string, { x: number; y: number; w: number; h: number }>>({});

  // Dot centres: left dot = right edge of left tile, right dot = left edge of right tile
  function leftDot(pairId: string): Pos | null {
    const row = rowOffsets.current[pairId];
    const item = leftItemLayouts.current[pairId];
    if (!row || !item) return null;
    return { x: row.x + item.x + item.w, y: row.y + item.y + item.h / 2 };
  }
  function rightDot(rightPairId: string): Pos | null {
    // Find which row this right pairId is in (by its index in the shuffled list)
    const rowIdx = shuffledRightIds.current.ids.indexOf(rightPairId);
    const leftPairId = level.pairs[rowIdx]?.pairId;
    const row = rowOffsets.current[leftPairId];
    const item = rightItemLayouts.current[rightPairId];
    if (!row || !item) return null;
    return { x: row.x + item.x, y: row.y + item.y + item.h / 2 };
  }

  // Shuffled right-column order — keyed by level id so it recomputes per level
  const shuffledRightIds = useRef<{ levelId: number; ids: string[] }>({ levelId: -1, ids: [] });
  if (shuffledRightIds.current.levelId !== level.id) {
    shuffledRightIds.current = {
      levelId: level.id,
      ids: [...level.pairs.map(p => p.pairId)].sort(() => Math.random() - 0.5),
    };
  }

  // Connections and live drawing state
  const [connections, setConnections] = useState<Record<string, string>>({}); // leftId → rightId
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [, setTick] = useState(0);

  const draggingFrom = useRef<string | null>(null);
  const livePathRef = useRef<SkPath>(Skia.Path.Make());
  const finishedPaths = useRef<Array<{ path: SkPath; correct: boolean }>>([]);

  // --- Gesture handlers (JS thread via runOnJS) ---

  const handleBegin = useCallback((x: number, y: number) => {
    if (disabled) return;
    // Find nearest unconnected left dot
    let nearest: string | null = null;
    let nearestDist = SNAP_THRESHOLD;
    for (const pair of level.pairs) {
      if (connections[pair.pairId]) continue; // already connected
      const dot = leftDot(pair.pairId);
      if (!dot) continue;
      const d = Math.hypot(x - dot.x, y - dot.y);
      if (d < nearestDist) { nearestDist = d; nearest = pair.pairId; }
    }
    if (!nearest) return;

    draggingFrom.current = nearest;
    const dot = leftDot(nearest)!;
    livePathRef.current = Skia.Path.Make();
    livePathRef.current.moveTo(dot.x, dot.y);
    setTick(t => t + 1);
  }, [level.pairs, connections, disabled]);

  const handleUpdate = useCallback((x: number, y: number) => {
    if (!draggingFrom.current) return;
    livePathRef.current.lineTo(x, y);
    setTick(t => t + 1);
  }, []);

  const handleEnd = useCallback((x: number, y: number) => {
    const fromId = draggingFrom.current;
    if (!fromId) return;
    draggingFrom.current = null;

    // Find nearest right dot
    let nearest: string | null = null;
    let nearestDist = SNAP_THRESHOLD;
    for (const pair of level.pairs) {
      const dot = rightDot(pair.pairId);
      if (!dot) continue;
      const d = Math.hypot(x - dot.x, y - dot.y);
      if (d < nearestDist) { nearestDist = d; nearest = pair.pairId; }
    }

    const correct = nearest === fromId;

    if (!nearest || !correct) {
      // Wrong or missed — flash and clear live line
      if (nearest) {
        setWrongFlash(nearest);
        playFail();
        setTimeout(() => setWrongFlash(null), 500);
      }
      livePathRef.current = Skia.Path.Make();
      setTick(t => t + 1);
      return;
    }

    // Correct — freeze the line, record connection
    const frozenPath = livePathRef.current;
    // Snap end to exact dot centre
    const endDot = rightDot(nearest)!;
    frozenPath.lineTo(endDot.x, endDot.y);
    finishedPaths.current = [...finishedPaths.current, { path: frozenPath, correct: true }];
    livePathRef.current = Skia.Path.Make();

    const next = { ...connections, [fromId]: nearest };
    setConnections(next);
    setTick(t => t + 1);

    if (Object.keys(next).length === level.pairs.length) {
      setTimeout(() => onComplete(true), 600);
    }
  }, [connections, level.pairs, onComplete]);

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onBegin(e => { 'worklet'; runOnJS(handleBegin)(e.x, e.y); })
    .onUpdate(e => { 'worklet'; runOnJS(handleUpdate)(e.x, e.y); })
    .onEnd(e => { 'worklet'; runOnJS(handleEnd)(e.x, e.y); })
    .onFinalize(e => { 'worklet'; runOnJS(handleEnd)(e.x, e.y); });

  // --- Layout helpers ---
  function onRowLayout(pairId: string) {
    return (e: LayoutChangeEvent) => {
      rowOffsets.current[pairId] = { x: e.nativeEvent.layout.x, y: e.nativeEvent.layout.y };
    };
  }
  function onLeftItemLayout(pairId: string) {
    return (e: LayoutChangeEvent) => {
      const { x, y, width, height } = e.nativeEvent.layout;
      leftItemLayouts.current[pairId] = { x, y, w: width, h: height };
    };
  }
  function onRightItemLayout(pairId: string) {
    return (e: LayoutChangeEvent) => {
      const { x, y, width, height } = e.nativeEvent.layout;
      rightItemLayouts.current[pairId] = { x, y, w: width, h: height };
    };
  }

  // Dots to render as overlays via Canvas
  const allLeftDots = level.pairs.map(p => ({ id: p.pairId, pos: leftDot(p.pairId) }));
  const allRightDots = shuffledRightIds.current.ids.map(id => ({ id, pos: rightDot(id) }));

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{level.question}</Text>

      <GestureDetector gesture={gesture}>
        <View style={styles.matchArea}>
          {/* Rows: each row holds left tile (in order) + right tile (shuffled) */}
          {level.pairs.map((pair, i) => {
            const rightPairId = shuffledRightIds.current.ids[i];
            const rightPair = level.pairs.find(p => p.pairId === rightPairId)!;
            const leftConnected = !!connections[pair.pairId];
            const rightConnected = Object.values(connections).includes(rightPairId);
            const isWrong = wrongFlash === rightPairId;
            return (
              <View key={pair.pairId} style={styles.row} onLayout={onRowLayout(pair.pairId)}>
                {/* Left tile — keyed to left pair */}
                <View
                  onLayout={onLeftItemLayout(pair.pairId)}
                  style={[styles.item, level.wrapTiles ? styles.itemLeftWrap : styles.itemLeft, leftConnected && styles.itemConnected]}
                >
                  {pair.leftSvgShape
                    ? <ShapeIcon shape={pair.leftSvgShape} />
                    : <Text style={styles.itemText}>{pair.left}</Text>
                  }
                </View>

                {/* Right tile — keyed to shuffled right pair; onLayout uses rightPairId */}
                <View
                  onLayout={onRightItemLayout(rightPairId)}
                  style={[styles.item, level.wrapTiles ? styles.itemRightWrap : styles.itemRight, rightConnected && styles.itemConnected, isWrong && styles.itemWrong]}
                >
                  {rightPair.rightSilhouette
                    ? <SilhouetteIcon name={rightPair.rightSilhouette} />
                    : <Text style={[styles.itemText, styles.itemTextRight]}>{rightPair.right}</Text>
                  }
                </View>
              </View>
            );
          })}

          {/* Skia canvas overlay for lines and dots */}
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            {/* Completed lines */}
            {finishedPaths.current.map((fp, i) => (
              <Path
                key={i}
                path={fp.path}
                color="#4CAF50"
                style="stroke"
                strokeWidth={4}
                strokeCap="round"
                strokeJoin="round"
              />
            ))}

            {/* Live line being drawn */}
            {draggingFrom.current && (
              <Path
                path={livePathRef.current}
                color="#FFC107"
                style="stroke"
                strokeWidth={4}
                strokeCap="round"
                strokeJoin="round"
                strokeDasharray={[8, 5]}
              />
            )}

            {/* Left dots */}
            {allLeftDots.map(({ id, pos }) => {
              if (!pos) return null;
              const connected = !!connections[id];
              return (
                <Circle key={`ld-${id}`} cx={pos.x} cy={pos.y} r={DOT_RADIUS}
                  color={connected ? '#4CAF50' : '#FFC107'} />
              );
            })}

            {/* Right dots */}
            {allRightDots.map(({ id, pos }) => {
              if (!pos) return null;
              const connected = Object.values(connections).includes(id);
              const isWrong = wrongFlash === id;
              return (
                <Circle key={`rd-${id}`} cx={pos.x} cy={pos.y} r={DOT_RADIUS}
                  color={isWrong ? '#F44336' : connected ? '#4CAF50' : '#90CAF9'} />
              );
            })}
          </Canvas>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.lg, paddingHorizontal: Spacing.lg },
  question: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  matchArea: { flexDirection: 'column', width: '100%', gap: Spacing.md, paddingVertical: Spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  item: {
    borderRadius: Radii.md,
    backgroundColor: Colors.bgCard, justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  itemLeft: { width: 60, height: 62 },
  itemRight: { width: 110, height: 62 },
  itemLeftWrap: { minHeight: 52, minWidth: 70, paddingHorizontal: 12, paddingVertical: 8 },
  itemRightWrap: { minHeight: 52, minWidth: 80, paddingHorizontal: 10, paddingVertical: 8 },
  itemConnected: { backgroundColor: '#E8F5E9', borderWidth: 2, borderColor: '#4CAF50' },
  itemWrong: { backgroundColor: '#FFE0E0', borderWidth: 2, borderColor: '#F44336' },
  itemText: { fontSize: 32, textAlign: 'center' },
  itemTextRight: { fontSize: 24 },
});
