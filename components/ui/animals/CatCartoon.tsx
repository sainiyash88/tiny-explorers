import Svg, { Circle, Ellipse, Path, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function CatCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Ears */}
      <Polygon points="20,30 14,10 34,24" fill="#E8A0C8" />
      <Polygon points="22,28 18,14 32,24" fill="#F5C8DC" />
      <Polygon points="70,30 76,10 56,24" fill="#E8A0C8" />
      <Polygon points="68,28 72,14 58,24" fill="#F5C8DC" />

      {/* Head */}
      <Circle cx="45" cy="46" r="28" fill="#F0C8E0" />

      {/* Forehead stripe */}
      <Path d="M 40 22 Q 45 18 50 22 Q 47 28 45 26 Q 43 28 40 22" fill="#D8A0C0" />
      <Path d="M 38 26 Q 45 24 52 26" stroke="#D8A0C0" strokeWidth="2" fill="none" />

      {/* Eyes */}
      <Ellipse cx="34" cy="42" rx="8" ry="9" fill="white" />
      <Ellipse cx="56" cy="42" rx="8" ry="9" fill="white" />
      {/* Pupils — vertical slit like a real cat */}
      <Ellipse cx="34" cy="42" rx="3" ry="6" fill="#2A1A30" />
      <Ellipse cx="56" cy="42" rx="3" ry="6" fill="#2A1A30" />
      <Circle cx="35" cy="40" r="1.5" fill="white" />
      <Circle cx="57" cy="40" r="1.5" fill="white" />

      {/* Nose */}
      <Polygon points="45,52 42,55 48,55" fill="#E87090" />

      {/* Mouth */}
      <Path d="M 45 55 Q 40 60 36 58" stroke="#C05070" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M 45 55 Q 50 60 54 58" stroke="#C05070" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Whiskers */}
      <Path d="M 20 52 L 38 54" stroke="#C0A0B8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 20 56 L 38 56" stroke="#C0A0B8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 20 60 L 38 58" stroke="#C0A0B8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 70 52 L 52 54" stroke="#C0A0B8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 70 56 L 52 56" stroke="#C0A0B8" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 70 60 L 52 58" stroke="#C0A0B8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Cheeks */}
      <Circle cx="27" cy="54" r="7" fill="#F0A0C0" opacity={0.4} />
      <Circle cx="63" cy="54" r="7" fill="#F0A0C0" opacity={0.4} />
    </Svg>
  );
}
