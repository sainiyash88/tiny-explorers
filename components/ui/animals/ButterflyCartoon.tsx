import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface Props { size?: number }

export default function ButterflyCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Upper wings */}
      <Ellipse cx="26" cy="32" rx="22" ry="26" fill="#CE6BD4" transform="rotate(-20, 26, 32)" />
      <Ellipse cx="64" cy="32" rx="22" ry="26" fill="#CE6BD4" transform="rotate(20, 64, 32)" />

      {/* Upper wing inner pattern */}
      <Ellipse cx="28" cy="30" rx="14" ry="18" fill="#E89EEC" transform="rotate(-20, 28, 30)" />
      <Ellipse cx="62" cy="30" rx="14" ry="18" fill="#E89EEC" transform="rotate(20, 62, 30)" />

      {/* Upper wing spots */}
      <Circle cx="22" cy="22" r="6" fill="#FFD700" />
      <Circle cx="34" cy="16" r="4" fill="#FFD700" />
      <Circle cx="68" cy="22" r="6" fill="#FFD700" />
      <Circle cx="56" cy="16" r="4" fill="#FFD700" />
      <Circle cx="16" cy="36" r="4" fill="#FF8C42" />
      <Circle cx="74" cy="36" r="4" fill="#FF8C42" />

      {/* Lower wings */}
      <Ellipse cx="24" cy="62" rx="18" ry="16" fill="#CE6BD4" transform="rotate(15, 24, 62)" />
      <Ellipse cx="66" cy="62" rx="18" ry="16" fill="#CE6BD4" transform="rotate(-15, 66, 62)" />
      <Ellipse cx="24" cy="62" rx="11" ry="10" fill="#E89EEC" transform="rotate(15, 24, 62)" />
      <Ellipse cx="66" cy="62" rx="11" ry="10" fill="#E89EEC" transform="rotate(-15, 66, 62)" />
      <Circle cx="20" cy="68" r="4" fill="#FFD700" />
      <Circle cx="70" cy="68" r="4" fill="#FFD700" />

      {/* Body */}
      <Ellipse cx="45" cy="46" rx="5" ry="22" fill="#6A2070" />

      {/* Head */}
      <Circle cx="45" cy="22" r="9" fill="#6A2070" />

      {/* Eyes */}
      <Circle cx="41" cy="20" r="4" fill="white" />
      <Circle cx="49" cy="20" r="4" fill="white" />
      <Circle cx="42" cy="20" r="2.5" fill="#1A1A1A" />
      <Circle cx="50" cy="20" r="2.5" fill="#1A1A1A" />
      <Circle cx="43" cy="19" r="1" fill="white" />
      <Circle cx="51" cy="19" r="1" fill="white" />

      {/* Smile */}
      <Path d="M 41 26 Q 45 30 49 26" stroke="#E89EEC" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Antennae */}
      <Path d="M 42 14 Q 36 4 32 2" stroke="#6A2070" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Circle cx="32" cy="2" r="3" fill="#FFD700" />
      <Path d="M 48 14 Q 54 4 58 2" stroke="#6A2070" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Circle cx="58" cy="2" r="3" fill="#FFD700" />
    </Svg>
  );
}
