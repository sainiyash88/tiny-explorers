import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function BananaCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Banana body - curved shape */}
      <Path d="M 20 65 Q 18 30 45 18 Q 72 20 70 40 Q 68 55 50 62 Q 35 68 20 65 Z" fill="#FDD835" />
      {/* Shading */}
      <Path d="M 24 62 Q 22 32 47 22 Q 60 24 65 38" stroke="#F9A825" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Tip */}
      <Path d="M 20 65 Q 16 70 18 74 Q 22 70 24 66" fill="#F9A825" />
      {/* Eyes */}
      <Circle cx="46" cy="38" r="5" fill="white" />
      <Circle cx="58" cy="34" r="5" fill="white" />
      <Circle cx="46" cy="38" r="2.5" fill="#1A1A1A" />
      <Circle cx="58" cy="34" r="2.5" fill="#1A1A1A" />
      <Circle cx="47" cy="37" r="1" fill="white" />
      <Circle cx="59" cy="33" r="1" fill="white" />
      {/* Smile */}
      <Path d="M 44 46 Q 50 53 56 46" stroke="#E65100" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Circle cx="40" cy="48" r="5" fill="#FFCC02" opacity={0.5} />
      <Circle cx="60" cy="43" r="5" fill="#FFCC02" opacity={0.5} />
    </Svg>
  );
}
