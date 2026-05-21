import Svg, { Circle, Path } from 'react-native-svg';

interface Props { size?: number }

export default function GrapesCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Stem & leaf */}
      <Path d="M 45 12 L 45 20" stroke="#6D4C41" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M 45 14 Q 54 8 56 16 Q 50 18 45 14" fill="#4CAF50" />
      {/* Top row */}
      <Circle cx="33" cy="32" r="12" fill="#7B1FA2" />
      <Circle cx="57" cy="32" r="12" fill="#7B1FA2" />
      {/* Middle row */}
      <Circle cx="21" cy="50" r="12" fill="#9C27B0" />
      <Circle cx="45" cy="50" r="12" fill="#9C27B0" />
      <Circle cx="69" cy="50" r="12" fill="#9C27B0" />
      {/* Bottom row */}
      <Circle cx="33" cy="68" r="12" fill="#AB47BC" />
      <Circle cx="57" cy="68" r="12" fill="#AB47BC" />
      {/* Highlights */}
      <Circle cx="28" cy="28" r="3.5" fill="#CE93D8" opacity={0.6} />
      <Circle cx="52" cy="28" r="3.5" fill="#CE93D8" opacity={0.6} />
      <Circle cx="16" cy="46" r="3.5" fill="#CE93D8" opacity={0.6} />
      <Circle cx="40" cy="46" r="3.5" fill="#CE93D8" opacity={0.6} />
      <Circle cx="64" cy="46" r="3.5" fill="#CE93D8" opacity={0.6} />
      {/* Eyes on center grape */}
      <Circle cx="41" cy="48" r="3.5" fill="white" />
      <Circle cx="49" cy="48" r="3.5" fill="white" />
      <Circle cx="41" cy="48" r="1.8" fill="#1A1A1A" />
      <Circle cx="49" cy="48" r="1.8" fill="#1A1A1A" />
      {/* Smile */}
      <Path d="M 40 54 Q 45 59 50 54" stroke="#4A148C" strokeWidth="2" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
