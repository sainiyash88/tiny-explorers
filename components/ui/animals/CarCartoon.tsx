import Svg, { Rect, Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function CarCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Body */}
      <Rect x="8" y="44" width="74" height="28" rx="8" fill="#E53935" />
      {/* Roof */}
      <Path d="M 22 44 Q 26 24 42 22 L 58 22 Q 72 24 70 44 Z" fill="#EF9A9A" />
      {/* Windows */}
      <Rect x="26" y="26" width="16" height="16" rx="4" fill="#B3E5FC" />
      <Rect x="46" y="26" width="16" height="16" rx="4" fill="#B3E5FC" />
      {/* Eyes on windshield */}
      <Circle cx="31" cy="34" r="4" fill="white" />
      <Circle cx="41" cy="34" r="4" fill="white" />
      <Circle cx="31" cy="34" r="2" fill="#1A1A1A" />
      <Circle cx="41" cy="34" r="2" fill="#1A1A1A" />
      <Circle cx="32" cy="33" r="0.8" fill="white" />
      <Circle cx="42" cy="33" r="0.8" fill="white" />
      {/* Smile (grille) */}
      <Path d="M 28 56 Q 45 62 62 56" stroke="#B71C1C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Wheels */}
      <Circle cx="23" cy="72" r="10" fill="#37474F" />
      <Circle cx="23" cy="72" r="5" fill="#78909C" />
      <Circle cx="67" cy="72" r="10" fill="#37474F" />
      <Circle cx="67" cy="72" r="5" fill="#78909C" />
      {/* Headlights */}
      <Ellipse cx="80" cy="54" rx="5" ry="4" fill="#FFF176" />
      <Ellipse cx="10" cy="54" rx="5" ry="4" fill="#FFF176" />
    </Svg>
  );
}
