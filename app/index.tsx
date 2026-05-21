import { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

export default function IntroScreen() {
  useBackgroundMusic('home');
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade + scale in the whole screen
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 50, useNativeDriver: true }),
    ]).start(() => {
      // Pulse the tap button after reveal
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 700, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => router.replace('/home')}>
      <StatusBar style="light" hidden />

      {/* Full-screen image */}
      <Image
        source={require('@/assets/images/tinyExplorers.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Bottom tap prompt */}
      <Animated.Text style={[styles.tapText, { opacity: pulseAnim }]}>
        Tap anywhere to explore
      </Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  tapText: {
    position: 'absolute',
    bottom: 52,
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
