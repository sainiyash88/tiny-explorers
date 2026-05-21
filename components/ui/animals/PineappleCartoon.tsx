import Svg, { Circle, Path, Ellipse, Line } from 'react-native-svg';

interface Props { size?: number }

export default function PineappleCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Crown leaves */}
      <Path d="M 45 14 Q 40 4  34 10 Q 40 14 45 14" fill="#388E3C" />
      <Path d="M 45 14 Q 50 4  56 10 Q 50 14 45 14" fill="#388E3C" />
      <Path d="M 45 14 Q 42 2  45 10" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Path d="M 45 14 Q 36 6  32 12 Q 38 16 45 14" fill="#43A047" />
      <Path d="M 45 14 Q 54 6  58 12 Q 52 16 45 14" fill="#43A047" />
      {/* Body */}
      <Ellipse cx="45" cy="56" rx="24" ry="30" fill="#F9A825" />
      {/* Diamond texture */}
      <Path d="M 30 40 L 45 36 L 60 40 L 60 52 L 45 56 L 30 52 Z" fill="#FB8C00" opacity={0.3} />
      <Path d="M 30 52 L 45 48 L 60 52 L 60 64 L 45 68 L 30 64 Z" fill="#FB8C00" opacity={0.3} />
      <Line x1="30" y1="40" x2="60" y2="40" stroke="#E65100" strokeWidth="1" opacity={0.3} />
      <Line x1="30" y1="52" x2="60" y2="52" stroke="#E65100" strokeWidth="1" opacity={0.3} />
      <Line x1="30" y1="64" x2="60" y2="64" stroke="#E65100" strokeWidth="1" opacity={0.3} />
      {/* Eyes */}
      <Circle cx="37" cy="48" r="5" fill="white" />
      <Circle cx="53" cy="48" r="5" fill="white" />
      <Circle cx="37" cy="48" r="2.5" fill="#1A1A1A" />
      <Circle cx="53" cy="48" r="2.5" fill="#1A1A1A" />
      <Circle cx="38" cy="47" r="1" fill="white" />
      <Circle cx="54" cy="47" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 38 58 Q 45 64 52 58" stroke="#E65100" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="28" cy="56" r="6" fill="#FFD54F" opacity={0.5} />
      <Circle cx="62" cy="56" r="6" fill="#FFD54F" opacity={0.5} />
    </Svg>
  );
}
