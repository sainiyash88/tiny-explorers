import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function PeachCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Leaf */}
      <Path d="M 45 14 Q 55 6 60 16 Q 52 20 45 14" fill="#4CAF50" />
      {/* Stem */}
      <Path d="M 45 14 L 45 20" stroke="#6D4C41" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <Circle cx="45" cy="54" r="30" fill="#FF8A65" />
      {/* Blush/crease */}
      <Path d="M 45 24 Q 42 54 45 84" stroke="#FF5722" strokeWidth="3" fill="none" opacity={0.25} />
      {/* Highlight */}
      <Ellipse cx="34" cy="40" rx="7" ry="9" fill="#FFCCBC" opacity={0.55} />
      {/* Eyes */}
      <Circle cx="36" cy="50" r="5" fill="white" />
      <Circle cx="54" cy="50" r="5" fill="white" />
      <Circle cx="36" cy="50" r="2.5" fill="#1A1A1A" />
      <Circle cx="54" cy="50" r="2.5" fill="#1A1A1A" />
      <Circle cx="37" cy="49" r="1" fill="white" />
      <Circle cx="55" cy="49" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 38 60 Q 45 67 52 60" stroke="#BF360C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="28" cy="58" r="6" fill="#FFAB91" opacity={0.5} />
      <Circle cx="62" cy="58" r="6" fill="#FFAB91" opacity={0.5} />
    </Svg>
  );
}
