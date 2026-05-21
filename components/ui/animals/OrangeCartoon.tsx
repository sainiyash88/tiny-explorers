import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function OrangeCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Leaf */}
      <Path d="M 45 16 Q 54 8 58 16 Q 51 20 45 16" fill="#4CAF50" />
      {/* Stem */}
      <Path d="M 45 16 L 45 22" stroke="#6D4C41" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <Circle cx="45" cy="54" r="30" fill="#FB8C00" />
      {/* Segments hint */}
      <Path d="M 45 24 Q 45 54 45 84" stroke="#E65100" strokeWidth="1" opacity={0.2} />
      <Path d="M 18 46 Q 45 54 72 62" stroke="#E65100" strokeWidth="1" opacity={0.2} />
      <Path d="M 18 62 Q 45 54 72 46" stroke="#E65100" strokeWidth="1" opacity={0.2} />
      {/* Highlight */}
      <Ellipse cx="34" cy="40" rx="7" ry="8" fill="#FFCC80" opacity={0.5} />
      {/* Eyes */}
      <Circle cx="36" cy="50" r="5" fill="white" />
      <Circle cx="54" cy="50" r="5" fill="white" />
      <Circle cx="36" cy="50" r="2.5" fill="#1A1A1A" />
      <Circle cx="54" cy="50" r="2.5" fill="#1A1A1A" />
      <Circle cx="37" cy="49" r="1" fill="white" />
      <Circle cx="55" cy="49" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 38 60 Q 45 67 52 60" stroke="#E65100" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="28" cy="58" r="6" fill="#FFCC02" opacity={0.4} />
      <Circle cx="62" cy="58" r="6" fill="#FFCC02" opacity={0.4} />
    </Svg>
  );
}
