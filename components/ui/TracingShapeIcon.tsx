import Svg, { Line, Path, Circle, Rect, Polygon } from 'react-native-svg';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  size?: number;
}

const STROKE = '#4EC76F';
const STROKE_W = 6;
const BG = '#F0FFF4';

function StraightLine({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Line x1="10" y1="45" x2="80" y2="45" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
    </Svg>
  );
}
function VerticalLine({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Line x1="45" y1="10" x2="45" y2="80" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
    </Svg>
  );
}
function DiagonalLine({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Line x1="15" y1="15" x2="75" y2="75" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
    </Svg>
  );
}
function GentleCurve({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Path d="M 10 65 Q 45 15 80 65" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinecap="round" />
    </Svg>
  );
}
function SCurve({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Path d="M 45 10 C 72 10 18 45 45 45 C 72 45 18 80 45 80" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinecap="round" />
    </Svg>
  );
}
function CircleShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="30" stroke={STROKE} strokeWidth={STROKE_W} fill="none" />
    </Svg>
  );
}
function SquareShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Rect x="15" y="15" width="60" height="60" stroke={STROKE} strokeWidth={STROKE_W} fill="none" rx="4" />
    </Svg>
  );
}
function TriangleShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Polygon points="45,12 78,78 12,78" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinejoin="round" />
    </Svg>
  );
}
function RectangleShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Rect x="10" y="22" width="70" height="46" stroke={STROKE} strokeWidth={STROKE_W} fill="none" rx="4" />
    </Svg>
  );
}
function StarShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Polygon points="45,8 53,33 80,33 58,50 66,75 45,59 24,75 32,50 10,33 37,33" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinejoin="round" />
    </Svg>
  );
}
function ZigZagShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Path d="M 8 65 L 28 25 L 48 65 L 68 25 L 82 55" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function KiteShape({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 90 90">
      <Polygon points="45,8 78,45 45,82 12,45" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

const MAP: Record<string, (s: number) => JSX.Element> = {
  'straight line':  (s) => <StraightLine s={s} />,
  'vertical line':  (s) => <VerticalLine s={s} />,
  'diagonal line':  (s) => <DiagonalLine s={s} />,
  'gentle curve':   (s) => <GentleCurve s={s} />,
  's curve':        (s) => <SCurve s={s} />,
  'circle':         (s) => <CircleShape s={s} />,
  'square':         (s) => <SquareShape s={s} />,
  'triangle':       (s) => <TriangleShape s={s} />,
  'rectangle':      (s) => <RectangleShape s={s} />,
  'star':           (s) => <StarShape s={s} />,
  'zig zag':        (s) => <ZigZagShape s={s} />,
  'diamond':        (s) => <KiteShape s={s} />,
};

const ANIMAL_EMOJI: Record<string, string> = {
  cat: '🐱', fish: '🐟', bird: '🐦', rabbit: '🐰',
  duck: '🦆', turtle: '🐢', butterfly: '🦋', elephant: '🐘',
  bear: '🐻', snail: '🐌', mouse: '🐭', snake: '🐍',
};

export default function TracingShapeIcon({ title, size = 80 }: Props) {
  const key = title.toLowerCase();
  const render = MAP[key];

  let label: string | null = null;
  if (!render) {
    if (title.startsWith('Letter ')) label = title.slice(7); // preserves case: 'A' or 'a'
    else if (key.startsWith('number ')) label = key.slice(7);
    else label = ANIMAL_EMOJI[key] ?? title.slice(0, 2).toUpperCase();
  }

  return (
    <View style={{
      width: size, height: size,
      borderRadius: size * 0.2,
      backgroundColor: BG,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {render
        ? render(size * 0.8)
        : <Text style={{ fontSize: size * 0.45, fontWeight: '900', color: STROKE }}>{label}</Text>
      }
    </View>
  );
}
