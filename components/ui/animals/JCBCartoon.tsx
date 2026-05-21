import Svg, { Rect, Circle, Path, Polygon, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function JCBCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Cab body */}
      <Rect x="8" y="36" width="38" height="28" rx="4" fill="#F9A825" />
      {/* Cab roof */}
      <Rect x="10" y="26" width="32" height="12" rx="3" fill="#F57F17" />
      {/* Windshield */}
      <Rect x="14" y="28" width="24" height="8" rx="2" fill="#B3E5FC" />
      {/* Eyes */}
      <Circle cx="22" cy="32" r="3.5" fill="white" />
      <Circle cx="32" cy="32" r="3.5" fill="white" />
      <Circle cx="22" cy="32" r="1.8" fill="#1A1A1A" />
      <Circle cx="32" cy="32" r="1.8" fill="#1A1A1A" />
      <Circle cx="23" cy="31" r="0.7" fill="white" />
      <Circle cx="33" cy="31" r="0.7" fill="white" />
      {/* Smile (grille) */}
      <Path d="M 18 52 Q 27 58 36 52" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Arm base (boom) */}
      <Rect x="44" y="30" width="30" height="8" rx="3" fill="#E65100" transform="rotate(-20 44 30)" />
      {/* Arm stick (dipper) */}
      <Rect x="62" y="22" width="22" height="6" rx="3" fill="#BF360C" transform="rotate(30 62 22)" />
      {/* Bucket */}
      <Path d="M 72 42 L 68 54 L 82 54 L 80 42 Z" fill="#E65100" />
      <Path d="M 68 54 Q 75 60 82 54" stroke="#BF360C" strokeWidth="2" fill="none" />
      {/* Bucket teeth */}
      <Rect x="70" y="54" width="3" height="5" rx="1" fill="#BF360C" />
      <Rect x="75" y="54" width="3" height="5" rx="1" fill="#BF360C" />
      {/* Tracks */}
      <Rect x="6" y="64" width="44" height="12" rx="6" fill="#37474F" />
      <Rect x="9" y="66" width="38" height="8" rx="4" fill="#546E7A" />
      {/* Track wheels */}
      <Circle cx="14" cy="70" r="5" fill="#37474F" />
      <Circle cx="27" cy="70" r="5" fill="#37474F" />
      <Circle cx="40" cy="70" r="5" fill="#37474F" />
      <Circle cx="14" cy="70" r="2.5" fill="#78909C" />
      <Circle cx="27" cy="70" r="2.5" fill="#78909C" />
      <Circle cx="40" cy="70" r="2.5" fill="#78909C" />
    </Svg>
  );
}
