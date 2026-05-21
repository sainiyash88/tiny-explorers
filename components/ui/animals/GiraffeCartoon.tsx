import Svg, { Circle, Ellipse, Rect, Path, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function GiraffeCartoon({ size = 90 }: Props) {
  const s = size / 90;
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Neck */}
      <Rect x="36" y="52" width="18" height="28" rx="9" fill="#F5C842" />
      {/* Neck spots */}
      <Circle cx="40" cy="60" r="3.5" fill="#D4932A" />
      <Circle cx="50" cy="70" r="3" fill="#D4932A" />

      {/* Head */}
      <Ellipse cx="45" cy="42" rx="22" ry="20" fill="#F5C842" />

      {/* Ears */}
      <Ellipse cx="24" cy="36" rx="7" ry="9" fill="#F5C842" />
      <Ellipse cx="24" cy="36" rx="4" ry="6" fill="#F0A8A8" />
      <Ellipse cx="66" cy="36" rx="7" ry="9" fill="#F5C842" />
      <Ellipse cx="66" cy="36" rx="4" ry="6" fill="#F0A8A8" />

      {/* Ossicones (horns) */}
      <Rect x="33" y="18" width="6" height="14" rx="3" fill="#D4932A" />
      <Circle cx="36" cy="17" r="4" fill="#8B5E00" />
      <Rect x="51" y="18" width="6" height="14" rx="3" fill="#D4932A" />
      <Circle cx="54" cy="17" r="4" fill="#8B5E00" />

      {/* Head spots */}
      <Circle cx="35" cy="38" r="4" fill="#D4932A" />
      <Circle cx="55" cy="34" r="3.5" fill="#D4932A" />
      <Circle cx="48" cy="48" r="3" fill="#D4932A" />

      {/* Eyes */}
      <Circle cx="37" cy="38" r="6" fill="white" />
      <Circle cx="53" cy="38" r="6" fill="white" />
      <Circle cx="38" cy="38" r="3.5" fill="#3A2A10" />
      <Circle cx="54" cy="38" r="3.5" fill="#3A2A10" />
      {/* Eye shine */}
      <Circle cx="39.5" cy="36.5" r="1.5" fill="white" />
      <Circle cx="55.5" cy="36.5" r="1.5" fill="white" />

      {/* Nostrils */}
      <Ellipse cx="40" cy="52" rx="3" ry="2" fill="#D4932A" />
      <Ellipse cx="50" cy="52" rx="3" ry="2" fill="#D4932A" />

      {/* Smile */}
      <Path d="M 37 56 Q 45 63 53 56" stroke="#A0622A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
