import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface Props {
  emoji: string;
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  size?: number;
}

export default function PeekingAnimal({ emoji, corner, delay = 0, size = 56 }: Props) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const bobAnim = useRef(new Animated.Value(0)).current;

  const isTop = corner.startsWith('top');
  const isLeft = corner.endsWith('left');

  useEffect(() => {
    // Slide in from off-screen
    Animated.spring(slideAnim, {
      toValue: 1,
      delay,
      useNativeDriver: true,
      friction: 6,
      tension: 50,
    }).start(() => {
      // Start gentle bob loop after sliding in
      Animated.loop(
        Animated.sequence([
          Animated.timing(bobAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(bobAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  // Slide from the corner edge into view — only peek half the emoji
  const peekAmount = size * 0.55;
  const slideOffset = isTop ? -peekAmount : peekAmount;
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [slideOffset * 2.5, 0],
  });

  const bobTranslateY = bobAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isTop ? -5 : 5],
  });

  // Flip emoji horizontally if on the right side
  const scaleX = isLeft ? 1 : -1;

  const positionStyle = {
    top: isTop ? -(size * 0.45) : undefined,
    bottom: !isTop ? -(size * 0.45) : undefined,
    left: isLeft ? Spacing : undefined,
    right: !isLeft ? Spacing : undefined,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        { width: size, height: size },
        { transform: [{ translateY }, { translateY: bobTranslateY }, { scaleX }] },
      ]}
    >
      <Text style={{ fontSize: size * 0.85 }}>{emoji}</Text>
    </Animated.View>
  );
}

const Spacing = 16;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
