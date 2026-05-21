import Svg, { Ellipse, Rect, Path, Circle } from 'react-native-svg';
import { Text } from 'react-native';

// ─── Lion ────────────────────────────────────────────────────────────────────

function LionBody({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Torso */}
      <Ellipse cx="50" cy="42" rx="36" ry="26" fill="#E8972A" />
      {/* Lighter belly */}
      <Ellipse cx="50" cy="48" rx="22" ry="16" fill="#F5C878" opacity={0.55} />
      {/* Four legs */}
      <Rect x="20" y="62" width="13" height="28" rx="6" fill="#D4800F" />
      <Rect x="36" y="62" width="13" height="28" rx="6" fill="#D4800F" />
      <Rect x="51" y="62" width="13" height="28" rx="6" fill="#D4800F" />
      <Rect x="67" y="62" width="13" height="28" rx="6" fill="#D4800F" />
    </Svg>
  );
}

function LionTail({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <Path
        d="M 45 5 Q 75 20 68 50 Q 60 78 80 88"
        stroke="#C87A10" strokeWidth="9" fill="none" strokeLinecap="round"
      />
      {/* Fluffy tip — outer */}
      <Circle cx="80" cy="88" r="14" fill="#B86A00" />
      {/* Fluffy tip — inner highlight */}
      <Circle cx="80" cy="88" r="8" fill="#E8972A" />
    </Svg>
  );
}

// ─── Elephant ────────────────────────────────────────────────────────────────

function ElephantBody({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="40" rx="38" ry="27" fill="#8B9DC3" />
      {/* Lighter belly */}
      <Ellipse cx="50" cy="46" rx="24" ry="17" fill="#A8B8D8" opacity={0.55} />
      {/* Four thick legs */}
      <Rect x="14" y="62" width="16" height="30" rx="7" fill="#7A8CB8" />
      <Rect x="33" y="62" width="16" height="30" rx="7" fill="#7A8CB8" />
      <Rect x="51" y="62" width="16" height="30" rx="7" fill="#7A8CB8" />
      <Rect x="70" y="62" width="16" height="30" rx="7" fill="#7A8CB8" />
    </Svg>
  );
}

function ElephantEar({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Outer ear — same body color */}
      <Ellipse cx="54" cy="50" rx="40" ry="44" fill="#8B9DC3" />
      {/* Inner ear detail — slightly lighter */}
      <Ellipse cx="54" cy="52" rx="26" ry="30" fill="#A8B8D8" opacity={0.65} />
    </Svg>
  );
}

// ─── Monkey ──────────────────────────────────────────────────────────────────

function MonkeyBody({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Arms */}
      <Ellipse cx="13" cy="44" rx="11" ry="22" fill="#7A3B10" />
      <Ellipse cx="87" cy="44" rx="11" ry="22" fill="#7A3B10" />
      {/* Torso */}
      <Ellipse cx="50" cy="43" rx="32" ry="27" fill="#A0522D" />
      {/* Tummy */}
      <Ellipse cx="50" cy="49" rx="18" ry="15" fill="#C8845A" opacity={0.55} />
      {/* Legs */}
      <Rect x="26" y="64" width="15" height="27" rx="6" fill="#7A3B10" />
      <Rect x="59" y="64" width="15" height="27" rx="6" fill="#7A3B10" />
    </Svg>
  );
}

function MonkeyTail({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <Path
        d="M 25 95 Q 8 55 25 28 Q 45 5 68 20 Q 88 34 78 56 Q 68 74 82 84"
        stroke="#7A3B10" strokeWidth="10" fill="none" strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Giraffe ─────────────────────────────────────────────────────────────────

function GiraffeNeck({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Neck column */}
      <Rect x="28" y="4" width="44" height="92" rx="14" fill="#E8C547" />
      {/* Spots */}
      <Ellipse cx="42" cy="22" rx="7" ry="5" fill="#A07800" opacity={0.65} />
      <Ellipse cx="62" cy="40" rx="7" ry="5" fill="#A07800" opacity={0.65} />
      <Ellipse cx="40" cy="58" rx="7" ry="5" fill="#A07800" opacity={0.65} />
      <Ellipse cx="62" cy="76" rx="7" ry="5" fill="#A07800" opacity={0.65} />
    </Svg>
  );
}

function GiraffeBody({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Body */}
      <Ellipse cx="50" cy="38" rx="38" ry="25" fill="#E8C547" />
      {/* Spots */}
      <Ellipse cx="34" cy="32" rx="8" ry="6" fill="#A07800" opacity={0.65} />
      <Ellipse cx="56" cy="26" rx="7" ry="5" fill="#A07800" opacity={0.65} />
      <Ellipse cx="68" cy="40" rx="8" ry="6" fill="#A07800" opacity={0.65} />
      {/* Legs */}
      <Rect x="16" y="58" width="12" height="34" rx="4" fill="#D4A820" />
      <Rect x="32" y="58" width="12" height="34" rx="4" fill="#D4A820" />
      <Rect x="56" y="58" width="12" height="34" rx="4" fill="#D4A820" />
      <Rect x="72" y="58" width="12" height="34" rx="4" fill="#D4A820" />
    </Svg>
  );
}

// ─── Frog ────────────────────────────────────────────────────────────────────

function FrogLegs({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Left upper leg */}
      <Ellipse cx="22" cy="30" rx="12" ry="24" fill="#388E3C" />
      {/* Left lower leg + foot */}
      <Path d="M 10 52 Q 5 72 8 85 Q 12 92 22 90 Q 30 92 35 82 Q 28 68 22 52" fill="#4CAF50" />
      {/* Right upper leg */}
      <Ellipse cx="78" cy="30" rx="12" ry="24" fill="#388E3C" />
      {/* Right lower leg + foot */}
      <Path d="M 90 52 Q 95 72 92 85 Q 88 92 78 90 Q 70 92 65 82 Q 72 68 78 52" fill="#4CAF50" />
    </Svg>
  );
}

// ─── Parrot ──────────────────────────────────────────────────────────────────

function ParrotWing({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Wing shape */}
      <Path
        d="M 50 8 Q 92 18 96 55 Q 90 86 58 92 Q 26 96 12 72 Q 2 52 18 32 Q 30 12 50 8 Z"
        fill="#1565C0"
      />
      {/* Highlight */}
      <Path
        d="M 48 20 Q 80 28 83 56 Q 78 80 56 84 Q 34 80 24 62 Q 16 46 30 32 Q 40 20 48 20 Z"
        fill="#1E88E5" opacity={0.55}
      />
      {/* Feather lines */}
      <Path d="M 38 24 Q 74 38 76 68" stroke="#0D47A1" strokeWidth="2.5" fill="none" opacity={0.45} />
      <Path d="M 26 42 Q 62 54 64 80" stroke="#0D47A1" strokeWidth="2.5" fill="none" opacity={0.45} />
    </Svg>
  );
}

function ParrotTail({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Three coloured tail feathers */}
      <Path d="M 30 8 Q 16 50 22 96" stroke="#2E7D32" strokeWidth="13" fill="none" strokeLinecap="round" />
      <Path d="M 50 4 Q 50 50 50 96" stroke="#C62828" strokeWidth="13" fill="none" strokeLinecap="round" />
      <Path d="M 70 8 Q 84 50 78 96" stroke="#1565C0" strokeWidth="13" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Registry ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, (s: number) => React.ReactElement> = {
  'lion-head':   (s) => <Text style={{ fontSize: s * 0.62 }}>🦁</Text>,
  'lion-body':   (s) => <LionBody s={s} />,
  'lion-tail':   (s) => <LionTail s={s} />,

  'ele-trunk':   (s) => <Text style={{ fontSize: s * 0.62 }}>🐘</Text>,
  'ele-body':    (s) => <ElephantBody s={s} />,
  'ele-ear':     (s) => <ElephantEar s={s} />,

  'monk-face':   (s) => <Text style={{ fontSize: s * 0.62 }}>🐒</Text>,
  'monk-body':   (s) => <MonkeyBody s={s} />,
  'monk-tail':   (s) => <MonkeyTail s={s} />,

  'gir-head':    (s) => <Text style={{ fontSize: s * 0.62 }}>🦒</Text>,
  'gir-neck':    (s) => <GiraffeNeck s={s} />,
  'gir-body':    (s) => <GiraffeBody s={s} />,

  'frog-eyes':   (s) => <Text style={{ fontSize: s * 0.62 }}>👀</Text>,
  'frog-body':   (s) => <Text style={{ fontSize: s * 0.62 }}>🐸</Text>,
  'frog-legs':   (s) => <FrogLegs s={s} />,

  'par-head':    (s) => <Text style={{ fontSize: s * 0.62 }}>🦜</Text>,
  'par-wing':    (s) => <ParrotWing s={s} />,
  'par-tail':    (s) => <ParrotTail s={s} />,
};

interface Props {
  pieceId: string;
  size: number;
}

export default function PuzzlePieceIcon({ pieceId, size }: Props) {
  const render = ICON_MAP[pieceId];
  if (!render) return <Text style={{ fontSize: size * 0.5 }}>?</Text>;
  return render(size * 0.72);
}
