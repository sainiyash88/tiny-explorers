import { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import GiraffeCartoon  from '@/components/ui/animals/GiraffeCartoon';
import ElephantCartoon from '@/components/ui/animals/ElephantCartoon';
import MonkeyCartoon   from '@/components/ui/animals/MonkeyCartoon';
import LionCartoon     from '@/components/ui/animals/LionCartoon';
import AnimalCartoon   from '@/components/ui/animals/AnimalCartoon';
import type { ActivityId } from '@/constants/config';

const MASCOT_PHRASES: Record<ActivityId, string[]> = {
  tracing:  ['Trace with me!', 'Follow the path!', 'You got this!', 'Nice and slow!'],
  puzzles:  ['Put it together!', 'You can do it!', 'Almost there!', 'Great move!'],
  matching: ['Find my twin!', 'Good memory!', 'Match them all!', 'Keep going!'],
  braingym: ['Think hard!', "You're so smart!", 'Great thinking!', 'Awesome!'],
};

interface Props {
  activity: ActivityId;
  mascotName?: string;
  size?: number;
  phrase?: string;
  position?: 'bottom-right' | 'top-right';
}

function Animal({ activity, mascotName, size }: { activity: ActivityId; mascotName?: string; size: number }) {
  if (mascotName) return <AnimalCartoon name={mascotName} size={size} />;
  if (activity === 'tracing')  return <GiraffeCartoon  size={size} />;
  if (activity === 'puzzles')  return <ElephantCartoon size={size} />;
  if (activity === 'matching') return <MonkeyCartoon   size={size} />;
  if (activity === 'braingym') return <LionCartoon     size={size} />;
  return null;
}

export default function MascotGuide({ activity, mascotName, size = 80, phrase, position = 'bottom-right' }: Props) {
  const isTop = position === 'top-right';
  const bobAnim    = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(isTop ? -120 : 120)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  const phrases = MASCOT_PHRASES[activity];
  const displayPhrase = phrase ?? phrases[Math.floor(Math.random() * phrases.length)];

  // Explicit phrase always shows; random phrases appear ~1 in 5 levels
  const showBubble = useRef(phrase !== undefined || Math.random() < 0.20).current;

  useEffect(() => {
    // Slide up from bottom on mount
    Animated.spring(slideAnim, {
      toValue: 0,
      delay: 400,
      useNativeDriver: true,
      friction: 7,
      tension: 50,
    }).start();

    if (showBubble) {
      // Wait 5 s before the bubble appears so it doesn't distract immediately
      Animated.timing(bubbleAnim, {
        toValue: 1,
        delay: 5000,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }

    // Continuous gentle bob
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, { toValue: -6, duration: 800, useNativeDriver: true }),
        Animated.timing(bobAnim, { toValue:  0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, isTop ? styles.containerTop : styles.containerBottom, { transform: [{ translateY: slideAnim }] }]}
      pointerEvents="none"
    >
      {/* Animal (on top when position=top-right, bubble below) */}
      <Animated.View style={{ transform: [{ translateY: bobAnim }] }}>
        <Animal activity={activity} mascotName={mascotName} size={size} />
      </Animated.View>

      {/* Speech bubble */}
      {!isTop && (
        <Animated.View style={[styles.bubble, { opacity: bubbleAnim }]}>
          <Text style={styles.bubbleText}>{displayPhrase}</Text>
          <View style={styles.bubbleTail} />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    alignItems: 'center',
    zIndex: 20,
  },
  containerBottom: {
    bottom: 12,
  },
  containerTop: {
    top: 60,
  },
  bubble: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    maxWidth: 150,
  },
  bubbleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -8,
    right: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
});
