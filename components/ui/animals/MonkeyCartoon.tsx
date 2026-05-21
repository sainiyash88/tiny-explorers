import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface Props { size?: number }

export default function MonkeyCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Ears */}
      <Circle cx="18" cy="42" r="13" fill="#8B5E2A" />
      <Circle cx="18" cy="42" r="8"  fill="#C8845A" />
      <Circle cx="72" cy="42" r="13" fill="#8B5E2A" />
      <Circle cx="72" cy="42" r="8"  fill="#C8845A" />

      {/* Head */}
      <Circle cx="45" cy="40" r="28" fill="#A0682E" />

      {/* Face patch */}
      <Ellipse cx="45" cy="50" rx="18" ry="16" fill="#D4956A" />

      {/* Eyes */}
      <Circle cx="35" cy="36" r="7.5" fill="white" />
      <Circle cx="55" cy="36" r="7.5" fill="white" />
      <Circle cx="36" cy="36" r="4.5" fill="#1A0A00" />
      <Circle cx="56" cy="36" r="4.5" fill="#1A0A00" />
      <Circle cx="37.5" cy="34.5" r="2" fill="white" />
      <Circle cx="57.5" cy="34.5" r="2" fill="white" />

      {/* Nose */}
      <Ellipse cx="45" cy="48" rx="6" ry="4" fill="#7A4020" />
      <Circle cx="43" cy="47" r="1.5" fill="#3A1A08" />
      <Circle cx="47" cy="47" r="1.5" fill="#3A1A08" />

      {/* Big grin */}
      <Path d="M 33 56 Q 45 68 57 56" stroke="#7A4020" strokeWidth="2.5" fill="#D4956A" strokeLinecap="round" />
      {/* Teeth */}
      <Path d="M 37 57 Q 45 64 53 57" fill="white" />

      {/* Eyebrows — cheeky raised */}
      <Path d="M 29 27 Q 36 22 42 27" stroke="#5A3010" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Path d="M 48 27 Q 54 22 61 27" stroke="#5A3010" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <Circle cx="28" cy="48" r="7" fill="#E07050" opacity={0.35} />
      <Circle cx="62" cy="48" r="7" fill="#E07050" opacity={0.35} />

      {/* Tuft of hair on top */}
      <Path d="M 30 18 Q 35 8 45 12 Q 55 8 60 18" stroke="#5A3010" strokeWidth="5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
