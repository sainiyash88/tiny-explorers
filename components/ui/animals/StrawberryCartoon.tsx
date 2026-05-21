import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function StrawberryCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Leaves */}
      <Path d="M 45 18 Q 38 10 32 16 Q 38 20 45 18" fill="#388E3C" />
      <Path d="M 45 18 Q 52 10 58 16 Q 52 20 45 18" fill="#388E3C" />
      <Path d="M 45 18 Q 44 8 45 14" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Body */}
      <Path d="M 45 20 Q 72 26 68 56 Q 62 76 45 80 Q 28 76 22 56 Q 18 26 45 20 Z" fill="#E53935" />
      {/* Seeds */}
      <Ellipse cx="38" cy="42" rx="2" ry="2.5" fill="#FFCDD2" />
      <Ellipse cx="52" cy="42" rx="2" ry="2.5" fill="#FFCDD2" />
      <Ellipse cx="34" cy="54" rx="2" ry="2.5" fill="#FFCDD2" />
      <Ellipse cx="56" cy="54" rx="2" ry="2.5" fill="#FFCDD2" />
      <Ellipse cx="45" cy="60" rx="2" ry="2.5" fill="#FFCDD2" />
      {/* Eyes */}
      <Circle cx="37" cy="35" r="5" fill="white" />
      <Circle cx="53" cy="35" r="5" fill="white" />
      <Circle cx="37" cy="35" r="2.5" fill="#1A1A1A" />
      <Circle cx="53" cy="35" r="2.5" fill="#1A1A1A" />
      <Circle cx="38" cy="34" r="1" fill="white" />
      <Circle cx="54" cy="34" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 39 44 Q 45 50 51 44" stroke="#B71C1C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="30" cy="44" r="5" fill="#FF8A80" opacity={0.4} />
      <Circle cx="60" cy="44" r="5" fill="#FF8A80" opacity={0.4} />
    </Svg>
  );
}
