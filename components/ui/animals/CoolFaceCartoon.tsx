import Svg, { Circle, Path, Ellipse, Rect } from 'react-native-svg';

interface Props { size?: number }

export default function CoolFaceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="38" fill="#FDD835" />
      {/* Sunglasses frame */}
      <Path d="M 14 36 L 76 36" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <Rect x="14" y="30" width="28" height="20" rx="8" fill="#1A1A1A" />
      <Rect x="48" y="30" width="28" height="20" rx="8" fill="#1A1A1A" />
      {/* Lens shine */}
      <Path d="M 20 34 Q 24 31 28 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.5} />
      <Path d="M 54 34 Q 58 31 62 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.5} />
      {/* Bridge */}
      <Path d="M 42 38 L 48 38" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Cool smirk */}
      <Path d="M 32 58 Q 45 66 62 58" stroke="#E65100" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="20" cy="56" r="8" fill="#FF8A65" opacity={0.35} />
      <Circle cx="70" cy="56" r="8" fill="#FF8A65" opacity={0.35} />
    </Svg>
  );
}
