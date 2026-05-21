import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function LemonCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Body - lemon oval shape */}
      <Path d="M 45 15 Q 78 20 78 54 Q 78 78 45 80 Q 12 78 12 54 Q 12 20 45 15 Z" fill="#FDD835" />
      {/* Bumpy tip right */}
      <Path d="M 75 36 Q 84 44 76 50 Q 72 44 75 36" fill="#F9A825" />
      {/* Bumpy tip left */}
      <Path d="M 15 36 Q 6 44 14 50 Q 18 44 15 36" fill="#F9A825" />
      {/* Highlight */}
      <Ellipse cx="33" cy="36" rx="8" ry="10" fill="#FFF176" opacity={0.5} />
      {/* Eyes */}
      <Circle cx="36" cy="50" r="5" fill="white" />
      <Circle cx="54" cy="50" r="5" fill="white" />
      <Circle cx="36" cy="50" r="2.5" fill="#1A1A1A" />
      <Circle cx="54" cy="50" r="2.5" fill="#1A1A1A" />
      <Circle cx="37" cy="49" r="1" fill="white" />
      <Circle cx="55" cy="49" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 37 60 Q 45 67 53 60" stroke="#F57F17" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="28" cy="58" r="6" fill="#FFF176" opacity={0.6} />
      <Circle cx="62" cy="58" r="6" fill="#FFF176" opacity={0.6} />
    </Svg>
  );
}
