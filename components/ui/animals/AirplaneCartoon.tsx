import Svg, { Rect, Circle, Path, Ellipse, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function AirplaneCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Fuselage */}
      <Ellipse cx="45" cy="48" rx="32" ry="16" fill="#0288D1" />
      {/* Nose */}
      <Ellipse cx="76" cy="48" rx="8" ry="10" fill="#0288D1" />
      {/* Tail fin */}
      <Path d="M 14 48 Q 10 32 22 30 L 22 48 Z" fill="#01579B" />
      {/* Wings */}
      <Path d="M 50 48 Q 54 20 70 22 Q 66 40 50 48 Z" fill="#039BE5" />
      <Path d="M 50 48 Q 54 76 70 74 Q 66 56 50 48 Z" fill="#039BE5" />
      {/* Window row */}
      <Circle cx="58" cy="44" r="5" fill="#B3E5FC" />
      <Circle cx="46" cy="43" r="5" fill="#B3E5FC" />
      {/* Eyes */}
      <Circle cx="58" cy="44" r="3" fill="white" />
      <Circle cx="46" cy="43" r="3" fill="white" />
      <Circle cx="58" cy="44" r="1.5" fill="#1A1A1A" />
      <Circle cx="46" cy="43" r="1.5" fill="#1A1A1A" />
      {/* Smile */}
      <Path d="M 56 52 Q 65 58 74 53" stroke="#01579B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="52" cy="53" r="4" fill="#80D8FF" opacity={0.5} />
      <Circle cx="68" cy="52" r="4" fill="#80D8FF" opacity={0.5} />
    </Svg>
  );
}
