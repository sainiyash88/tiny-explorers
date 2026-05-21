import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface Props { size?: number }

export default function RabbitCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Long ears */}
      <Ellipse cx="32" cy="22" rx="9" ry="20" fill="#F4B8D4" />
      <Ellipse cx="32" cy="22" rx="5" ry="15" fill="#F9D0E4" />
      <Ellipse cx="58" cy="22" rx="9" ry="20" fill="#F4B8D4" />
      <Ellipse cx="58" cy="22" rx="5" ry="15" fill="#F9D0E4" />

      {/* Head */}
      <Circle cx="45" cy="54" r="28" fill="#F4B8D4" />

      {/* Eyes */}
      <Circle cx="35" cy="50" r="7" fill="white" />
      <Circle cx="55" cy="50" r="7" fill="white" />
      <Circle cx="35" cy="50" r="4" fill="#E84393" />
      <Circle cx="55" cy="50" r="4" fill="#E84393" />
      <Circle cx="36" cy="48" r="1.5" fill="white" />
      <Circle cx="56" cy="48" r="1.5" fill="white" />

      {/* Nose */}
      <Ellipse cx="45" cy="61" rx="4" ry="3" fill="#E84393" />

      {/* Mouth */}
      <Path d="M 45 63 Q 40 68 36 66" stroke="#C0306A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M 45 63 Q 50 68 54 66" stroke="#C0306A" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <Circle cx="28" cy="60" r="7" fill="#F090C0" opacity={0.4} />
      <Circle cx="62" cy="60" r="7" fill="#F090C0" opacity={0.4} />
    </Svg>
  );
}
