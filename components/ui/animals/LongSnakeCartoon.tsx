import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

interface Props { size?: number }

export default function LongSnakeCartoon({ size = 90 }: Props) {
  // Rendered in a wide landscape viewBox so the snake looks genuinely long
  const w = size * 2.4;
  const h = size * 0.7;
  return (
    <Svg width={w} height={h} viewBox="0 0 240 70">
      {/* Body — long S-curve */}
      <Path
        d="M 30 42 Q 60 20 90 35 Q 120 50 150 35 Q 180 20 210 35"
        stroke="#4CAF50"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      {/* Belly stripe */}
      <Path
        d="M 30 42 Q 60 20 90 35 Q 120 50 150 35 Q 180 20 210 35"
        stroke="#A5D6A7"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Scale pattern dots */}
      <Circle cx="60" cy="28" r="3" fill="#388E3C" opacity={0.5} />
      <Circle cx="90" cy="35" r="3" fill="#388E3C" opacity={0.5} />
      <Circle cx="120" cy="43" r="3" fill="#388E3C" opacity={0.5} />
      <Circle cx="150" cy="35" r="3" fill="#388E3C" opacity={0.5} />
      <Circle cx="180" cy="27" r="3" fill="#388E3C" opacity={0.5} />
      {/* Head */}
      <Ellipse cx="218" cy="35" rx="16" ry="13" fill="#388E3C" />
      {/* Eyes */}
      <Circle cx="222" cy="30" r="4" fill="white" />
      <Circle cx="222" cy="30" r="2" fill="#1A1A1A" />
      <Circle cx="223" cy="29" r="0.8" fill="white" />
      {/* Tongue */}
      <Path d="M 233 37 L 240 33 M 233 37 L 240 41" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      {/* Tail tip */}
      <Path d="M 22 46 Q 12 50 8 44 Q 14 40 22 42" fill="#4CAF50" />
    </Svg>
  );
}
