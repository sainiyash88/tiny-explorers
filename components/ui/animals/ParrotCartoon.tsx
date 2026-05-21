import Svg, { Circle, Ellipse, Path, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function ParrotCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Tail feathers */}
      <Path d="M 30 72 Q 20 88 35 85 Q 30 78 45 80" fill="#1E88E5" />
      <Path d="M 45 76 Q 40 90 52 88 Q 46 82 55 80" fill="#43A047" />
      <Path d="M 55 72 Q 60 88 50 86 Q 55 78 42 78" fill="#E53935" />

      {/* Body */}
      <Ellipse cx="45" cy="62" rx="20" ry="22" fill="#43A047" />

      {/* Wing */}
      <Path d="M 24 55 Q 14 65 20 78 Q 30 72 35 60 Z" fill="#1E88E5" />
      <Path d="M 26 58 Q 18 66 22 74" stroke="#1565C0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M 29 56 Q 21 64 25 72" stroke="#1565C0" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <Ellipse cx="45" cy="38" rx="14" ry="12" fill="#43A047" />

      {/* Head */}
      <Circle cx="45" cy="26" r="20" fill="#E53935" />

      {/* Forehead stripe */}
      <Ellipse cx="45" cy="14" rx="10" ry="6" fill="#FFD600" />

      {/* Eye ring */}
      <Circle cx="36" cy="24" r="9" fill="#FFF9C4" />
      {/* Eye */}
      <Circle cx="36" cy="24" r="6" fill="white" />
      <Circle cx="37" cy="24" r="3.5" fill="#1A1A1A" />
      <Circle cx="38" cy="22.5" r="1.5" fill="white" />

      {/* Beak */}
      <Path d="M 52 26 Q 64 28 60 34 Q 54 36 52 30 Z" fill="#FF8F00" />
      <Path d="M 52 28 Q 60 30 58 34" stroke="#E65100" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Cheek patch */}
      <Circle cx="43" cy="32" r="6" fill="#FFB300" opacity={0.6} />

      {/* Chest colour band */}
      <Ellipse cx="45" cy="52" rx="12" ry="8" fill="#FFD600" />

      {/* Feet */}
      <Path d="M 38 82 L 32 88 M 38 82 L 38 90 M 38 82 L 44 88" stroke="#FF8F00" strokeWidth="3" strokeLinecap="round" />
      <Path d="M 52 82 L 46 88 M 52 82 L 52 90 M 52 82 L 58 88" stroke="#FF8F00" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}
