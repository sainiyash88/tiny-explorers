import Svg, { Circle, Path, Polygon, Ellipse } from 'react-native-svg';
import AnimalCartoon from '@/components/ui/animals/AnimalCartoon';
import CatCartoon from '@/components/ui/animals/CatCartoon';

interface Props {
  mascot: string;
  size?: number;
}

function AppleIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Path d="M 45 18 Q 55 8 60 16 Q 50 20 45 18" fill="#4CAF50" />
      <Path d="M 45 18 L 45 26" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
      <Path d="M 20 42 Q 18 28 30 26 Q 40 22 45 28 Q 50 22 60 26 Q 72 28 70 42 Q 72 68 55 74 Q 48 78 45 74 Q 42 78 35 74 Q 18 68 20 42 Z" fill="#F44336" />
      <Ellipse cx="34" cy="36" rx="6" ry="9" fill="white" opacity={0.25} transform="rotate(-20,34,36)" />
    </Svg>
  );
}

function BananaIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* Banana body — curved shape */}
      <Path d="M 22 70 Q 10 40 30 18 Q 40 10 55 14 Q 70 18 72 30 Q 76 48 60 62 Q 48 72 35 72 Q 28 72 22 70 Z" fill="#FFD600" />
      {/* Inner curve highlight */}
      <Path d="M 30 64 Q 20 38 36 20 Q 44 12 55 16" stroke="#FFF176" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.7} />
      {/* Tip top */}
      <Path d="M 55 14 Q 62 8 65 12 Q 63 18 55 14" fill="#8D6E63" />
      {/* Tip bottom */}
      <Path d="M 22 70 Q 18 76 22 78 Q 28 74 22 70" fill="#8D6E63" />
      {/* Shadow underside */}
      <Path d="M 24 68 Q 12 42 32 20" stroke="#F9A825" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.5} />
    </Svg>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Polygon
        points="45,8 54,34 82,34 60,52 68,78 45,62 22,78 30,52 8,34 36,34"
        fill="#FFD700"
        stroke="#FFA000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Ellipse cx="36" cy="32" rx="8" ry="5" fill="white" opacity={0.3} transform="rotate(-30,36,32)" />
    </Svg>
  );
}

function HeartIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      <Path
        d="M 45 75 Q 10 52 10 30 A 18 18 0 0 1 45 22 A 18 18 0 0 1 80 30 Q 80 52 45 75 Z"
        fill="#F44336"
        stroke="#C62828"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Ellipse cx="33" cy="34" rx="7" ry="10" fill="white" opacity={0.25} transform="rotate(-20,33,34)" />
    </Svg>
  );
}

const ANIMAL_KEYS = new Set([
  'monkey','lion','elephant','giraffe','frog','parrot','fish','cow','butterfly','cat',
]);

export default function BrainTileIcon({ mascot, size = 80 }: Props) {
  const key = mascot.toLowerCase();
  if (key === 'cat') return <CatCartoon size={size} />;
  if (ANIMAL_KEYS.has(key)) return <AnimalCartoon name={mascot} size={size} />;
  if (key === 'apple' || key === 'fruit') return <AppleIcon size={size} />;
  if (key === 'banana') return <BananaIcon size={size} />;
  if (key === 'star') return <StarIcon size={size} />;
  if (key === 'heart') return <HeartIcon size={size} />;
  return <AnimalCartoon name="lion" size={size} />;
}
