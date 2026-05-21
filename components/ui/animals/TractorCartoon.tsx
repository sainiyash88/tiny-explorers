import Svg, { Rect, Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function TractorCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Body */}
      <Rect x="30" y="34" width="46" height="28" rx="6" fill="#F9A825" />
      {/* Cab */}
      <Rect x="48" y="18" width="26" height="18" rx="5" fill="#F57F17" />
      {/* Windshield */}
      <Rect x="52" y="22" width="18" height="12" rx="3" fill="#B3E5FC" />
      {/* Eyes */}
      <Circle cx="58" cy="28" r="4" fill="white" />
      <Circle cx="66" cy="28" r="4" fill="white" />
      <Circle cx="58" cy="28" r="2" fill="#1A1A1A" />
      <Circle cx="66" cy="28" r="2" fill="#1A1A1A" />
      <Circle cx="59" cy="27" r="0.8" fill="white" />
      <Circle cx="67" cy="27" r="0.8" fill="white" />
      {/* Smile */}
      <Path d="M 54 50 Q 62 57 70 50" stroke="#E65100" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Exhaust pipe */}
      <Rect x="46" y="10" width="5" height="12" rx="2" fill="#5D4037" />
      <Ellipse cx="48" cy="10" rx="4" ry="3" fill="#424242" />
      {/* Big rear wheel */}
      <Circle cx="44" cy="68" r="18" fill="#37474F" />
      <Circle cx="44" cy="68" r="9" fill="#78909C" />
      {/* Small front wheel */}
      <Circle cx="76" cy="68" r="10" fill="#37474F" />
      <Circle cx="76" cy="68" r="5" fill="#78909C" />
    </Svg>
  );
}
