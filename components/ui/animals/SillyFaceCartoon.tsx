import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function SillyFaceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="38" fill="#FF8A65" />
      {/* One winking eye */}
      <Ellipse cx="32" cy="36" rx="6" ry="7" fill="white" />
      <Circle cx="32" cy="37" r="3.5" fill="#1A1A1A" />
      <Circle cx="33" cy="35" r="1.2" fill="white" />
      {/* Wink */}
      <Path d="M 52 34 Q 58 30 64 34" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Tongue out */}
      <Path d="M 32 55 Q 45 68 58 55" stroke="#BF360C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Ellipse cx="45" cy="64" rx="10" ry="8" fill="#E53935" />
      <Ellipse cx="45" cy="68" rx="10" ry="4" fill="#C62828" />
      {/* Cheeks */}
      <Circle cx="20" cy="52" r="8" fill="#FF5722" opacity={0.35} />
      <Circle cx="70" cy="52" r="8" fill="#FF5722" opacity={0.35} />
      {/* Raised eyebrow */}
      <Path d="M 26 28 Q 32 24 38 28" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
