import { useCallback, useEffect, useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Path,
  Circle,
  Group,
  Skia,
  type SkPath,
} from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { calcCoverage } from './pathUtils';
import type { Point } from './pathUtils';
import type { TracingLevel } from '@/content/tracing/chapter1';

const DESIGN_SIZE = 300;
const SAMPLE_COUNT = 120;
const COMPLETE_THRESHOLD = 0.95;

interface StrokeGuide {
  skPath: SkPath;
  samples: Point[];
  endPoint: Point;
  startPoint: { x: number; y: number };
}

interface Props {
  level: TracingLevel;
  tolerance: number;
  disabled?: boolean;
  onComplete: () => void;
  onOffPath: () => void;
  onStrokeFail?: () => void;
}

function samplePathByArcLength(path: SkPath, count: number): { points: Point[]; endPoint: Point } {
  const samples: Point[] = [];
  let endPoint: Point = { x: 0, y: 0 };

  try {
    const iter = Skia.ContourMeasureIter(path, false, 1);
    const contour = iter.next();
    if (!contour) {
      const n = path.countPoints();
      for (let i = 0; i < n; i++) {
        const p = path.getPoint(i);
        samples.push({ x: p.x, y: p.y });
      }
      const last = path.getPoint(n - 1);
      endPoint = { x: last.x, y: last.y };
      return { points: samples, endPoint };
    }
    const totalLength = contour.length();
    for (let i = 0; i <= count; i++) {
      const dist = (i / count) * totalLength;
      const posTan = contour.getPosTan(dist);
      const pos = posTan[0];
      samples.push({ x: pos.x, y: pos.y });
    }
    endPoint = samples[samples.length - 1];
  } catch {
    const n = path.countPoints();
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const idx = Math.floor((i / SAMPLE_COUNT) * Math.max(1, n - 1));
      const p = path.getPoint(idx);
      samples.push({ x: p.x, y: p.y });
    }
    const last = path.getPoint(n - 1);
    endPoint = { x: last.x, y: last.y };
  }

  return { points: samples, endPoint };
}

function coversEnd(
  guideSamples: Point[],
  drawnPoints: Point[],
  tolerance: number,
  lastFraction = 0.15
): boolean {
  const startIdx = Math.floor(guideSamples.length * (1 - lastFraction));
  const endSegment = guideSamples.slice(startIdx);
  let covered = 0;
  for (const s of endSegment) {
    for (const d of drawnPoints) {
      const dx = s.x - d.x;
      const dy = s.y - d.y;
      if (Math.sqrt(dx * dx + dy * dy) <= tolerance) { covered++; break; }
    }
  }
  return covered / endSegment.length >= 0.5;
}

export interface TracingCanvasHandle {
  reset: () => void;
}

const TracingCanvas = forwardRef<TracingCanvasHandle, Props>(function TracingCanvas(
  { level, tolerance, disabled, onComplete, onOffPath, onStrokeFail },
  ref
) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const canvasSize = Math.min(screenW - 32, screenH * 0.6, 480);
  const scale = canvasSize / DESIGN_SIZE;

  // Build stroke guides once — component remounts on level change via key
  const allStrokes = useRef<StrokeGuide[]>([]);
  if (allStrokes.current.length === 0) {
    const rawStrokes = level.strokes
      ? level.strokes
      : [{ path: level.path!, startPoint: level.startPoint! }];
    for (const s of rawStrokes) {
      const p = Skia.Path.MakeFromSVGString(s.path);
      if (p) {
        const { points, endPoint } = samplePathByArcLength(p, SAMPLE_COUNT);
        allStrokes.current.push({ skPath: p, samples: points, endPoint, startPoint: s.startPoint });
      }
    }
  }

  const isMultiStroke = (level.strokes?.length ?? 0) > 1;

  // Show full letter preview before tracing starts (multi-stroke only)
  const [isPreviewing, setIsPreviewing] = useState(isMultiStroke);
  const isPreviewingRef = useRef(isMultiStroke);
  useEffect(() => { isPreviewingRef.current = isPreviewing; }, [isPreviewing]);
  useEffect(() => {
    if (!isMultiStroke) return;
    const t = setTimeout(() => setIsPreviewing(false), 1200);
    return () => clearTimeout(t);
  }, [isMultiStroke]);

  const currentStrokeIdx = useRef(0);
  const completedDrawnPaths = useRef<SkPath[]>([]);

  const drawnPathRef = useRef<SkPath>(Skia.Path.Make());
  const drawnPoints = useRef<Point[]>([]);
  const [, setTick] = useState(0);
  const isDrawing = useRef(false);
  const completed = useRef(false);
  const lastRenderTime = useRef(0);

  const nudgeX = useSharedValue(0);
  const nudgeY = useSharedValue(0);
  const nudgeOpacity = useSharedValue(0);

  const nudgeStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.error,
    opacity: nudgeOpacity.value,
    transform: [
      { translateX: nudgeX.value - 14 },
      { translateY: nudgeY.value - 14 },
    ],
  }));

  const showNudge = useCallback((sx: number, sy: number) => {
    nudgeX.value = sx;
    nudgeY.value = sy;
    nudgeOpacity.value = withSequence(
      withTiming(1, { duration: 80 }),
      withTiming(0, { duration: 250 })
    );
  }, [nudgeX, nudgeY, nudgeOpacity]);

  const handleBegin = useCallback((screenX: number, screenY: number) => {
    if (disabled || isPreviewingRef.current || completed.current) return;
    const strokeData = allStrokes.current[currentStrokeIdx.current];
    if (!strokeData) return;

    const startX = strokeData.startPoint.x * scale;
    const startY = strokeData.startPoint.y * scale;
    const dx = screenX - startX;
    const dy = screenY - startY;
    if (Math.sqrt(dx * dx + dy * dy) > tolerance * scale * 3) return;

    isDrawing.current = true;
    drawnPathRef.current = Skia.Path.Make();
    drawnPoints.current = [];
    const designX = screenX / scale;
    const designY = screenY / scale;
    drawnPathRef.current.moveTo(designX, designY);
    drawnPoints.current.push({ x: designX, y: designY });
    setTick((t) => t + 1);
  }, [disabled, scale, tolerance]);

  const handleUpdate = useCallback((screenX: number, screenY: number) => {
    if (!isDrawing.current || completed.current) return;
    const strokeData = allStrokes.current[currentStrokeIdx.current];
    if (!strokeData) return;

    const designX = screenX / scale;
    const designY = screenY / scale;

    let minDist = Infinity;
    for (const s of strokeData.samples) {
      const d = Math.sqrt((s.x - designX) ** 2 + (s.y - designY) ** 2);
      if (d < minDist) minDist = d;
    }

    if (minDist > tolerance * 2.5) {
      showNudge(screenX, screenY);
      onOffPath();
      return;
    }

    drawnPathRef.current.lineTo(designX, designY);
    drawnPoints.current.push({ x: designX, y: designY });
    const now = Date.now();
    if (now - lastRenderTime.current >= 16) {
      lastRenderTime.current = now;
      setTick((t) => t + 1);
    }
  }, [scale, tolerance, showNudge, onOffPath]);

  const handleEnd = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    const strokeData = allStrokes.current[currentStrokeIdx.current];
    if (!strokeData) return;

    const coverage = calcCoverage(strokeData.samples, drawnPoints.current, tolerance);
    const reachedEnd = coversEnd(strokeData.samples, drawnPoints.current, tolerance);
    const isLastStroke = currentStrokeIdx.current === allStrokes.current.length - 1;

    if (coverage >= COMPLETE_THRESHOLD && reachedEnd) {
      completedDrawnPaths.current.push(drawnPathRef.current);
      drawnPathRef.current = Skia.Path.Make();
      drawnPoints.current = [];

      if (isLastStroke) {
        completed.current = true;
        onComplete();
      } else {
        currentStrokeIdx.current++;
        setTick((t) => t + 1);
      }
    } else if (drawnPoints.current.length > 5) {
      drawnPathRef.current = Skia.Path.Make();
      drawnPoints.current = [];
      onStrokeFail?.();
      setTick((t) => t + 1);
    }
  }, [tolerance, onComplete, onStrokeFail]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      currentStrokeIdx.current = 0;
      completedDrawnPaths.current = [];
      drawnPathRef.current = Skia.Path.Make();
      drawnPoints.current = [];
      completed.current = false;
      isDrawing.current = false;
      if (isMultiStroke) {
        isPreviewingRef.current = true;
        setIsPreviewing(true);
      }
      setTick((t) => t + 1);
    },
  }));

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => { 'worklet'; runOnJS(handleBegin)(e.x, e.y); })
    .onUpdate((e) => { 'worklet'; runOnJS(handleUpdate)(e.x, e.y); })
    .onEnd(() => { 'worklet'; runOnJS(handleEnd)(); });

  const currentStroke = allStrokes.current[currentStrokeIdx.current];
  if (!currentStroke && !completed.current) return null;

  return (
    <View style={[styles.wrapper, { width: canvasSize, height: canvasSize }]}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width: canvasSize, height: canvasSize }}>
          <Group transform={[{ scale }]}>
            {isPreviewing ? (
              /* Preview: show full letter (all strokes) as solid grey */
              <>
                {allStrokes.current.map((s, i) => (
                  <Path
                    key={`prev-${i}`}
                    path={s.skPath}
                    color={Colors.locked}
                    style="stroke"
                    strokeWidth={14}
                    strokeCap="round"
                    strokeJoin="round"
                  />
                ))}
                {allStrokes.current.map((s, i) => (
                  <Path
                    key={`prevl-${i}`}
                    path={s.skPath}
                    color="#DADADA"
                    style="stroke"
                    strokeWidth={4}
                    strokeCap="round"
                  />
                ))}
                {level.decorations?.map((d, i) =>
                  d.type === 'circle' ? (
                    <Circle key={i} cx={d.cx} cy={d.cy} r={d.r} color="#222222" />
                  ) : null
                )}
              </>
            ) : (
              /* Tracing mode */
              <>
                {/* Completed guide paths — faded green track */}
                {completedDrawnPaths.current.map((_, i) =>
                  allStrokes.current[i] ? (
                    <Path
                      key={`cg-${i}`}
                      path={allStrokes.current[i].skPath}
                      color="#C8EAC8"
                      style="stroke"
                      strokeWidth={14}
                      strokeCap="round"
                      strokeJoin="round"
                    />
                  ) : null
                )}
                {/* Completed drawn paths — solid green */}
                {completedDrawnPaths.current.map((p, i) => (
                  <Path
                    key={`cd-${i}`}
                    path={p}
                    color="#6BCB77"
                    style="stroke"
                    strokeWidth={12}
                    strokeCap="round"
                    strokeJoin="round"
                  />
                ))}

                {/* Current stroke guide — grey track */}
                {currentStroke && (
                  <>
                    <Path
                      path={currentStroke.skPath}
                      color={Colors.locked}
                      style="stroke"
                      strokeWidth={14}
                      strokeCap="round"
                      strokeJoin="round"
                    />
                    <Path
                      path={currentStroke.skPath}
                      color="#DADADA"
                      style="stroke"
                      strokeWidth={4}
                      strokeCap="round"
                    />
                  </>
                )}

                {/* Child's current drawn stroke */}
                <Path
                  path={drawnPathRef.current}
                  color={Colors.primary}
                  style="stroke"
                  strokeWidth={12}
                  strokeCap="round"
                  strokeJoin="round"
                />

                {/* Decorations — eyes, nose etc. */}
                {level.decorations?.map((d, i) =>
                  d.type === 'circle' ? (
                    <Circle key={i} cx={d.cx} cy={d.cy} r={d.r} color="#222222" />
                  ) : null
                )}

                {/* End dot — hidden for closed single-stroke shapes */}
                {currentStroke && (!level.closed || isMultiStroke) && (
                  <>
                    <Circle cx={currentStroke.endPoint.x} cy={currentStroke.endPoint.y} r={14} color={Colors.success} />
                    <Circle cx={currentStroke.endPoint.x} cy={currentStroke.endPoint.y} r={7} color={Colors.white} />
                  </>
                )}

                {/* Start dot for current stroke */}
                {currentStroke && (
                  <>
                    <Circle cx={currentStroke.startPoint.x} cy={currentStroke.startPoint.y} r={14} color={Colors.secondary} />
                    <Circle cx={currentStroke.startPoint.x} cy={currentStroke.startPoint.y} r={7} color={Colors.white} />
                  </>
                )}
              </>
            )}
          </Group>
        </Canvas>
      </GestureDetector>

      <Animated.View style={nudgeStyle} pointerEvents="none" />
    </View>
  );
});

export default TracingCanvas;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Colors.bgCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
});
