import { View } from 'react-native';
import Svg, { Path, Circle, Ellipse, Rect, Polygon, G } from 'react-native-svg';

const FILL = '#4a4a6a';
const SIZE = 36; // base unit — SVGs scale proportionally

function CarSilhouette() {
  return (
    <Svg width={SIZE * 1.4} height={SIZE * 0.8} viewBox="0 0 140 80">
      {/* Body */}
      <Rect x="5" y="32" width="130" height="28" rx="6" fill={FILL} />
      {/* Roof */}
      <Path d="M24 32 L36 10 L104 10 L116 32 Z" fill={FILL} />
      {/* Wheel wells */}
      <Circle cx="34" cy="62" r="16" fill={FILL} />
      <Circle cx="106" cy="62" r="16" fill={FILL} />
      {/* Hubcaps */}
      <Circle cx="34" cy="62" r="7" fill="#e8e8f0" />
      <Circle cx="106" cy="62" r="7" fill="#e8e8f0" />
    </Svg>
  );
}

function ElephantSilhouette() {
  return (
    <Svg width={SIZE * 1.4} height={SIZE} viewBox="0 0 140 100">
      {/* Body */}
      <Ellipse cx="85" cy="60" rx="48" ry="34" fill={FILL} />
      {/* Head */}
      <Circle cx="30" cy="44" r="26" fill={FILL} />
      {/* Ear */}
      <Ellipse cx="42" cy="32" rx="16" ry="20" fill={FILL} />
      {/* Trunk */}
      <Path d="M14 58 Q2 72 10 90 Q14 98 22 90 Q16 76 24 62" fill={FILL} />
      {/* Legs */}
      <Rect x="50" y="86" width="14" height="14" rx="4" fill={FILL} />
      <Rect x="70" y="86" width="14" height="14" rx="4" fill={FILL} />
      <Rect x="90" y="86" width="14" height="14" rx="4" fill={FILL} />
      <Rect x="110" y="86" width="14" height="14" rx="4" fill={FILL} />
      {/* Tail */}
      <Path d="M130 52 Q140 44 136 54" stroke={FILL} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Eye */}
      <Circle cx="20" cy="38" r="3" fill="#e8e8f0" />
    </Svg>
  );
}

function OrangeSilhouette() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 100 110">
      {/* Stem */}
      <Rect x="46" y="6" width="7" height="14" rx="3" fill={FILL} />
      {/* Leaf */}
      <Ellipse cx="64" cy="10" rx="14" ry="7" fill={FILL} transform="rotate(-30 64 10)" />
      {/* Orange body — rounder than apple */}
      <Circle cx="50" cy="68" r="40" fill={FILL} />
      {/* Navel dot */}
      <Circle cx="50" cy="106" r="5" fill="#e8e8f0" />
    </Svg>
  );
}

function CarrotSilhouette() {
  // Drawn directly at 45°: tip bottom-left, leaves fan top-right
  return (
    <Svg width={SIZE * 1.4} height={SIZE * 1.1} viewBox="0 0 140 110">
      {/* Body — triangle, tip bottom-left, wide end top-right */}
      <Path d="M18 92 L74 12 L98 36 Z" fill={FILL} />
      {/* Leaves fanning from base (86,24) toward top-right */}
      <Path d="M86 24 Q100 6 116 10"  stroke={FILL} strokeWidth="5" fill="none" strokeLinecap="round" />
      <Path d="M86 24 Q94 4 104 2"    stroke={FILL} strokeWidth="5" fill="none" strokeLinecap="round" />
      <Path d="M86 24 Q106 14 122 8"  stroke={FILL} strokeWidth="5" fill="none" strokeLinecap="round" />
      <Path d="M86 24 Q106 32 120 26" stroke={FILL} strokeWidth="5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

function HoneycombIcon() {
  // 7 hexagons in honeycomb layout, golden yellow fill
  const HEX = 'M0,-18 L15.6,-9 L15.6,9 L0,18 L-15.6,9 L-15.6,-9 Z';
  const FILL = '#F9A825';
  const STROKE = '#E65100';
  const SW = 2;
  return (
    <Svg width={SIZE * 1.1} height={SIZE * 0.9} viewBox="0 0 120 96">
      <G>
        {/* Top row: 3 hexagons */}
        <G transform="translate(22,20)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
        <G transform="translate(60,20)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
        <G transform="translate(98,20)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
        {/* Middle row: 2 hexagons (offset) */}
        <G transform="translate(41,51)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
        <G transform="translate(79,51)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
        {/* Bottom row: 2 hexagons */}
        <G transform="translate(22,82)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
        <G transform="translate(60,82)"><Path d={HEX} fill={FILL} stroke={STROKE} strokeWidth={SW} /></G>
      </G>
    </Svg>
  );
}

function TreeSilhouette() {
  return (
    <Svg width={SIZE} height={SIZE * 1.2} viewBox="0 0 100 120">
      {/* Trunk */}
      <Rect x="40" y="82" width="20" height="34" rx="4" fill={FILL} />
      {/* Bottom foliage layer */}
      <Polygon points="50,30 92,82 8,82" fill={FILL} />
      {/* Middle foliage layer */}
      <Polygon points="50,10 84,58 16,58" fill={FILL} />
      {/* Top foliage layer */}
      <Polygon points="50,0 74,38 26,38" fill={FILL} />
    </Svg>
  );
}

const MAP: Record<string, () => JSX.Element> = {
  car: CarSilhouette,
  elephant: ElephantSilhouette,
  orange: OrangeSilhouette,
  carrot: CarrotSilhouette,
  tree: TreeSilhouette,
  honeycomb: HoneycombIcon,
};

interface Props { name: string }

export default function SilhouetteIcon({ name }: Props) {
  const Component = MAP[name];
  if (!Component) return null;
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Component />
    </View>
  );
}
