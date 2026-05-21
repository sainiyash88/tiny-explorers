import Svg, { Circle, Ellipse, Path, Polygon } from 'react-native-svg';

interface Props { size?: number }

export default function LionCartoon({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Mane — spiky ring behind head */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 45 + Math.cos(rad) * 26;
        const cy = 42 + Math.sin(rad) * 26;
        return <Circle key={i} cx={cx} cy={cy} r="10" fill="#C87820" />;
      })}

      {/* Mane fill ring */}
      <Circle cx="45" cy="42" r="24" fill="#E09030" />

      {/* Head */}
      <Circle cx="45" cy="42" r="22" fill="#F5C050" />

      {/* Ears */}
      <Circle cx="25" cy="24" r="8"  fill="#F5C050" />
      <Circle cx="25" cy="24" r="5"  fill="#E09030" />
      <Circle cx="65" cy="24" r="8"  fill="#F5C050" />
      <Circle cx="65" cy="24" r="5"  fill="#E09030" />

      {/* Eyes */}
      <Circle cx="35" cy="38" r="7" fill="white" />
      <Circle cx="55" cy="38" r="7" fill="white" />
      <Circle cx="36" cy="38" r="4" fill="#2A5000" />
      <Circle cx="56" cy="38" r="4" fill="#2A5000" />
      <Circle cx="37.5" cy="36.5" r="1.8" fill="white" />
      <Circle cx="57.5" cy="36.5" r="1.8" fill="white" />

      {/* Nose */}
      <Polygon points="45,48 41,53 49,53" fill="#D04040" />

      {/* Muzzle */}
      <Ellipse cx="45" cy="54" rx="10" ry="7" fill="#FADA80" />

      {/* Whisker dots */}
      <Circle cx="30" cy="52" r="1.5" fill="#C8A030" />
      <Circle cx="30" cy="56" r="1.5" fill="#C8A030" />
      <Circle cx="60" cy="52" r="1.5" fill="#C8A030" />
      <Circle cx="60" cy="56" r="1.5" fill="#C8A030" />

      {/* Smile */}
      <Path d="M 38 57 Q 45 64 52 57" stroke="#D04040" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <Circle cx="28" cy="52" r="8" fill="#E07050" opacity={0.3} />
      <Circle cx="62" cy="52" r="8" fill="#E07050" opacity={0.3} />

      {/* Eyebrows — proud look */}
      <Path d="M 29 30 Q 36 26 42 30" stroke="#C87820" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Path d="M 48 30 Q 54 26 61 30" stroke="#C87820" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
