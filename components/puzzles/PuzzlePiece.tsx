import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Radii } from '@/constants/theme';
import PUZZLE_IMAGES from '@/assets/images/puzzles';

interface Props {
  id: string;
  imageKey: string;
  size: number;
  placed: boolean;
  onDrop: (id: string, x: number, y: number) => void;
  onDragStart: (id: string) => void;
}

export default function PuzzlePiece({ id, imageKey, size, placed, onDrop, onDragStart }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (placed) {
      opacity.value = withTiming(0, { duration: 200 });
    } else {
      opacity.value = withTiming(1, { duration: 150 });
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  }, [placed]);

  const handleDrop = (absX: number, absY: number) => onDrop(id, absX, absY);
  const handleDragStart = () => onDragStart(id);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      scale.value = withSpring(1.12, { damping: 8, stiffness: 300 });
      runOnJS(handleDragStart)();
    })
    .onUpdate((e) => {
      'worklet';
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      'worklet';
      scale.value = withSpring(1, { damping: 10, stiffness: 200 });
      runOnJS(handleDrop)(e.absoluteX, e.absoluteY);
      translateX.value = withSpring(0, { damping: 14, stiffness: 180 });
      translateY.value = withSpring(0, { damping: 14, stiffness: 180 });
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
    zIndex: scale.value > 1 ? 99 : 1,
  }));

  const imageSource = PUZZLE_IMAGES[imageKey];

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.piece, { width: size, height: size }, animStyle]}>
        {imageSource && (
          <Image source={imageSource} style={styles.img} resizeMode="contain" />
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  piece: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: Radii.md,
    backgroundColor: '#F0EDE8',
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%' },
});
