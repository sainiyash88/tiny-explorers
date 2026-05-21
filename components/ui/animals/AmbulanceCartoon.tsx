import Svg, { Rect, Circle, Path, Ellipse, Line } from 'react-native-svg';

interface Props { size?: number }

export default function AmbulanceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Body */}
      <Rect x="6" y="36" width="78" height="32" rx="6" fill="#FAFAFA" />
      {/* Cab roof */}
      <Rect x="48" y="22" width="34" height="16" rx="5" fill="#FAFAFA" />
      {/* Red stripe */}
      <Rect x="6" y="48" width="78" height="8" fill="#E53935" />
      {/* Cross symbol */}
      <Rect x="18" y="40" width="14" height="4" rx="2" fill="#E53935" />
      <Rect x="23" y="35" width="4" height="14" rx="2" fill="#E53935" />
      {/* Windshield */}
      <Rect x="52" y="26" width="26" height="10" rx="3" fill="#B3E5FC" />
      {/* Eyes */}
      <Circle cx="60" cy="31" r="4" fill="white" />
      <Circle cx="70" cy="31" r="4" fill="white" />
      <Circle cx="60" cy="31" r="2" fill="#1A1A1A" />
      <Circle cx="70" cy="31" r="2" fill="#1A1A1A" />
      <Circle cx="61" cy="30" r="0.8" fill="white" />
      <Circle cx="71" cy="30" r="0.8" fill="white" />
      {/* Smile */}
      <Path d="M 57 58 Q 65 64 73 58" stroke="#C62828" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Siren */}
      <Rect x="60" y="18" width="14" height="6" rx="3" fill="#E53935" />
      {/* Wheels */}
      <Circle cx="22" cy="68" r="10" fill="#37474F" />
      <Circle cx="22" cy="68" r="5" fill="#78909C" />
      <Circle cx="68" cy="68" r="10" fill="#37474F" />
      <Circle cx="68" cy="68" r="5" fill="#78909C" />
    </Svg>
  );
}
