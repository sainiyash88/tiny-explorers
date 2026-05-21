import Svg, { Circle, Path, Ellipse, Line } from 'react-native-svg';

interface Props { size?: number }

export default function WatermelonCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Rind (outer green) */}
      <Path d="M 10 50 A 36 36 0 0 1 80 50 Z" fill="#4CAF50" />
      {/* White rind layer */}
      <Path d="M 14 50 A 32 32 0 0 1 76 50 Z" fill="#F1F8E9" />
      {/* Red flesh */}
      <Path d="M 18 50 A 28 28 0 0 1 72 50 Z" fill="#E53935" />
      {/* Seeds */}
      <Ellipse cx="32" cy="44" rx="2.5" ry="3.5" fill="#1A1A1A" transform="rotate(-15 32 44)" />
      <Ellipse cx="45" cy="40" rx="2.5" ry="3.5" fill="#1A1A1A" />
      <Ellipse cx="58" cy="44" rx="2.5" ry="3.5" fill="#1A1A1A" transform="rotate(15 58 44)" />
      {/* Eyes on rind */}
      <Circle cx="36" cy="56" r="5" fill="white" />
      <Circle cx="54" cy="56" r="5" fill="white" />
      <Circle cx="36" cy="56" r="2.5" fill="#1A1A1A" />
      <Circle cx="54" cy="56" r="2.5" fill="#1A1A1A" />
      <Circle cx="37" cy="55" r="1" fill="white" />
      <Circle cx="55" cy="55" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 37 65 Q 45 72 53 65" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="28" cy="62" r="5" fill="#FF8A80" opacity={0.4} />
      <Circle cx="62" cy="62" r="5" fill="#FF8A80" opacity={0.4} />
    </Svg>
  );
}
