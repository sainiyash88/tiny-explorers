import Svg, { Circle, Path, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function NervousFaceCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Circle cx="45" cy="45" r="38" fill="#FFF176" />
      {/* Shifty eyes - looking sideways */}
      <Ellipse cx="32" cy="38" rx="7" ry="7" fill="white" />
      <Ellipse cx="58" cy="38" rx="7" ry="7" fill="white" />
      <Circle cx="35" cy="39" r="3.5" fill="#1A1A1A" />
      <Circle cx="61" cy="39" r="3.5" fill="#1A1A1A" />
      <Circle cx="36" cy="37" r="1.2" fill="white" />
      <Circle cx="62" cy="37" r="1.2" fill="white" />
      {/* Worried brows */}
      <Path d="M 26 28 Q 32 32 38 28" stroke="#F57F17" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Path d="M 52 28 Q 58 32 64 28" stroke="#F57F17" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Nervous wavy mouth */}
      <Path d="M 30 57 Q 36 53 42 57 Q 48 61 54 57 Q 60 53 64 57" stroke="#E65100" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Sweat drop */}
      <Path d="M 70 22 Q 74 30 70 34 Q 66 30 70 22" fill="#81D4FA" />
      {/* Cheeks */}
      <Circle cx="20" cy="54" r="7" fill="#FFCC02" opacity={0.4} />
      <Circle cx="70" cy="54" r="7" fill="#FFCC02" opacity={0.4} />
    </Svg>
  );
}
