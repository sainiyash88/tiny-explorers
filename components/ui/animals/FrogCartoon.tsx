import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface Props { size?: number }

export default function FrogCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Eye bumps on top of head */}
      <Circle cx="30" cy="24" r="12" fill="#3BAF50" />
      <Circle cx="60" cy="24" r="12" fill="#3BAF50" />

      {/* Head */}
      <Ellipse cx="45" cy="46" rx="28" ry="24" fill="#4CC560" />

      {/* Body bottom curve */}
      <Ellipse cx="45" cy="58" rx="24" ry="16" fill="#3BAF50" />

      {/* Belly */}
      <Ellipse cx="45" cy="56" rx="16" ry="12" fill="#A8E6B0" />

      {/* Eyes */}
      <Circle cx="30" cy="24" r="8" fill="white" />
      <Circle cx="60" cy="24" r="8" fill="white" />
      <Circle cx="31" cy="24" r="4.5" fill="#1A3A00" />
      <Circle cx="61" cy="24" r="4.5" fill="#1A3A00" />
      <Circle cx="32.5" cy="22.5" r="2" fill="white" />
      <Circle cx="62.5" cy="22.5" r="2" fill="white" />

      {/* Nostrils */}
      <Circle cx="41" cy="42" r="2" fill="#2A8A3A" />
      <Circle cx="49" cy="42" r="2" fill="#2A8A3A" />

      {/* Wide grin */}
      <Path d="M 28 54 Q 45 68 62 54" stroke="#2A8A3A" strokeWidth="3" fill="#A8E6B0" strokeLinecap="round" />
      {/* Teeth */}
      <Path d="M 34 55 Q 45 63 56 55" fill="white" />

      {/* Cheeks */}
      <Circle cx="24" cy="52" r="8" fill="#60D870" opacity={0.4} />
      <Circle cx="66" cy="52" r="8" fill="#60D870" opacity={0.4} />

      {/* Front feet peeking at bottom */}
      <Ellipse cx="28" cy="76" rx="10" ry="6" fill="#3BAF50" />
      <Ellipse cx="62" cy="76" rx="10" ry="6" fill="#3BAF50" />
      {/* Toes left */}
      <Circle cx="20" cy="78" r="4" fill="#3BAF50" />
      <Circle cx="28" cy="81" r="4" fill="#3BAF50" />
      <Circle cx="36" cy="78" r="4" fill="#3BAF50" />
      {/* Toes right */}
      <Circle cx="54" cy="78" r="4" fill="#3BAF50" />
      <Circle cx="62" cy="81" r="4" fill="#3BAF50" />
      <Circle cx="70" cy="78" r="4" fill="#3BAF50" />
    </Svg>
  );
}
