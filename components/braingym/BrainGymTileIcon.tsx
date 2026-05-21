import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';
import AnimalCartoon from '@/components/ui/animals/AnimalCartoon';
import type { BrainLevel } from '@/content/braingym/chapter1';

interface Props {
  level: BrainLevel;
  size: number;
}

export default function BrainGymTileIcon({ level, size }: Props) {
  const emojiSize = size * 0.72;

  if (level.type === 'opposite') {
    // Show whichever side the instruction asks the child to find
    const isLeft = level.correctSide === 'left';
    const svgKey = isLeft ? level.leftSvgKey : level.rightSvgKey;
    const emoji  = isLeft ? level.leftEmoji  : level.rightEmoji;
    if (svgKey) {
      return (
        <View style={[styles.clip, { width: size, height: size }]}>
          <AnimalCartoon name={svgKey} size={size * 0.6} />
        </View>
      );
    }
    return <Text style={{ fontSize: emojiSize }}>{emoji}</Text>;
  }

  if (level.type === 'pattern') {
    const first = level.sequence[0];
    if (first === '#square') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Rect x="10" y="10" width="80" height="80" rx="6" fill="#EF5350" /></Svg>;
    if (first === '#circle') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Circle cx="50" cy="50" r="42" fill="#4FC3F7" /></Svg>;
    if (first === '#triangle') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Polygon points="50,8 94,88 6,88" fill="#FFA726" /></Svg>;
    if (first === '#rectangle') return <Svg width={emojiSize * 1.7} height={emojiSize * 0.85} viewBox="0 0 170 85"><Rect x="6" y="6" width="158" height="73" rx="6" fill="#66BB6A" /></Svg>;
    return <Text style={{ fontSize: emojiSize * 0.85 }}>{first}</Text>;
  }

  if (level.type === 'missing') {
    // Show the item that is missing (the answer)
    return <Text style={{ fontSize: emojiSize * 0.85 }}>{level.items[level.missingIndex]}</Text>;
  }

  if (level.type === 'bigsmall') {
    return <Text style={{ fontSize: emojiSize }}>{level.emoji}</Text>;
  }

  if (level.type === 'count') {
    return <Text style={{ fontSize: emojiSize }}>{level.emoji}</Text>;
  }

  if (level.type === 'moreless') {
    const emoji = level.correctSide === 'left' ? level.leftEmoji : level.rightEmoji;
    return <Text style={{ fontSize: emojiSize }}>{emoji}</Text>;
  }

  if (level.type === 'matchfollow') {
    const label = level.pairs[0].left || level.pairs[0].right;
    return <Text style={{ fontSize: emojiSize * 0.75 }}>{label}</Text>;
  }

  if (level.type === 'oddoneout') {
    const target = level.items[level.oddIndex];
    if (target.svgShape === 'circle') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Circle cx="50" cy="50" r="42" fill="#4FC3F7" /></Svg>;
    if (target.svgShape === 'square') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Rect x="10" y="10" width="80" height="80" rx="6" fill="#EF5350" /></Svg>;
    if (target.svgShape === 'rectangle') return <Svg width={emojiSize * 1.7} height={emojiSize * 0.85} viewBox="0 0 170 85"><Rect x="6" y="6" width="158" height="73" rx="6" fill="#66BB6A" /></Svg>;
    if (target.svgShape === 'triangle') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Polygon points="50,8 94,88 6,88" fill="#FFA726" /></Svg>;
    return <Text style={{ fontSize: emojiSize * 0.85 }}>{target.emoji}</Text>;
  }

  if (level.type === 'finddiff') {
    return <Text style={{ fontSize: emojiSize * 0.72 }}>{level.baseGrid[0][0]}</Text>;
  }

  if (level.type === 'maze') {
    return <Text style={{ fontSize: emojiSize * 0.85 }}>{level.startEmoji}</Text>;
  }

  if (level.type === 'findcolor') {
    const first = level.items[0];
    if (first.svgShape === 'circle') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Circle cx="50" cy="50" r="42" fill="#4FC3F7" /></Svg>;
    if (first.svgShape === 'square') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Rect x="10" y="10" width="80" height="80" rx="6" fill="#EF5350" /></Svg>;
    if (first.svgShape === 'rectangle') return <Svg width={emojiSize * 1.7} height={emojiSize * 0.85} viewBox="0 0 170 85"><Rect x="6" y="6" width="158" height="73" rx="6" fill="#66BB6A" /></Svg>;
    if (first.svgShape === 'triangle') return <Svg width={emojiSize} height={emojiSize} viewBox="0 0 100 100"><Polygon points="50,8 94,88 6,88" fill="#FFA726" /></Svg>;
    return <Text style={{ fontSize: emojiSize * 0.85 }}>{first.emoji}</Text>;
  }

  return <AnimalCartoon name="lion" size={size} />;
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
});
