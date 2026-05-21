import Svg, { Rect, Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function MotorbikeCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Frame */}
      <Path d="M 22 58 L 40 36 L 58 36 L 68 58" stroke="#E65100" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Seat */}
      <Ellipse cx="49" cy="34" rx="14" ry="5" fill="#BF360C" />
      {/* Engine body */}
      <Rect x="36" y="44" width="20" height="14" rx="4" fill="#E65100" />
      {/* Eyes on engine */}
      <Circle cx="42" cy="50" r="4" fill="white" />
      <Circle cx="52" cy="50" r="4" fill="white" />
      <Circle cx="42" cy="50" r="2" fill="#1A1A1A" />
      <Circle cx="52" cy="50" r="2" fill="#1A1A1A" />
      <Circle cx="43" cy="49" r="0.8" fill="white" />
      <Circle cx="53" cy="49" r="0.8" fill="white" />
      {/* Smile */}
      <Path d="M 40 56 Q 47 61 54 56" stroke="#BF360C" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Handlebars */}
      <Path d="M 58 36 L 66 30 M 66 30 L 72 32" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
      {/* Wheels */}
      <Circle cx="22" cy="68" r="14" fill="#37474F" />
      <Circle cx="22" cy="68" r="7" fill="#78909C" />
      <Circle cx="68" cy="68" r="14" fill="#37474F" />
      <Circle cx="68" cy="68" r="7" fill="#78909C" />
      {/* Exhaust */}
      <Path d="M 36 56 Q 26 62 18 58" stroke="#9E9E9E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
