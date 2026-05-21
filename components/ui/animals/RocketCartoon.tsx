import Svg, { Rect, Circle, Path, Ellipse, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function RocketCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Flame */}
      <Path d="M 38 78 Q 45 68 52 78 Q 48 72 45 75 Q 42 72 38 78" fill="#FF6D00" />
      <Path d="M 40 80 Q 45 70 50 80 Q 47 75 45 77 Q 43 75 40 80" fill="#FDD835" />
      {/* Body */}
      <Rect x="30" y="30" width="30" height="46" rx="10" fill="#7B1FA2" />
      {/* Nose cone */}
      <Path d="M 30 34 Q 30 12 45 8 Q 60 12 60 34 Z" fill="#9C27B0" />
      {/* Window */}
      <Circle cx="45" cy="46" r="12" fill="#B3E5FC" />
      <Circle cx="45" cy="46" r="9" fill="#E1F5FE" />
      {/* Eyes */}
      <Circle cx="40" cy="44" r="4" fill="white" />
      <Circle cx="50" cy="44" r="4" fill="white" />
      <Circle cx="40" cy="44" r="2" fill="#1A1A1A" />
      <Circle cx="50" cy="44" r="2" fill="#1A1A1A" />
      <Circle cx="41" cy="43" r="0.8" fill="white" />
      <Circle cx="51" cy="43" r="0.8" fill="white" />
      {/* Smile */}
      <Path d="M 40 52 Q 45 57 50 52" stroke="#4A148C" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Fins */}
      <Path d="M 30 62 L 18 76 L 30 72 Z" fill="#6A1B9A" />
      <Path d="M 60 62 L 72 76 L 60 72 Z" fill="#6A1B9A" />
      {/* Stars */}
      <Circle cx="20" cy="20" r="2" fill="#FDD835" />
      <Circle cx="72" cy="14" r="2" fill="#FDD835" />
      <Circle cx="14" cy="50" r="1.5" fill="#FDD835" />
    </Svg>
  );
}
