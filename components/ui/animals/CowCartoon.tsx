import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number }

export default function CowCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Ears */}
      <Ellipse cx="18" cy="34" rx="9" ry="11" fill="#E8E0D0" />
      <Ellipse cx="18" cy="34" rx="5" ry="7"  fill="#F0B8B8" />
      <Ellipse cx="72" cy="34" rx="9" ry="11" fill="#E8E0D0" />
      <Ellipse cx="72" cy="34" rx="5" ry="7"  fill="#F0B8B8" />

      {/* Horns */}
      <Path d="M 22 22 Q 18 10 26 12" stroke="#C8A870" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Path d="M 68 22 Q 72 10 64 12" stroke="#C8A870" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Head */}
      <Ellipse cx="45" cy="40" rx="26" ry="24" fill="#F0EAD8" />

      {/* Black patches */}
      <Ellipse cx="34" cy="30" rx="10" ry="8"  fill="#2A2A2A" opacity={0.85} />
      <Ellipse cx="60" cy="36" rx="8"  rx2="8" ry="7"  fill="#2A2A2A" opacity={0.85} />

      {/* Muzzle */}
      <Ellipse cx="45" cy="54" rx="14" ry="10" fill="#D4A8A0" />

      {/* Nostrils */}
      <Ellipse cx="40" cy="55" rx="3.5" ry="2.5" fill="#B87878" />
      <Ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill="#B87878" />

      {/* Eyes */}
      <Circle cx="34" cy="35" r="7" fill="white" />
      <Circle cx="56" cy="35" r="7" fill="white" />
      <Circle cx="35" cy="35" r="4" fill="#2A1A00" />
      <Circle cx="57" cy="35" r="4" fill="#2A1A00" />
      <Circle cx="36.5" cy="33.5" r="1.8" fill="white" />
      <Circle cx="58.5" cy="33.5" r="1.8" fill="white" />

      {/* Eyelashes — friendly cow look */}
      <Path d="M 28 30 Q 30 26 34 28" stroke="#2A1A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M 32 28 Q 34 24 38 27" stroke="#2A1A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M 50 28 Q 52 24 56 27" stroke="#2A1A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M 54 30 Q 56 26 60 28" stroke="#2A1A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <Path d="M 37 60 Q 45 66 53 60" stroke="#B87878" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Bell */}
      <Rect x="41" y="68" width="8" height="10" rx="2" fill="#FFD700" />
      <Path d="M 39 68 Q 45 72 51 68" stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="45" cy="78" r="2" fill="#B8860B" />
    </Svg>
  );
}
