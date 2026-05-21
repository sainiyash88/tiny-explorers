import Svg, { Circle, Ellipse, Path, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function FishCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Tail fin */}
      <Polygon points="18,30 6,16 6,60 18,46" fill="#FF6B35" />

      {/* Body */}
      <Ellipse cx="50" cy="45" rx="30" ry="22" fill="#FF8C42" />

      {/* Belly */}
      <Ellipse cx="50" cy="50" rx="22" ry="13" fill="#FFB380" />

      {/* Dorsal fin (top) */}
      <Path d="M 35 24 Q 50 10 65 24" fill="#E55A1C" />

      {/* Pectoral fin */}
      <Ellipse cx="42" cy="52" rx="10" ry="6" fill="#E55A1C" transform="rotate(-20, 42, 52)" />

      {/* Scales */}
      <Path d="M 45 32 Q 52 36 45 40" stroke="#E55A1C" strokeWidth="1.5" fill="none" />
      <Path d="M 55 30 Q 62 34 55 38" stroke="#E55A1C" strokeWidth="1.5" fill="none" />
      <Path d="M 50 40 Q 57 44 50 48" stroke="#E55A1C" strokeWidth="1.5" fill="none" />

      {/* Eye */}
      <Circle cx="70" cy="38" r="9" fill="white" />
      <Circle cx="71" cy="38" r="5.5" fill="#1A1A2E" />
      <Circle cx="73" cy="36" r="2" fill="white" />

      {/* Mouth */}
      <Path d="M 78 44 Q 82 48 78 52" stroke="#C04A10" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Stripes */}
      <Path d="M 38 25 Q 36 45 38 65" stroke="#E55A1C" strokeWidth="2" fill="none" opacity={0.5} />
      <Path d="M 52 24 Q 50 45 52 66" stroke="#E55A1C" strokeWidth="2" fill="none" opacity={0.5} />

      {/* Bubbles */}
      <Circle cx="76" cy="24" r="4" stroke="#88CCFF" strokeWidth="2" fill="none" />
      <Circle cx="82" cy="16" r="2.5" stroke="#88CCFF" strokeWidth="1.5" fill="none" />
    </Svg>
  );
}
