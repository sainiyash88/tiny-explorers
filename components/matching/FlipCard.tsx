import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors, Radii } from '@/constants/theme';
import AnimalCartoon from '@/components/ui/animals/AnimalCartoon';

interface Props {
  id: string;
  emoji: string;
  label: string;
  color: string;
  size: number;
  state: 'hidden' | 'flipped' | 'matched';
  onPress: (id: string) => void;
  svgKey?: string;
}

export default function FlipCard({ id, emoji, label, color, size, state, onPress, svgKey }: Props) {
  const rotation = useRef(new Animated.Value(state === 'hidden' ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(rotation, {
      toValue: state === 'hidden' ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 60,
    }).start();
  }, [state]);

  const frontRotateY = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotateY = rotation.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  const cardStyle = { width: size, height: size, borderRadius: Radii.md };

  return (
    <TouchableOpacity
      activeOpacity={state !== 'hidden' ? 1 : 0.7}
      onPress={() => state === 'hidden' && onPress(id)}
      style={cardStyle}
    >
      {/* Back face (question mark — shown when hidden) */}
      <Animated.View
        style={[
          styles.face,
          cardStyle,
          styles.backFace,
          { transform: [{ rotateY: frontRotateY }] },
        ]}
      >
        <Text style={styles.questionMark}>?</Text>
      </Animated.View>

      {/* Front face (emoji — shown when flipped/matched) */}
      <Animated.View
        style={[
          styles.face,
          cardStyle,
          { backgroundColor: state === 'matched' ? '#D4EDDA' : color },
          { borderWidth: state === 'matched' ? 3 : 0, borderColor: Colors.success },
          { transform: [{ rotateY: backRotateY }] },
        ]}
      >
        {svgKey
          ? <AnimalCartoon name={svgKey} size={size * 0.55} />
          : <Text style={[styles.emoji, { fontSize: size * 0.4 }]}>{emoji}</Text>
        }
        <Text style={[styles.label, { fontSize: size * 0.14 }]} numberOfLines={1}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  face: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  backFace: {
    backgroundColor: Colors.tileMatching,
  },
  questionMark: { fontSize: 36, color: '#fff', fontWeight: '800' },
  emoji: {},
  label: { color: '#fff', fontWeight: '700', textAlign: 'center', paddingHorizontal: 4 },
});
