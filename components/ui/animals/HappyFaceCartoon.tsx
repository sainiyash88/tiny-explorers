import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function HappyFaceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="38" fill="#FDD835" />
      <Circle cx="45" cy="45" r="38" fill="#FDD835" />
      {/* Eyes */}
      <Ellipse cx="32" cy="36" rx="6" ry="7" fill="white" />
      <Ellipse cx="58" cy="36" rx="6" ry="7" fill="white" />
      <Circle cx="32" cy="37" r="3.5" fill="#1A1A1A" />
      <Circle cx="58" cy="37" r="3.5" fill="#1A1A1A" />
      <Circle cx="33" cy="35" r="1.2" fill="white" />
      <Circle cx="59" cy="35" r="1.2" fill="white" />
      {/* Big smile */}
      <Path d="M 26 52 Q 45 70 64 52" stroke="#E65100" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="22" cy="54" r="8" fill="#FF8A65" opacity={0.4} />
      <Circle cx="68" cy="54" r="8" fill="#FF8A65" opacity={0.4} />
    </Svg>
  );
}
