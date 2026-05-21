import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface Props { size?: number }

export default function ElephantCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Ears */}
      <Ellipse cx="20" cy="45" rx="14" ry="18" fill="#A0A8C8" />
      <Ellipse cx="20" cy="45" rx="9" ry="13" fill="#C8AABB" />
      <Ellipse cx="70" cy="45" rx="14" ry="18" fill="#A0A8C8" />
      <Ellipse cx="70" cy="45" rx="9" ry="13" fill="#C8AABB" />

      {/* Head */}
      <Circle cx="45" cy="42" r="26" fill="#B8C0DC" />

      {/* Trunk */}
      <Path d="M 38 62 Q 30 72 35 82 Q 40 88 45 82" stroke="#A0A8C8" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* Trunk tip */}
      <Ellipse cx="45" cy="82" rx="6" ry="4" fill="#A0A8C8" />

      {/* Tusks */}
      <Path d="M 36 64 Q 28 72 32 76" stroke="#FFF8DC" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Path d="M 54 64 Q 62 72 58 76" stroke="#FFF8DC" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Eyes */}
      <Circle cx="35" cy="36" r="7" fill="white" />
      <Circle cx="55" cy="36" r="7" fill="white" />
      <Circle cx="36" cy="36" r="4" fill="#2A2A3A" />
      <Circle cx="56" cy="36" r="4" fill="#2A2A3A" />
      <Circle cx="37.5" cy="34.5" r="1.8" fill="white" />
      <Circle cx="57.5" cy="34.5" r="1.8" fill="white" />

      {/* Eyebrows — friendly raised look */}
      <Path d="M 30 28 Q 36 24 42 28" stroke="#8890B0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Path d="M 48 28 Q 54 24 60 28" stroke="#8890B0" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <Path d="M 36 55 Q 45 63 54 55" stroke="#8890B0" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <Circle cx="30" cy="50" r="7" fill="#D4A0B0" opacity={0.4} />
      <Circle cx="60" cy="50" r="7" fill="#D4A0B0" opacity={0.4} />
    </Svg>
  );
}
