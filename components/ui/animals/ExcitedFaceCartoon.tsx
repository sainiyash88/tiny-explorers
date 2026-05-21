import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function ExcitedFaceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="38" fill="#FF7043" />
      {/* Wide open eyes */}
      <Circle cx="32" cy="36" r="9" fill="white" />
      <Circle cx="58" cy="36" r="9" fill="white" />
      <Circle cx="32" cy="37" r="5" fill="#1A1A1A" />
      <Circle cx="58" cy="37" r="5" fill="#1A1A1A" />
      <Circle cx="34" cy="34" r="2" fill="white" />
      <Circle cx="60" cy="34" r="2" fill="white" />
      {/* Raised eyebrows */}
      <Path d="M 24 24 Q 32 19 40 24" stroke="#BF360C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Path d="M 50 24 Q 58 19 66 24" stroke="#BF360C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Big open mouth smile */}
      <Path d="M 26 54 Q 45 74 64 54" stroke="#BF360C" strokeWidth="3" fill="#BF360C" />
      <Ellipse cx="45" cy="62" rx="18" ry="12" fill="#C62828" />
      <Ellipse cx="45" cy="57" rx="18" ry="6" fill="#E53935" />
      {/* Cheeks */}
      <Circle cx="18" cy="52" r="9" fill="#FF5722" opacity={0.4} />
      <Circle cx="72" cy="52" r="9" fill="#FF5722" opacity={0.4} />
      {/* Stars around */}
      <Path d="M 10 20 L 12 14 L 14 20 L 8 16 L 16 16 Z" fill="#FDD835" />
      <Path d="M 76 18 L 78 12 L 80 18 L 74 14 L 82 14 Z" fill="#FDD835" />
    </Svg>
  );
}
