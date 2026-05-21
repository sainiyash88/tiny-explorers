import Svg, { Circle, Path, Ellipse, Line } from 'react-native-svg';

interface Props { size?: number }

export default function SickFaceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="38" fill="#B2DFDB" />
      {/* Droopy eyes */}
      <Ellipse cx="32" cy="38" rx="6" ry="6" fill="white" />
      <Ellipse cx="58" cy="38" rx="6" ry="6" fill="white" />
      <Circle cx="32" cy="39" r="3" fill="#1A1A1A" />
      <Circle cx="58" cy="39" r="3" fill="#1A1A1A" />
      <Circle cx="33" cy="37" r="1" fill="white" />
      <Circle cx="59" cy="37" r="1" fill="white" />
      {/* Heavy droopy eyelids */}
      <Path d="M 26 34 Q 32 31 38 34" stroke="#78909C" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Path d="M 52 34 Q 58 31 64 34" stroke="#78909C" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Thermometer */}
      <Path d="M 68 18 L 68 38" stroke="#E53935" strokeWidth="3" strokeLinecap="round" />
      <Circle cx="68" cy="40" r="5" fill="#E53935" />
      <Path d="M 65 18 L 71 18" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      <Path d="M 65 24 L 71 24" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      <Path d="M 65 30 L 71 30" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      {/* Wavy frown */}
      <Path d="M 30 58 Q 37 54 45 58 Q 53 62 60 58" stroke="#546E7A" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Green tinge cheeks */}
      <Circle cx="22" cy="52" r="8" fill="#80CBC4" opacity={0.45} />
      <Circle cx="68" cy="52" r="8" fill="#80CBC4" opacity={0.45} />
    </Svg>
  );
}
