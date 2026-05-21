import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { Colors, Radii } from '@/constants/theme';

interface Props {
  size: number;
  filled: boolean;
  imageSource?: ImageSourcePropType;
  justSnapped: boolean;
}

export default function DropZone({ size, filled, imageSource, justSnapped }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (justSnapped) {
      scale.value = withSpring(1.15, { damping: 6, stiffness: 300 }, () => {
        scale.value = withSpring(1, { damping: 8, stiffness: 200 });
      });
    }
  }, [justSnapped]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.zone, { width: size, height: size }, animStyle]}>
      {imageSource && (
        <Image
          source={imageSource}
          style={[styles.img, { opacity: filled ? 1 : 0.25 }]}
          resizeMode="contain"
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  zone: {
    borderRadius: Radii.md,
    borderWidth: 3,
    borderColor: Colors.locked,
    borderStyle: 'dashed',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%' },
});
